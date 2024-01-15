<script lang="ts">
  import { Tile } from 'carbon-components-svelte';
  import SunIcon from 'carbon-icons-svelte/lib/Sun.svelte';

  export let title: string;
  export let temperature: number;
  export let kind: 'sunny';
  export let mode: 'compact' | 'normal' = 'normal';
</script>

<Tile class="flex items-center justify-between rounded-lg w-full mx-auto">
  {#if mode === 'normal'}
    <div class="flex flex-col gap-2">
      <h2 class="tracking-tight text-3xl font-bold text-gray-800">{title}</h2>
      <h4 class="text-2xl font-bold text-gray-800">{temperature}°C</h4>
      <p class="text-gray-600 capitalize">{kind}</p>
    </div>

    {#if kind === 'sunny'}
      <SunIcon class="w-16 h-16 text-yellow-500" />
    {/if}
  {:else if mode === 'compact'}
    <div class="flex justify-between items-center w-full text-gray-600">
      <div class="tracking-tight font-bold">{title}</div>
      <div>
        {temperature}°C,
        <span class="capitalize">{kind}</span>
      </div>
      {#if kind === 'sunny'}
        <SunIcon class="w-6 h-6 text-yellow-500" />
      {/if}
    </div>
  {/if}
</Tile>
