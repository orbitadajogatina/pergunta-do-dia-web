<script>
  import { Avatar } from 'odj-svelte-ui';
  import { DateTime } from 'luxon';

  let { lastQuestionISO, data } = $props();

  let waiting = $derived(data.filter(e => !e.alreadySent));
  let sent = $derived(data.filter(e => e.alreadySent));
</script>

{#snippet authorCard (author)}
  <li class="flex flex-row items-center gap-2">
    <Avatar src={author.avatarURL} size="sm"/>
    <span>{author.globalName}</span>
  </li>
{/snippet}

<span class="text-lg font-medium">{DateTime.fromISO(lastQuestionISO).minus({ 'days': sent.length }).toFormat('dd/LL/yyyy')} a {DateTime.fromISO(lastQuestionISO).plus({ 'days': waiting.length }).toFormat('dd/LL/yyyy')}</span>
{#if waiting.length > 0}
  <details open>
    <summary>Aguardando a vez</summary>
    <ul class="mt-1 ml-3 flex flex-col gap-2">
      {#each waiting as { author }}
        {@render authorCard (author)}
      {/each}
    </ul>
  </details>
{/if}
{#if sent.length > 0}
  <details open>
    <summary>Já teve sua pergunta enviada</summary>
    <ul class="mt-1 ml-3 flex flex-col gap-2">
      {#each sent as { author }}
        {@render authorCard (author)}
      {/each}
    </ul>
  </details>
{/if}
