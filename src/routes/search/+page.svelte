<script>
  import List from '$lib/components/List.svelte';
  const { data } = $props();
  const { questions } = data;
</script>

<List {questions}/>