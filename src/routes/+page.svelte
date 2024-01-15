<script context="module" lang="ts">
  import type {
    DropdownItem,
    DropdownItemId
  } from 'carbon-components-svelte/src/Dropdown/Dropdown.svelte';

  export interface CountrySelectionEvent extends CustomEvent {
    detail: {
      selectedId: DropdownItemId;
      selectedItem: DropdownItem;
    };
  }
</script>

<script lang="ts">
  import Weather from '$widgets/weather/index.svelte';
  import { Button, Content, Dropdown, Search, Tile } from 'carbon-components-svelte';

  const items = [
    { id: '0', text: 'Choose City' },
    { id: '1', text: 'Ukraine' },
    { id: '2', text: 'London' }
  ];

  let cityId: string = '0';
  let currentCity: string = '';

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

      <Button class="w-full max-w-none text-white bg-[#0353e9] mx-auto">Search</Button>
    </Tile>

    <Weather kind="sunny" temperature={20} title={'New York'} />
    <Weather kind="sunny" temperature={20} title={'New York'} mode={'compact'} />
  </div>
</Content>
