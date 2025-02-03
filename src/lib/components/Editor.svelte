<script>
  import { Input, Label, Textarea, Button } from 'odj-svelte-ui';
  import Options from './Editor.Options.svelte';
  import Search from './Editor.Search.svelte';
  import SearchIcon from 'svelte-ionicons/Search.svelte';

  let { questionData = { question: "", description: "", footer: "", image: "", options: [] } } = $props();
  let question = $state(questionData);

  // FLOATING UI
  import {
    arrow,
    autoUpdate,
    flip,
    offset,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
  } from "@skeletonlabs/floating-ui-svelte";
  import { fade } from "svelte/transition";

  function handleEmojiPicked(data) {
    const { native } = data;
    emoji = native;
  }

  // State
  let open = $state(false);
  let elemArrow = $state(null);

  // Use Floating
  const floating = useFloating({
    whileElementsMounted: autoUpdate,
    get open() {
      return open;
    },
    onOpenChange: (v) => {
      open = v;
    },
    placement: "right",
    get middleware() {
      return [offset(10), flip(), elemArrow && arrow({ element: elemArrow })];
    },
  });

  // Interactions
  const role = useRole(floating.context);
  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context);
  const interactions = useInteractions([role, click, dismiss]);
</script>

<textarea rows=4>{JSON.stringify(question)}</textarea>
<div class="flex flex-col gap-2">
  <Label for="question" class="space-y-1">
    <span>Pergunta</span>
    <Input name="question" placeholder="Você tem perguntas?" bind:value={question.question} minlength=5 maxlength=150 required/>
  </Label>
  <Label for="description" class="space-y-1">
    <span>Descrição</span>
    <Textarea name="description" placeholder="Há um baú de perguntas na minha casa." bind:value={question.description} maxlength=350/>
  </Label>
  <Label for="footer" class="space-y-1">
    <span>Rodapé</span>
    <Input name="footer" placeholder="E ele está cheio." bind:value={question.footer} maxlength=200/>
  </Label>
  <Label for="image" class="space-y-1">
    <span>URL da Imagem</span>
    <div class="flex flex-row gap-2">
      <Input name="image" bind:value={question.image} placeholder="Insira um link ou use o botão lateral para pesquisar na internet."/>
      <div bind:this={floating.elements.reference} {...interactions.getReferenceProps()}>
        <Button color="alternative" class="border-light-surface-300 dark:border-dark-surface-600 dark:bg-dark-surface-700 hover:dark:bg-dark-surface-700/75">
          <SearchIcon size="1.2rem"/>
        </Button>
      </div>
    </div>
  </Label>
  <div class="space-y-1">
    <Label>Opções</Label>
    <Options bind:value={question.options}/>
  </div>
</div>

{#if open}
  <div
    bind:this={floating.elements.floating}
    style={floating.floatingStyles}
    {...interactions.getFloatingProps()}
    class="max-w-[75%] lg:max-w-[45%] xl:max-w-[30%] p-2 rounded-lg shadow-lg border border-light-surface-300 dark:border-light-surface-600 bg-white/80 dark:bg-dark-surface-800/80 backdrop-blur-lg overflow-x-auto"
    transition:fade={{ duration: 200 }}
  >
    <Search otherClasses="max-h-56" bind:result={question.image}/>
  </div>
{/if}