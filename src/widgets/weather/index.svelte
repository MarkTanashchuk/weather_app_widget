<script lang="ts">
  import { Tile } from 'carbon-components-svelte';
  import SunIcon from 'carbon-icons-svelte/lib/Sun.svelte';

  export let title: string;
  export let temperature: number;
  export let kind: 'sunny';
</script>

<Tile class="flex items-center justify-between rounded-lg w-full mx-auto">
  <div class="flex flex-col gap-2">
    <h2 class="tracking-tight text-3xl font-bold text-gray-800">{title}</h2>
    <h4 class="text-2xl font-bold text-gray-800">{temperature}°C</h4>
    <p class="text-gray-600 capitalize">{kind}</p>
  </div>

  {#if kind === 'sunny'}
    <SunIcon class="w-16 h-16 text-yellow-500" />
  {/if}
</Tile>
