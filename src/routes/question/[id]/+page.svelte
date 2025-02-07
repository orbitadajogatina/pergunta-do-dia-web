<script>
  import { Button, Modal, Spinner, uiHelpers } from 'odj-svelte-ui';
  import Question from '$lib/components/Question.svelte';
  import { goto } from '$app/navigation';
  import List from '$lib/components/List.svelte';
  let { data } = $props();
  let { user, token } = data;
  let question = $derived(data.question);
  let similarQuestions = $derived(data.similarQuestions);

  const modalConfirmDelete = uiHelpers();
  let modalStatus = $state(false);
  const closeModal = modalConfirmDelete.close;
  $effect(() => {
    modalStatus = modalConfirmDelete.isOpen;
  });

  let error = $state();
  let deleting = $state(false);

  async function deleteQuestion() {
    deleting = true;
    const options = {method: 'DELETE', headers: {Authorization: 'Bearer ' + token}};
    const deleteQuestionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + question.id, options);
    const deletedQuestion = await deleteQuestionResponse.json();
    
    if (deletedQuestion.error) {
      deleting = false;
      error = deletedQuestion.error;
      modalConfirmDelete.close();
    } else {
      goto('/user');
    }
  }
</script>

<svelte:head>
  <title>{question.question}</title>
</svelte:head>

{#if similarQuestions.length > 0}
  <div class="font-semibold text-primary-600 dark:text-dark-surface-200 text-sm mb-1">PERGUNTAS PARECIDAS</div>
  <div class="mb-2 pb-2 border-b dark:border-dark-surface-700/40">
    <List questions={similarQuestions} paginationComponents={false}/>
  </div>  
{/if}

{#if question.status !== 3 && question.author.id === user.id}
  <div class="flex flex-row gap-2 mb-2 justify-end">
    <Button href="/edit/{question.id}">Editar</Button>
    <Button onclick={() => modalConfirmDelete.open()} color="red">Apagar</Button>
  </div>
{/if}
<Question data={question}/>

<Modal size="xs" {modalStatus} {closeModal}>
  <div class="text-center">
    <h3 class="my-4 text-lg font-normal text-light-surface-500 dark:text-dark-surface-400">Você quer mesmo deletar essa pergunta?</h3>
    {#if deleting}
      <div class="w-full text-center">
        <Spinner/>
      </div>
    {:else}
      <Button color="red" class="me-2" onclick={deleteQuestion}>Sim, quero deletar</Button>
      <Button color="alternative" onclick={() => modalConfirmDelete.close()}>Cancelar</Button>
    {/if}
  </div>
</Modal>