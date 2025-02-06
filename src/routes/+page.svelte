<script>
  import { Button, Input, Spinner } from 'odj-svelte-ui';
  import Question from '$lib/components/Question.svelte';
  import List from '$lib/components/List.svelte';
  import { getQuestions } from '$lib/utils.js';
  import Shuffle from 'svelte-ionicons/Shuffle.svelte';
  import Calendar from 'svelte-ionicons/Calendar.svelte';

  const { data } = $props();
  const { latestQuestion, stats, queue, token } = data;
  
  let queryQuestionByID = $state();
  let random = $state(false);

  function shuffleQuestions() {
    random = random ? false : true;
  }
</script>

<svelte:head>
  <title>Pergunta do Dia Web</title>
</svelte:head>

<div class="flex flex-col lg:flex-row gap-4">
  <div class="flex flex-col gap-1 lg:w-3/4">
    <div class="font-semibold text-primary-600 dark:text-dark-surface-200 text-sm">PERGUNTA DO DIA</div>
    <Question data={latestQuestion}/>
  </div>
  <div class="flex flex-col gap-4 lg:w-1/4">
    <div class="flex flex-col gap-1 h-1/2">
      <div class="font-semibold text-primary-600 dark:text-dark-surface-200 text-sm">ESTATÍSTICAS</div>
      <div class="p-4 rounded-xl flex flex-col gap-2 bg-white dark:bg-dark-surface-700/20 h-full"></div>
    </div>
    <div class="flex flex-col gap-1 h-1/2">
      <div class="font-semibold text-primary-600 dark:text-dark-surface-200 text-sm">FILA</div>
      <div class="p-4 rounded-xl flex flex-col gap-2 bg-white dark:bg-dark-surface-700/20 h-full"></div>
    </div>
  </div>
</div>
<!-- approvedQuestions (daysPrediction), sentQuestions, declinedQuestions, inReviewQuestions -->
<div class="flex flex-col gap-1">
  <div class="font-semibold text-primary-600 dark:text-dark-surface-200 text-sm mt-4">PERGUNTAS ENVIADAS</div>
  <div class="p-4 rounded-xl flex flex-col gap-4 bg-white dark:bg-dark-surface-700/20">
    <div class="flex flex-row flex-wrap gap-2">
      <Button color={random ? "primary" : "alternative"} onclick={shuffleQuestions}><Shuffle class="outline-none mr-2"/>Aleatorizar</Button>
      <Button color="alternative" disabled><Calendar class="outline-none mr-2"/>Escolher data...</Button>
      <Input type="text" class="w-max" placeholder="ID da mensagem" bind:value={queryQuestionByID}/>
    </div>
    {#key random}
      {#await getQuestions(token, random)}
        <div class="mx-auto">
          <Spinner/>
        </div>
      {:then questions}
        <List questions={questions.filter(e => e.status === 3 && (queryQuestionByID ? e.messageID?.includes(queryQuestionByID) : true)).reverse()}/>
      {:catch error}
        <span>Erro: {error}</span>
      {/await}
    {/key}
  </div>
</div>