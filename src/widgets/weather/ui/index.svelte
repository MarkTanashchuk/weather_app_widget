<script context="module" lang="ts">
  import type { SearchEvent } from '$features/search/ui.svelte';
  import type { WeatherData } from '$widgets/weather/index.js';
  import type { DropdownItem } from 'carbon-components-svelte/src/Dropdown/Dropdown.svelte';
  import type { Writable } from 'svelte/store';
</script>

<script lang="ts">
  import { Search } from '$features/search/index.js';
  import { persistentStore } from '$shared/utils.js';
  import { getWeather, WeatherCard, WeatherTable } from '$widgets/weather/index.js';
  import { Button, Tile } from 'carbon-components-svelte';
  import DownloadIcon from 'carbon-icons-svelte/lib/Download.svelte';
  import FilterIcon from 'carbon-icons-svelte/lib/Filter.svelte';
  import { nanoid } from 'nanoid';

  export let showHistory: boolean = false;

  let weatherRequestsPending = 0;

  const searchHistory: Writable<DropdownItem[]> = persistentStore('searchHistory', []);
  const weatherHistory: Writable<WeatherData[]> = persistentStore('weatherHistory', []);

  async function handleSearch(event: SearchEvent) {
    weatherRequestsPending += 1;

    try {
      let weatherData = await getWeather(event.detail.value);
      weatherRequestsPending += 1;

      $weatherHistory = [weatherData, ...$weatherHistory];
      $searchHistory = [{ id: nanoid(), text: event.detail.value }, ...$searchHistory];
      weatherRequestsPending -= 1;
    } catch (error) {
      console.error(error);
    }
  }

  function handleClearWeatherHistory() {
    $weatherHistory = [];
    weatherRequestsPending = 0;
  }

  function handleClearSearchHistory() {
    $searchHistory = [];
  }

  let selectedWeather: WeatherData | undefined;
  $: selectedWeather = $weatherHistory[0];
</script>

<div class="flex flex-col w-full h-full gap-8 pt-8">
  <Search
    on:search={handleSearch}
    on:reset={handleClearSearchHistory}
    searchHistory={$searchHistory}
  />

  <div class="flex justify-between w-full h-full gap-8">
    <Tile class="flex flex-col flex-1 justify-between">
      {#if selectedWeather}
        <h2 class="font-bold">Latest search:</h2>
        <div class="py-2">
          <WeatherCard
            kind={selectedWeather.description}
            iconURL={selectedWeather.iconURL}
            temperature={selectedWeather.main.temp}
            title={selectedWeather.name}
          />

          {#if weatherRequestsPending > 0}
            <div class="flex gap-4 items-center justify-between">
              <p>Weather request is loading...</p>
              <DownloadIcon />
            </div>
          {/if}
        </div>
      {:else}
        <p class="text-black">
          Enter the city name and click on the search button to obtain the current weather for the
          desired city
        </p>
      {/if}
    </Tile>

    {#if showHistory}
      <div class="flex flex-col h-full gap-4">
        <WeatherTable items={$weatherHistory} />
        <Button
          kind="danger"
          class="w-full max-w-none bg-[#da1e28]"
          icon={FilterIcon}
          iconDescription="Clear History"
          on:click={handleClearWeatherHistory}
        >
          Clear Weather History
        </Button>
      </div>
    {/if}
  </div>
</div>
