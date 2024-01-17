<script context="module" lang="ts">
  import type {
    DropdownItem,
    DropdownItemId
  } from 'carbon-components-svelte/src/Dropdown/Dropdown.svelte';
  import { nanoid } from 'nanoid';

  export interface SearchEvent extends CustomEvent {
    detail: {
      value: string;
    };
  }

  export interface CountrySelectionEvent extends CustomEvent {
    detail: {
      selectedId: DropdownItemId;
      selectedItem: DropdownItem;
    };
  }

  export const DEFAULT_ITEM: DropdownItem = {
    id: nanoid(),
    text: ''
  };
</script>

<script lang="ts">
  import { Button, Dropdown, Search } from 'carbon-components-svelte';
  import SearchIcon from 'carbon-icons-svelte/lib/Search.svelte';
  import { createEventDispatcher } from 'svelte';

  export let value: string = DEFAULT_ITEM.text;
  export let selectedId: string = DEFAULT_ITEM.id;
  export let searchHistory: DropdownItem[];

  const dispatch = createEventDispatcher<{ search: SearchEvent['detail'] }>();

  function handleClick() {
    dispatch('search', { value });
  }

  function handleItemFormatting(item: DropdownItem): string {
    if (item.id === DEFAULT_ITEM.id) {
      return 'Select city';
    }

    return item.text || item.id;
  }

  function handleSearchReset() {
    selectedId = DEFAULT_ITEM.id;
  }

  function handleSelect(event: CountrySelectionEvent) {
    let selectedCity = event.detail.selectedItem.text;

    if (selectedCity == DEFAULT_ITEM.id) {
      value = '';
    } else {
      value = selectedCity;
    }
  }
</script>

<div class="flex">
  <Search bind:value on:clear={handleSearchReset} />

  <Dropdown
    type="inline"
    size="xl"
    class="normalize-dropdown bg-white"
    bind:selectedId
    on:select={handleSelect}
    itemToString={handleItemFormatting}
    items={[DEFAULT_ITEM, ...searchHistory]}
  />

  <Button
    class="text-white bg-[#0353e9] mx-auto"
    icon={SearchIcon}
    iconDescription="Search"
    on:click={handleClick}
  />
</div>

<style>
  :global(.normalize-dropdown) {
    grid-gap: 0;

    border-bottom: 1px solid rgb(141, 141, 141);
  }
</style>
