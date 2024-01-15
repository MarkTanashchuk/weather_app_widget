<script lang="ts">
  import Weather from '$widgets/weather/index.svelte';
  import { Content, Dropdown } from 'carbon-components-svelte';

  const items = [{ id: '0', text: 'Ukraine' }];

  let cityId: string = '0';
</script>

<Content class="flex flex-col items-center justify-center w-1/2 m-auto">
  <h1 class="text-4xl font-bold text-gray-800">Weather App</h1>

  <div class="flex flex-col w-full max-w-md gap-8">
    <Dropdown titleText="Choose city" bind:selectedId={cityId} {items} />

    <Weather kind="sunny" temperature={20} title={'New York'} />
    <Weather kind="sunny" temperature={20} title={'New York'} mode={'compact'} />
  </div>
</Content>
