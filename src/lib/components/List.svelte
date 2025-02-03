<script>
  import { Pagination, Badge, Select } from 'odj-svelte-ui';
  import { DateTime } from 'luxon';
  import ChevronBack from 'svelte-ionicons/ChevronBack.svelte';
  import ChevronForward from 'svelte-ionicons/ChevronForward.svelte';

  let { questions, size = $bindable(30), page = $bindable(0) } = $props();
  const sizes = [{value: 7, name: 7},{value: 15, name: 15}, {value: 30, name: 30}, {value: 60, name: 60}, {value: 90, name: 90}, {value: 180, name: 180}, {value: 365, name: 365}]

  let pages = $derived(Array.from({ length: Math.ceil(questions.length / size) }, (_, i) => ({
    name: (i + 1).toString(),
    active: i === page,
  })));

  const previous = () => {
    if (page === 0) return;
    page--;
  };
  const next = () => {
    if (page === pages.length - 1) return;
    page++;
  };
  function changePage() {
    const newPage = parseInt(this.innerText) - 1;
    if (isNaN(newPage)) return;
    page = newPage;
  }
</script>

<div class="flex flex-col gap-4">
  <div class="mx-auto max-w-full">
    <Pagination {pages} {previous} {next} onclick={changePage}>
      {#snippet prevContent()}
        <span class="sr-only">Previous</span>
        <ChevronBack class="h-5 w-5" />
      {/snippet}
      {#snippet nextContent()}
        <span class="sr-only">Next</span>
        <ChevronForward class="h-5 w-5" />
      {/snippet}
    </Pagination>
  </div>
  
  <div class="flex flex-col gap-2">
    {#each questions.slice(page * size, size * (page + 1)) as question}
      <a href="/question/{question.id}" class="p-4 bg-light-surface-300/50 dark:bg-[#262b29] rounded-lg">
        <div class="flex flex-row gap-2 items-center">
          {#if question.status !== 3}
            <Badge rounded large color={['yellow', 'red', 'primary'][question.status]}>{['Em análise', 'Recusada', 'Aprovada'][question.status]}</Badge>
          {/if}
          <h3 class="text-lg font-bold">{question.question}</h3>
        </div>
        <span class="text-sm">{question.sentAt ? "Enviado em" : "Criado em"} {DateTime.fromISO(question.sentAt || question.createdAt).setLocale('pt-BR').toFormat('EEEE, dd/LL/yyyy')}</span>
      </a>
    {/each}
  </div>
  
  <div class="text-center w-full text-sm mx-auto">Exibindo {questions.slice(page * size, size * (page + 1)).length} de <Select size="sm" class="w-16 inline" placeholder="Número de itens por página..." items={sizes} bind:value={size} onchange={() => page = 0}/> perguntas por página</div>
</div>