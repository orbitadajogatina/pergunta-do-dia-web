<script>
  import { Button, Input, Spinner, Avatar, Tabs, TabItem, Label, Select } from 'odj-svelte-ui';
  import Question from '$lib/components/Question.svelte';
  import List from '$lib/components/List.svelte';
  import { getQuestions } from '$lib/utils.js';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';

  let { data } = $props();
  let { user, profile, firstPage, token } = $derived(data);
  
  let theme = writable('system');
  if (browser) {
    theme = writable(localStorage?.getItem("theme") || 'system');
    theme.subscribe(value => localStorage.setItem("theme", value));
  }
</script>

<svelte:head>
  <title>Indagações de {profile.globalName}</title>
</svelte:head>

<div class="w-full bg-light-surface-300 dark:bg-dark-surface-700/30 mt-2 min-h-10 mb-4 text-center flex flex-col gap-2 p-4 rounded-lg">
  <Avatar src={profile.avatarURL} size="lg" class="mx-auto"/>
  <h1 class="font-bold text-3xl">{profile.globalName}</h1>
  <span class="font-medium text-md">@{profile.username}</span>
</div>

{#snippet profileQuestions()}
  <div class="mt-4">
    {#if firstPage.count <= 499}
      <List questions={firstPage.questions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).sort((a, b) => a.status - b.status)}/>
    {:else}
      {#await getQuestions(token, false, [...firstPage.questions], 1, `https://pergunta-do-dia.onrender.com/api/v1/questions?author=${profile.id}&`)}
        <div class="w-full text-center">
          <Spinner/>
        </div>
      {:then questions}
        <List questions={questions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).sort((a, b) => a.status - b.status)}/>
      {:catch error}
        <span>Erro: {error}</span>
      {/await}
    {/if}
  </div>
{/snippet}

{#if user.id === profile.id}
  <Tabs tabStyle="full" ulClass="max-w-max mx-auto">
    <TabItem title="Indagações" open>
      {@render profileQuestions()}
    </TabItem>
    <TabItem title="Configurações">
      <div class="grid grid-rows-2 md:grid-cols-2 gap-4">
        <div>
          <h2 class="text-xl font-bold text-primary-700 dark:text-primary-400 mb-2">Aparência</h2>
          <Label>
            <span>Tema</span>
            <Select name="selectTheme" id="selectTheme" placeholder={null} bind:value={$theme} onchange={loadTheme}>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="auto">Sistema</option>
            </Select>
          </Label>
        </div>
        <form method="POST">
          <h2 class="text-xl font-bold text-primary-700 dark:text-primary-400 mb-2">Conta</h2>
          <Button color="red" class="w-full" type="submit">Deslogar</Button>
        </form>
      </div>
    </TabItem>
  </Tabs>
{:else}
  {@render profileQuestions()}
{/if}