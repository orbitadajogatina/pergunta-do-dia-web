<script>
  import { Input, Button, Spinner, input } from 'odj-svelte-ui';
  import { getContext, onMount } from 'svelte';
  import Search from 'svelte-ionicons/Search.svelte';
  
  let { includeDollarSign = false, result = $bindable(), otherClasses, options } = $props();
  
  let query = $state();
  let inputValue = $state();

  const token = getContext('token');

  async function getImages(query) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({query, searchOptions: options}),
			headers: {
				'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
			}
    };
    const imagesResponse = await fetch('/searchImages', requestOptions);
    const images = await imagesResponse.json();
    return images;
  }
</script>

<div class="flex flex-row gap-2">
  <Input type="search" placeholder="jabuticaba" bind:value={inputValue}/>
  <Button onclick={() => query = inputValue}>
    <Search size="1.2rem"/>
  </Button>
</div>
{#if query}
  {#await getImages(query)}
    <div class="w-min mx-auto mt-2">
      <Spinner/>
    </div>
  {:then images}
    <div class="mt-2 overflow-x-auto flex flex-wrap justify-around gap-2 {otherClasses}">
      {#each images.slice(0, 30) as image}
        <button type="button" onclick={() => result = includeDollarSign ? `$[Imagem](${image})$` : image}>
          <img src={image} alt="Imagem" class="h-20 border rounded-lg">
        </button>
      {/each}
    </div>
  {/await}
{/if}