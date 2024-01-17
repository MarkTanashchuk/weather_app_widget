<script lang="ts">
  import { WeatherCard, type WeatherData } from '$widgets/weather/index.js';
  import { Tile } from 'carbon-components-svelte';

  export let items: WeatherData[];
</script>

<Tile>
  {#if items.length > 0}
    <h2 class="font-bold">Search history:</h2>
    <div class="flex flex-col">
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
    <p>Make at least one search to enable search history</p>
  {/if}
</Tile>
