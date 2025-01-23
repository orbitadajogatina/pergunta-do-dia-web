<script>
  import Question from '$lib/components/Question.svelte';
  const { data } = $props();
  const { question } = data;
</script>

<svelte:head>
  <title>{question.question}</title>
</svelte:head>

<Question data={question}/>