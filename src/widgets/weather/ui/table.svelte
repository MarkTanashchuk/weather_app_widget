<script lang="ts">
  import { WeatherCard, type WeatherData } from '$widgets/weather/index.js';
  import { Tile } from 'carbon-components-svelte';

  export let items: WeatherData[];
</script>

<Tile class="pr-0 h-full flex-[1_1_0]">
  {#if items.length > 0}
    <h2 class="font-bold">Search history:</h2>
    <div class="flex flex-col flex-1 h-full pr-4 overflow-y-scroll">
      {#each items as item}
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
    <p class="pr-4">Make at least one search to enable search history</p>
  {/if}
</Tile>
