<script>
  import { Button, Input } from 'odj-svelte-ui';
  import Editor from '$lib/components/Editor.svelte';
  import { onMount } from 'svelte';

  let template = $state('blank');
  let params = $state(5);
  const templates = {
    yesAndNo: () => ({
      options: [
        { emoji: '👍', text: 'Sim' },
        { emoji: '👎', text: 'Não' }
      ]
    }),
    review: () => ({
      options: [
        { emoji: '##', text: 'Péssimo' },
        { emoji: '##', text: 'Ruim' },
        { emoji: '##', text: 'Razoável' },
        { emoji: '##', text: 'Bom' },
        { emoji: '##', text: 'Ótimo' }
      ]
    }),
    otherAndNever: () => ({
      options: [
        { emoji: '❔', text: 'Outro' },
        { emoji: '⛔', text: 'Nunca' }
      ]
    }),
    count: (params) => ({
      options: Array.from({ length: Number(params[1]) }, (_, index) => ({
        emoji: '##',
        text: String(index + 1)
      }))
    }),
    blank: () => undefined
  };

  onMount(async () => {
    console.log('loading emojis...');
    const EmojiMart = await import('emoji-mart');
    const {init} = EmojiMart;
    init({ data: async () => {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data')
      return response.json();
    }});
  })
</script>

{#if template}
  <form action="" class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-400">Nova pergunta</h1>
    <Editor question={templates[template](params)}/>  
    <Button type="submit" class="mt-2">Mandar pergunta pra análise</Button>
  </form>
{:else}
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold text-primary-700 dark:text-primary-400">Inicie com um template</h1>
    <div class="flex flex-row gap-2">
      <div class="flex flex-col items-center gap-2 border shadow-md p-4 rounded-xl">
        <div class="flex flex-row gap-0.5">
          <em-emoji native="📄" set="twitter" size="2.2rem"></em-emoji>
        </div>
        <span class="font-semibold text-primary-700 dark:text-primary-400">Em branco</span>
      </div>
      <div class="flex flex-col items-center gap-2 border shadow-md p-4 rounded-xl">
        <div class="flex flex-row gap-0.5">
          <em-emoji native="👍" set="twitter" size="2.2rem"></em-emoji>
          <em-emoji native="👎" set="twitter" size="2.2rem"></em-emoji>
        </div>
        <span class="font-semibold text-primary-700 dark:text-primary-400">Sim e Não</span>
      </div>
      <div class="flex flex-col items-center gap-2 border shadow-md p-4 rounded-xl">
        <div class="flex flex-row gap-0.5">
          <em-emoji native="❔" set="twitter" size="2.2rem"></em-emoji>
          <em-emoji native="⛔" set="twitter" size="2.2rem"></em-emoji>
        </div>
        <span class="font-semibold text-primary-700 dark:text-primary-400">Outro e Nunca</span>
      </div>
      <div class="flex flex-col items-center gap-2 border shadow-md p-4 rounded-xl">
        <div class="flex flex-row gap-0.5">
          <em-emoji native="⭐" set="twitter" size="2.2rem"></em-emoji>
        </div>
        <span class="font-semibold text-primary-700 dark:text-primary-400">Avaliação</span>
      </div>
      <div class="flex flex-col items-center gap-2 border shadow-md p-4 rounded-xl">
        <div class="flex flex-row gap-0.5">
          <em-emoji native="#️⃣" set="twitter" size="2.2rem"></em-emoji>
        </div>
        <span class="font-semibold text-primary-700 dark:text-primary-400">Numeração: de 1 a </span>
      </div>
    </div>
  </div>
{/if}