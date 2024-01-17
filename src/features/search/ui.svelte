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

  export const DEFAULT_ITEM: DropdownItem = {
    id: '0',
    text: 'Select item'
  };
</script>

<script lang="ts">
  import { Dropdown, Search } from 'carbon-components-svelte';

  export let value: string;
  export let selectedId: string = '0';
  export let dropdownItems: DropdownItem[];

  function handleSearchReset() {
    selectedId = DEFAULT_ITEM.id;
  }

  function handleSelect(event: CountrySelectionEvent) {
    let selectedCity = event.detail.selectedItem.text;

    if (selectedCity == DEFAULT_ITEM.id) {
      value = '';
    } else {
      value = event.detail.selectedItem.text;
    }
  }
</script>

<div class="flex">
  <Search bind:value on:clear={handleSearchReset} />
  <Dropdown
    type="inline"
    light
    size="xl"
    class="normalize-dropdown"
    bind:selectedId
    on:select={handleSelect}
    items={[DEFAULT_ITEM, ...dropdownItems]}
  />
</div>

<style>
  :global(.normalize-dropdown) {
    grid-gap: 0;

    border-bottom: 1px solid rgb(141, 141, 141);
  }
</style>
