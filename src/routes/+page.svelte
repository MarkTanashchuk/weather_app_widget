<script context="module" lang="ts">
  import type {
    DropdownItem,
    DropdownItemId
  } from 'carbon-components-svelte/src/Dropdown/Dropdown.svelte';

  import type { WeatherData } from '$widgets/weather/index.js';

  export interface CountrySelectionEvent extends CustomEvent {
    detail: {
      selectedId: DropdownItemId;
      selectedItem: DropdownItem;
    };
  }
</script>

<script lang="ts">
  import { WeatherCard, getWeather } from '$widgets/weather/index.js';
  import { Button, Content, Dropdown, Search, Tile } from 'carbon-components-svelte';

  const items = [
    { id: '0', text: 'Choose City' },
    { id: '1', text: 'Ukraine' },
    { id: '2', text: 'London' }
  ];

  let weatherHistory: WeatherData[] = [];

  let cityId: string = '0';
  let currentCity: string = '';
  let currentCityWeather: Promise<WeatherData> | null = null;

  function handleSearch() {
    currentCityWeather = getWeather(currentCity);
  }

  function handleSearchReset() {
    cityId = '0';
  }

  function handleSelect(event: CountrySelectionEvent) {
    let selectedCity = event.detail.selectedItem.text;

    if (selectedCity == 'City') {
      currentCity = '';
    } else {
      currentCity = event.detail.selectedItem.text;
    }
  }

  function handleStoringCurrentWeatherREFACTOR(node: HTMLDivElement, data: WeatherData) {
    weatherHistory = [...weatherHistory, data];
  }
</script>

<Content class="flex flex-col items-center justify-center w-1/2 m-auto">
  <h1 class="text-4xl font-bold text-gray-800">Weather App</h1>

  <div class="flex flex-col w-full max-w-md gap-8 pt-8">
    <Tile class="flex flex-col gap-3 justify-between">
      <div class="flex">
        <Search bind:value={currentCity} on:clear={handleSearchReset} />
        <Dropdown
          type="inline"
          light
          size="xl"
          style="grid-gap:0;

border-bottom: 1px solid rgb(141, 141, 141)"
          bind:selectedId={cityId}
          on:select={handleSelect}
          {items}
        />
      </div>

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

    <Tile>
      {#if weatherHistory.length > 0}
        <h2 class="font-bold">Search history:</h2>
        <div class="flex flex-col">
          {#each weatherHistory as item}
            <WeatherCard
              kind={item.description}
              iconURL={item.iconURL}
              temperature={item.main.temp}
              title={item.name}
              mode="compact"
            />
          {/each}
        </div>
      {:else}
        <p>Make at least one search to enable search history</p>
      {/if}
    </Tile>
  </div>
</Content>
