<script lang="ts">
  import { Tile } from 'carbon-components-svelte';

  export let title: string;
  export let iconURL: string;
  export let temperature: number;
  export let kind: string;
  export let mode: 'compact' | 'normal' = 'normal';
</script>

<Tile class="flex items-center justify-between rounded-lg w-full mx-auto">
  {#if mode === 'normal'}
    <div class="flex flex-col gap-2">
      <h2 class="tracking-tight text-3xl font-bold text-gray-800">{title}</h2>
      <h4 class="text-2xl font-bold text-gray-800">{temperature}°C</h4>
      <p class="text-gray-600 capitalize">{kind}</p>
    </div>

    <img class="w-16 h-16" src={iconURL} alt={kind} />
  {:else if mode === 'compact'}
    <div class="flex justify-between items-center w-full text-gray-600">
      <div class="tracking-tight font-bold">{title}</div>
      <div>
        {temperature}°C,
        <span class="capitalize">{kind}</span>
      </div>
      <img class="w-16 h-16" src={iconURL} alt={kind} />
    </div>
  {/if}
</Tile>
