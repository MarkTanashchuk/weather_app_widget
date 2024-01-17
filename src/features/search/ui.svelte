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

  export function generateDropdownItem(text: string): DropdownItem {
    return {
      id: nanoid(),
      text
    };
  }

  export const DEFAULT_ITEM: DropdownItem = generateDropdownItem('');
  export const DELIMITER_ITEM: DropdownItem = generateDropdownItem('');

  export const BASE_CITIES: DropdownItem[] = [
    generateDropdownItem('New York'),
    generateDropdownItem('Ukraine')
  ];
</script>

<script lang="ts">
  import { Button, Dropdown, Search } from 'carbon-components-svelte';
  import FilterIcon from 'carbon-icons-svelte/lib/Filter.svelte';
  import SearchIcon from 'carbon-icons-svelte/lib/Search.svelte';
  import { createEventDispatcher, onMount } from 'svelte';

  export let value: string = DEFAULT_ITEM.text;
  export let selectedId: string = DEFAULT_ITEM.id;
  export let searchHistory: DropdownItem[];

  const dispatch = createEventDispatcher<{
    search: SearchEvent['detail'];
    reset: void;
  }>();

  onMount(() => {
    if (searchHistory.length > 0) {
      const recentItem = searchHistory[0];

      selectedId = recentItem.id;
      value = recentItem.text;
    }
  });

  function handleSearch() {
    dispatch('search', { value });
  }

  function handleItemFormatting(item: DropdownItem): string {
    if (item.id === DEFAULT_ITEM.id) {
      return 'Select city';
    }

    if (item.id === DELIMITER_ITEM.id) {
      return 'Previous search history:';
    }

    return item.text || item.id;
  }

  function handleSearchReset() {
    selectedId = DEFAULT_ITEM.id;
  }

  function handleClearHistory() {
    dispatch('reset');
  }

  function handleSelect(event: CountrySelectionEvent) {
    value = event.detail.selectedItem.text;
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
    items={[DEFAULT_ITEM, ...BASE_CITIES, DELIMITER_ITEM, ...searchHistory]}
  />

  <Button
    kind="danger"
    class="bg-[#da1e28]"
    icon={FilterIcon}
    iconDescription="Clear Search History"
    on:click={handleClearHistory}
  />

  <Button
    class="text-white bg-[#0353e9] mx-auto"
    icon={SearchIcon}
    iconDescription="Search"
    on:click={handleSearch}
  />
</div>

<style>
  :global(.normalize-dropdown) {
    grid-gap: 0;

    border-bottom: 1px solid rgb(141, 141, 141);
  }
</style>
