<script>
  import { Button, Alert } from 'odj-svelte-ui';
  import Editor from '$lib/components/Editor.svelte';
  import { setContext } from 'svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  let { data } = $props();
  let { token } = data;
  let question = $state(data.question);

  setContext('token', token);

  let error = $state();
  let alertStatus = $state(false)
  $effect(() => {if (error) alertStatus = true});
  $effect(() => {if (alertStatus == false) error = undefined});
</script>

<svelte:head>
  <title>Editar pergunta #{question.id}</title>
</svelte:head>

<Alert color="red" class="mb-2" dismissable bind:alertStatus>{error}</Alert>
<form method="POST" class="flex flex-col gap-2" use:enhance={() => {
  return async ({ result }) => {
    if (result.type === 'failure') {
      error = result.data.message;
      return;
    } else if (result.type === 'redirect') {
      goto(result.location);
    }
  };
}}>
  <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-400">Editar pergunta #{question.id}</h1>
  <Editor bind:questionData={question}/>
  <input type="hidden" name="options" value={JSON.stringify(question?.options)}>
  <input type="hidden" name="id" value={question?.id}>
  <Button type="submit" class="mt-2">Mandar edição pra análise</Button>
</form>