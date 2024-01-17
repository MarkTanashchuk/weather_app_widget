import Search from './ui.svelte';
import type { DropdownItem } from 'carbon-components-svelte/src/Dropdown/Dropdown.svelte';
import { nanoid } from 'nanoid';

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

export { Search };
