<script>
  import Emoji from './Emoji.svelte';
  import Create from 'svelte-ionicons/Create.svelte';
  import PaperPlane from 'svelte-ionicons/PaperPlane.svelte';
  import Discord from 'svelte-ionicons/LogoDiscord.svelte';
  import { Avatar, Tooltip, Badge } from 'odj-svelte-ui';
	import { onMount } from 'svelte';
  import { DateTime } from 'luxon';
  
  let { data: question } = $props();
  let totalVotes = question.options.reduce((previous, current, index) => previous + (current.votes || 0), 0);

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
  {#if question.status !== 3}
    <div class="-my-2">
      <Badge rounded large color={['yellow', 'red', 'primary'][question.status]}>{['Em análise', 'Recusada', 'Aprovada'][question.status]}</Badge>
    </div>
  {/if}
  <h1 class="font-extrabold text-4xl text-primary-700 dark:text-primary-400">{question.question}</h1>
  <div class="flex items-center text-light-surface-800 dark:text-dark-surface-200 gap-2 pb-2 -mb-2 overflow-y-auto">
    <a href="/users/{question.author.id}" class="flex items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 hover:bg-primary-100 dark:hover:bg-primary-800 p-2 rounded-lg">
      <Avatar size="xs" src={question.author.avatarURL}/>
      <span class="max-w-48 truncate">{question.author.globalName}</span>
    </a>
    <div class="flex items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 p-2 rounded-lg" id="created">
      <Create size="1.5rem"/>
      <span>{DateTime.fromISO(question.createdAt).toFormat('dd/LL/yyyy')}</span>
    </div>
    {#if question.sentAt}
      <div class="flex items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 p-2 rounded-lg" id="sent">
        <PaperPlane size="1.5rem"/>
        <span>{DateTime.fromISO(question.sentAt).toFormat('dd/LL/yyyy')}</span>
      </div>
    {/if}
    {#if question.messageLink}
      <a href={question.messageLink} target="_blank" class="flex w-max items-center gap-2 bg-light-surface-100 dark:bg-dark-surface-700/20 hover:bg-[#dfebff] dark:hover:bg-[#2c3483] p-2 rounded-lg">
        <Discord size="1.5rem"/>
        <span class="whitespace-nowrap">Abrir no Discord</span>
      </a>
    {/if}
  </div>
  {#if question.description}
    <p class="text-light-surface-900 dark:text-dark-surface-100">{question.description}</p>
  {/if}
  {#if question.image}
    <img src={question.image} alt="Imagem da Pergunta" class="max-h-80 mx-auto rounded-md aspect-auto">
  {/if}
  {#if question.footer}
    <span class="text-light-surface-700 dark:text-dark-surface-300 italic">{question.footer}</span>
  {/if}
  <div class="flex flex-col gap-3">
    {#each question.options as option}
      <div class="relative rounded-lg min-h-10 bg-light-surface-200 dark:bg-[#262b29]">
        <div class="absolute top-0 left-0 h-full rounded-lg z-0 bg-primary-300 dark:bg-primary-600" style="width: {option.votes/totalVotes * 100}%" id="progress"></div>
        <div class="relative z-10 flex flex-row items-center gap-1.5 justify-between p-3 rounded-lg">
          <div class="flex flex-row items-center gap-3 min-h-10">
            <Emoji emoji={option.emoji}/>
            <span class="font-bold text-lg">{option.text}</span>
          </div>
          {#if option.votes?.toString()}
            <div class="min-w-max text-right">{option.votes} {option.votes > 1 ? 'votos' : 'voto'}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- TODO: REMAKE TOOLTIP -->
<Tooltip offset={10} triggeredBy="#created">Criado em</Tooltip>
<Tooltip offset={10} triggeredBy="#sent">Enviado em</Tooltip>

<textarea name="" id="" rows=30>{JSON.stringify(question, null, 2)}</textarea>