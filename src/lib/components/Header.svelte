<script>
  import { Darkmode, Avatar, Input, Button, ButtonGroup } from 'odj-svelte-ui';
  import Search from 'svelte-ionicons/Search.svelte';
  import Add from 'svelte-ionicons/AddCircleOutline.svelte';

	let { user } = $props();
  let searchQuery = $state('');
</script>

<header class="fixed w-full z-40 p-2 backdrop-blur-lg bg-light-surface-400/20 dark:bg-dark-surface-500/20">
  <div class="container mx-auto flex flex-row justify-between">
    <a href="/">
      <img src="/logo-with-text.png" alt="Logo Pergunta do Dia" class="h-10 hidden dark:sm:block">
      <img src="/logo-with-text-alternative.png" alt="Logo Pergunta do Dia" class="h-10 hidden sm:block dark:hidden">
      <img src="/logo-no-background.png" alt="Logo Pergunta do Dia" class="h-10 sm:hidden">
    </a>
    <div class="max-w-md w-full hidden md:block">
      <ButtonGroup class="w-full">
        <Input type="search" class="!w-full !z-10 peer" placeholder="Pesquisar perguntas..." bind:value={searchQuery}/>
        <!-- -->
        <Button color="primary" class="!z-0 border border-light-surface-300 dark:border-dark-surface-600 border-l-0 disabled:!bg-white dark:disabled:!bg-dark-surface-500 group peer-focus:ring-1 peer-focus:border-primary-500 peer-focus:ring-primary-500" disabled={!searchQuery}>
          <Search class="h-4 w-4 outline-none group-disabled:text-light-surface-500 dark:group-disabled:text-white" disabled={!searchQuery}/>
        </Button>
      </ButtonGroup>
    </div>
    <div class="flex flex-row items-center gap-4">
      <Darkmode/>
      <a href="/nova" class="text-light-surface-700 hover:text-primary-600 dark:text-dark-surface-100 dark:hover:text-dark-surface-400">
        <Add class="outline-none w-7 h-7"/>
      </a>
      <Avatar src={user.avatarURL}/>
    </div>
  </div>
</header>