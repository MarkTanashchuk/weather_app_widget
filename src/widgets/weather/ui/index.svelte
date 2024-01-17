<script context="module" lang="ts">
  import type { WeatherData } from '$widgets/weather/index.js';
  import type { DropdownItem } from 'carbon-components-svelte/src/Dropdown/Dropdown.svelte';
</script>

<script lang="ts">
  import { Search } from '$features/search/index.js';
  import { getWeather, WeatherCard, WeatherTable } from '$widgets/weather/index.js';
  import { Tile } from 'carbon-components-svelte';

  import type { SearchEvent } from '$features/search/ui.svelte';
  import { persistentStore } from '$shared/utils.js';
  import type { Writable } from 'svelte/store';

  export let showHistory: boolean = false;

  const searchHistory: Writable<DropdownItem[]> = persistentStore('searchHistory', []);
  const weatherHistory: Writable<WeatherData[]> = persistentStore('weatherHistory', []);

  let currentCityWeather: Promise<WeatherData> | null = null;

  function handleSearch(event: SearchEvent) {
    currentCityWeather = getWeather(event.detail.value);
  }

  function handleStoringCurrentWeatherREFACTOR(node: HTMLDivElement, data: WeatherData) {
    $weatherHistory = [data, ...$weatherHistory];
  }
</script>

<div class="flex flex-col w-full max-w-md gap-8 pt-8">
  <Search on:search={handleSearch} searchHistory={$searchHistory} />

  <Tile>
    <h2 class="font-bold">Current weather:</h2>
    <div class="py-2">
      {#if currentCityWeather !== null}
        {#await currentCityWeather}
          <p>Weather is loading...</p>
        {:then data}
          <div class="contents" use:handleStoringCurrentWeatherREFACTOR={data}>
            <WeatherCard
              kind={data.description}
              iconURL={data.iconURL}
              temperature={data.main.temp}
              title={data.name}
            />
          </div>
        {:catch error}
          <p class="text-red-600">{error.message}</p>
        {/await}
      {:else}
        <p class="text-black">
          Enter the city name and click on the search button to obtain the current weather for the
          desired city
        </p>
      {/if}
    </div>
  </Tile>

  {#if showHistory}
    <WeatherTable items={$weatherHistory} />
  {/if}
</div>
