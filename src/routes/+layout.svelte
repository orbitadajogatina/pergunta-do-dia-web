<script>
  import { page } from '$app/stores';
	import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";

	let { data, children } = $props();
  let user = $derived(data.user);

	let hideHeaderAndFooter = $derived(['/login'].includes($page.url.pathname));
	let totalFreeSpace = $derived(['/login'].includes($page.url.pathname));
</script>

<svelte:head>
  <title>Pergunta do Dia Web</title>
</svelte:head>

<ProgressBar class="text-primary-500" zIndex={100}/>

{#if !hideHeaderAndFooter}
  <Header {user}/>
{/if}

<div class="flex-grow{!totalFreeSpace ? ' p-2 mx-auto container' : ''}{!hideHeaderAndFooter ? ' mt-[60px]' : ''}">
	{@render children()}
</div>

{#if !hideHeaderAndFooter}
  <footer class="bg-neutral-300 dark:bg-neutral-500/20 text-center text-sm p-2 flex flex-col gap-1">
    <span>Pergunta do Dia Web v0.1.1 • <a href="https://rbitadajogatina.mintlify.app/introduction" target="_blank" class="underline">Documentação da API</a></span>
    <span>Órbita da Jogatina • 2025</span>
  </footer>
{/if}