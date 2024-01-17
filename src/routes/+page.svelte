<script context="module" lang="ts">
  import { Weather } from '$widgets/weather/index.js';
</script>

<script lang="ts">
  import { Content } from 'carbon-components-svelte';
</script>

<Content class="flex flex-col container h-screen items-center justify-center m-auto py-8">
  <h1 class="text-4xl font-bold text-gray-800">Weather App</h1>

  <Weather showHistory />
</Content>
