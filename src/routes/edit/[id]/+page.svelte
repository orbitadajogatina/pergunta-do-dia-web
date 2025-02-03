<script>
  import { Button } from 'odj-svelte-ui';
  import Editor from '$lib/components/Editor.svelte';
  import { setContext } from 'svelte';

  let { data } = $props();
  let { question, token } = data;

  setContext('token', token);
</script>

<svelte:head>
  <title>Editar pergunta #{question.id}</title>
</svelte:head>

<form action="" class="flex flex-col gap-2">
  <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-400">Editar pergunta #{question.id}</h1>
  <Editor questionData={question}/>
  <Button type="submit" class="mt-2">Mandar pergunta pra análise</Button>
</form>