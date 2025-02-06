<script>
  import List from '$lib/components/List.svelte';
  const { data } = $props();
  const { questions } = data;
</script>

<svelte:head>
  <title>Você faz pesquisas?</title>
</svelte:head>

<List {questions}/>