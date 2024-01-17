<script context="module" lang="ts">
  import type { WeatherData } from '$widgets/weather/index.js';
  import type { DropdownItem } from 'carbon-components-svelte/src/Dropdown/Dropdown.svelte';

  const items: DropdownItem[] = [
    { id: '1', text: 'Ukraine' },
    { id: '2', text: 'London' }
  ];
</script>

<script lang="ts">
  import { Search } from '$features/search/index.js';
  import { WeatherCard, WeatherTable, getWeather } from '$widgets/weather/index.js';
  import { Button, Tile } from 'carbon-components-svelte';

  export let showHistory: boolean = false;

  let weatherHistory: WeatherData[] = [];

  let currentCity: string = '';
  let currentCityWeather: Promise<WeatherData> | null = null;

  function handleSearch() {
    currentCityWeather = getWeather(currentCity);
  }

  function handleStoringCurrentWeatherREFACTOR(node: HTMLDivElement, data: WeatherData) {
    weatherHistory = [...weatherHistory, data];
  }
</script>

<div class="flex flex-col w-full max-w-md gap-8 pt-8">
  <Tile class="flex flex-col gap-3 justify-between">
    <Search bind:value={currentCity} dropdownItems={items} />

    <Button class="w-full max-w-none text-white bg-[#0353e9] mx-auto" on:click={handleSearch}>
      Search
    </Button>
  </Tile>

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
    <WeatherTable items={weatherHistory} />
  {/if}
</div>