<script>
  import { Button, Modal, uiHelpers } from 'odj-svelte-ui';
  import Question from '$lib/components/Question.svelte';
  const { data } = $props();
  const { question, user } = data;

  const modalConfirmDelete = uiHelpers();
  let modalStatus = $state(false);
  const closeModal = modalConfirmDelete.close;
  $effect(() => {
    modalStatus = modalConfirmDelete.isOpen;
  });

  $inspect(modalStatus)

  function deleteQuestion() {

  }
</script>

<svelte:head>
  <title>{question.question}</title>
</svelte:head>

{#if question.status !== 3 && question.author.id === user.id}
  <div class="flex flex-row gap-2 mb-2 justify-end">
    <Button href="/edit/{question.id}">Editar</Button>
    <Button onclick={() => modalStatus = true} color="red">Apagar</Button>
  </div>
{/if}
<Question data={question}/>

<Modal size="xs" {modalStatus} {closeModal}>
  <div class="text-center">
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Você quer mesmo deletar essa pergunta?</h3>
    <Button color="red" class="me-2">Sim, quero deletar</Button>
    <Button color="alternative">Cancelar</Button>
  </div>
</Modal>