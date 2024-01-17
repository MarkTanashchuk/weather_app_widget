<script context="module" lang="ts">
  import { Weather } from '$widgets/weather/index.js';
</script>

<script lang="ts">
  import { Content } from 'carbon-components-svelte';
</script>

<Content class="flex flex-col items-center justify-center w-1/2 m-auto">
  <h1 class="text-4xl font-bold text-gray-800">Weather App</h1>

  <Weather showHistory />
</Content>
