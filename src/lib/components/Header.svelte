<script>
  import { Avatar, Input, Button, ButtonGroup } from 'odj-svelte-ui';
  import Search from 'svelte-ionicons/Search.svelte';
  import Add from 'svelte-ionicons/AddCircleOutline.svelte';
  import { goto } from '$app/navigation';

	let { user } = $props();
  let searchQuery = $state('');
</script>

<header class="fixed w-full z-40 backdrop-blur-lg bg-light-surface-400/20 dark:bg-dark-surface-500/20">
  <div class="container mx-auto p-2 flex flex-row justify-between items-center">
    <div class="flex flex-row gap-2 md:gap-0 items-center">
      <a href="/" class="w-max sm:w-full">
        <img src="/logo-with-text.svg" alt="Logo Pergunta do Dia" class="h-7 hidden dark:sm:block">
        <img src="/logo-with-text-alternative.svg" alt="Logo Pergunta do Dia" class="h-7 hidden sm:block dark:hidden">
        <img src="/logo-no-background.svg" alt="Logo Pergunta do Dia" class="h-9 sm:hidden">
      </a>
      <form class="max-w-40 md:max-w-56 lg:max-w-md w-full block" method="GET" action="/search">
        <ButtonGroup class="w-full">
          <Input type="search" class="!w-full !z-10 peer" name="query" placeholder="Pesquisar perguntas..." autocomplete="off" bind:value={searchQuery}/>
          <Button color="primary" class="!z-0 border border-light-surface-300 dark:border-dark-surface-600 border-l-0 disabled:!bg-white dark:disabled:!bg-dark-surface-500 group peer-focus:ring-1 peer-focus:border-primary-500 peer-focus:ring-primary-500" disabled={!searchQuery} type="submit">
            <Search class="h-4 w-4 outline-none group-disabled:text-light-surface-500 dark:group-disabled:text-white" disabled={!searchQuery}/>
          </Button>
        </ButtonGroup>
      </form>
    </div>
    <div class="flex flex-row items-center gap-4">
      <a href="/new" class="text-light-surface-700 hover:text-primary-600 dark:text-dark-surface-100 dark:hover:text-dark-surface-400">
        <Add class="outline-none w-7 h-7"/>
      </a>
      <Avatar src={user.avatarURL} href="/user"/>
    </div>
  </div>
</header>