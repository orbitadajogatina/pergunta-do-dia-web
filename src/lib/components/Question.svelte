<script>
  import Create from 'svelte-ionicons/Create.svelte';
  import PaperPlane from 'svelte-ionicons/PaperPlane.svelte';
  import Discord from 'svelte-ionicons/LogoDiscord.svelte';
  import { Avatar, Tooltip } from 'odj-svelte-ui';
	import { onMount } from 'svelte';
  let { data: question } = $props();

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

<div class="p-8 rounded-xl flex flex-col gap-6 bg-white dark:bg-dark-surface-700/20">
  <h1 class="font-extrabold text-4xl text-primary-700 dark:text-primary-400">dolore consequat sit proident amet in et incididunt occaecat mollit cupidatat velit non consectetur aliquip tempor aute incididunt et sed mollit repre?</h1>
  <div class="flex items-center text-light-surface-800 dark:text-dark-surface-200 gap-2 pb-2 -mb-2 overflow-y-auto">
    <a href="/users/" class="flex items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 hover:bg-primary-100 dark:hover:bg-primary-800 p-2 rounded-lg">
      <Avatar size="xs" href="/users/"/>
      <span class="max-w-48 truncate">Loremzinho</span>
    </a>
    <div class="flex items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 p-2 rounded-lg" id="created">
      <Create size="1.5rem"/>
      <span>21/01/2023</span>
    </div>
    {#if question.sentAt}
      <div class="flex items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 p-2 rounded-lg" id="sent">
        <PaperPlane size="1.5rem"/>
        <span>21/01/2025</span>
      </div>
      <a href="/" target="_blank" class="flex w-max items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 hover:bg-[#dfebff] dark:hover:bg-[#2c3483] p-2 rounded-lg">
        <Discord size="1.5rem"/>
        <span class="whitespace-nowrap">Abrir no Discord</span>
      </a>
    {/if}
  </div>
  <p class="text-light-surface-900 dark:text-dark-surface-100">magna ex lorem qui fugiat laborum veniam laboris aute dolore cillum veniam non mollit nulla velit cillum lorem adipiscing sit sunt aliquip commodo eiusmod Excepteur consectetur non nulla mollit deserunt aute elit tempor officia in aliquip esse pariatur culpa do nostrud eiusmod adipiscing quis reprehenderit cillum sed irure ea culpa reprehenderit te</p>
  <img src="https://dummyimage.com/1920x1080.png?text=placeholder" alt="Imagem da Pergunta" class="max-h-80 mx-auto rounded-md aspect-auto">
  <span class="text-light-surface-700 dark:text-dark-surface-300 italic">magna ex lorem qui fugiat laborum veniam laboris aute dolore cillum veniam non mollit nulla velit cillum lorem adipiscing sit sunt aliquip commodo eiusmod Excepteur consectetur non nulla mollit deseru</span>
  <div class="relative rounded-lg min-h-10 bg-light-surface-200 dark:bg-[#262b29]">
    <div class="absolute top-0 left-0 h-full rounded-lg z-0 bg-primary-300 dark:bg-primary-600" style="width: 80%" id="progress"></div>
    <div class="relative z-10 flex flex-row items-center gap-1.5 justify-between p-3 rounded-lg">
      <div class="flex flex-row items-center gap-3 min-h-10">
        <em-emoji native="😀" set="twitter" size="2.2em"></em-emoji>
        <span class="font-bold text-lg">lorem ipsum dolor</span>
      </div>
      <div class="min-w-max text-right">10 votos</div>
    </div>
  </div>
</div>

<!-- TODO: REMAKE TOOLTIP -->
<Tooltip offset={10} triggeredBy="#created">Criado em</Tooltip>
<Tooltip offset={10} triggeredBy="#sent">Enviado em</Tooltip>

<textarea name="" id="">{JSON.stringify(question, null, 2)}</textarea>