<script>
  import { Button, Input, Radio, Alert } from 'odj-svelte-ui';
  import Editor from '$lib/components/Editor.svelte';
  import Emoji from '$lib/components/Emoji.svelte';
  import { setContext } from 'svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  let questionData = $state({ question: "", description: "", footer: "", image: "", options: [] });
  let template = $state('blank');
  let page = $state('templates');
  let params = $state(5);

  const templates = {
    blank: {
      title: 'Em branco',
      id: 'blank',
      emojis: ['📄'],
      options: () => ({ question: "", description: "", footer: "", image: "", options: [] })
    },
    yesAndNo: {
      title: 'Sim e Não',
      id: 'yesAndNo',
      emojis: ['👍', '👎'],
      options: () => ({
        options: [
          { emoji: '👍', text: 'Sim', id: crypto.randomUUID() },
          { emoji: '👎', text: 'Não', id: crypto.randomUUID() }
        ]
      })
    },
    review: {
      title: 'Avaliação',
      id: 'review',
      emojis: ['⭐'],
      options: () => ({
        options: [
          { emoji: '##', text: 'Péssimo', id: crypto.randomUUID() },
          { emoji: '##', text: 'Ruim', id: crypto.randomUUID() },
          { emoji: '##', text: 'Razoável', id: crypto.randomUUID() },
          { emoji: '##', text: 'Bom', id: crypto.randomUUID() },
          { emoji: '##', text: 'Ótimo', id: crypto.randomUUID() }
        ]
      })
    },
    otherAndNever: {
      title: 'Outro e Nunca',
      id: 'otherAndNever',
      emojis: ['❔', '⛔'],
      options: () => ({
        options: [
          { emoji: '❔', text: 'Outro', id: crypto.randomUUID() },
          { emoji: '⛔', text: 'Nunca', id: crypto.randomUUID() }
        ]
      })
    },
    count: {
      title: 'Numeração',
      id: 'count',
      emojis: [''],
      options: (params) => ({
        options: Array.from({ length: Number(params) }, (_, index) => ({
          emoji: '##',
          text: String(index + 1),
          id: crypto.randomUUID()
        }))
      })
    }
  };
  
  let { data } = $props();
  setContext('token', data.token);

  let error = $state();
  let alertStatus = $state(false)
  $effect(() => {if (error) alertStatus = true});
  $effect(() => {if (alertStatus == false) error = undefined});
</script>

<svelte:head>
  <title>Nova pergunta</title>
</svelte:head>

{#if page === 'editor'}
  <Alert color="red" class="mb-2" dismissable bind:alertStatus>{error}</Alert>
  <form method="POST" class="flex flex-col gap-2" use:enhance={({ formElement, formData, action, cancel, submitter }) => {
    return async ({ result }) => {
      if (result.type === 'failure') {
        error = result.data.message;
        return;
      } else if (result.type === 'redirect') {
        goto(result.location);
      }
		};
  }}>
    <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-400">Nova pergunta</h1>
    <Editor bind:questionData={questionData}/>
    <input type="hidden" name="options" value={JSON.stringify(questionData?.options)}>
    <Button type="submit" class="mt-2">Mandar pergunta pra análise</Button>
  </form>
{:else}
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-400">Inicie com um template</h1>
    <div class="grid gap-3" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
      {#each Object.values(templates).filter(e => !['count'].includes(e.id)) as templateData}
        <Radio custom name="template" value={templateData.id} bind:group={template} required>
          <div class="w-full flex flex-col items-center justify-center gap-2 border dark:border-dark-surface-600/80 dark:bg-dark-surface-800/20 shadow-md p-6 rounded-xl cursor-pointer peer-checked:ring-1 peer-checked:outline-none peer-checked:border-primary-500 peer-checked:ring-primary-500 dark:peer-checked:border-primary-500 dark:peer-checked:ring-primary-500 peer-checked:bg-white dark:peer-checked:bg-dark-surface-600/40 h-full">
            <div class="flex flex-row gap-0.5">
              {#each templateData.emojis as emoji}
                <Emoji {emoji}/>
              {/each}
            </div>
            <span class="font-semibold text-base text-primary-700 dark:text-primary-400">{templateData.title}</span>
          </div>
        </Radio>
      {/each}
      <Radio custom name="template" value="count" bind:group={template} required>
        <div class="w-full flex flex-col items-center justify-center gap-2 border dark:border-dark-surface-600/80 dark:bg-dark-surface-800/20 shadow-md p-6 rounded-xl cursor-pointer peer-checked:ring-1 peer-checked:outline-none peer-checked:border-primary-500 peer-checked:ring-primary-500 dark:peer-checked:border-primary-500 dark:peer-checked:ring-primary-500 peer-checked:bg-white dark:peer-checked:bg-dark-surface-600/40 h-full">
          <Emoji emoji="#️⃣"/>
          <div class="flex flex-row items-center gap-1">
            <span class="font-semibold text-base text-primary-700 dark:text-primary-400">Numeração: de 1 a </span>
            <Input size="sm" class="w-14" type="number" max=20 min=2 bind:value={params}/>
          </div>
        </div>
      </Radio>
    </div>
    <Button class="mt-2" disabled={!template} onclick={() => {page = 'editor'; questionData = templates[template].options(params);}}>Criar pergunta</Button>
  </div>
{/if}