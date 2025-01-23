<script>
  import Question from '$lib/components/Question.svelte';
  const { data } = $props();
  const { latestQuestion, stats, queue } = data;
</script>

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
<div class="font-semibold text-primary-600 dark:text-dark-surface-200 text-sm">PERGUNTAS</div>