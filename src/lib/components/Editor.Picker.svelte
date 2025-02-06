<script>
  import { Tabs, TabItem, Button, Input } from 'odj-svelte-ui';
  import HappyOutline from 'svelte-ionicons/HappyOutline.svelte';
  import Checkmark from 'svelte-ionicons/CheckmarkSharp.svelte';
  import Emoji from './Emoji.svelte';
  import EmojiMart from './EmojiMart.svelte';
  import Search from './Editor.Search.svelte';

  let { emoji = $bindable(), text } = $props();
  let imageURLValue = $state();

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

<div class="flex items-center">
  <button type="button" class="outline-none" bind:this={floating.elements.reference} {...interactions.getReferenceProps()}>
    {#if !emoji}
      <HappyOutline size="2.2rem" class="outline-none"/>
    {:else}
      <Emoji {emoji}/>
    {/if}
  </button>
</div>

{#if open}
  <div
    bind:this={floating.elements.floating}
    style={floating.floatingStyles}
    {...interactions.getFloatingProps()}
    class="max-w-[75%] lg:max-w-[45%] xl:max-w-[30%] px-2 pb-2 rounded-lg shadow-lg border border-light-surface-300 dark:border-light-surface-600 bg-white/80 dark:bg-dark-surface-800/80 backdrop-blur-lg overflow-x-auto"
    transition:fade={{ duration: 200 }}
  >
    <Tabs tabStyle="underline">
      <TabItem class="w-full" open>
        {#snippet titleSlot()}Emojis{/snippet}
        <EmojiMart
          class="flex flex-row justify-center mt-4 mb-2"
          on:select={(ev) => handleEmojiPicked(ev.detail)}
          options={{ set: "twitter", locale: "pt", navPosition: "bottom", previewPosition: "none", skinTonePosition: "preview" }}
        />
      </TabItem>
      <TabItem class="w-full">
        {#snippet titleSlot()}URL{/snippet}
        <div class="flex flex-row gap-2">
          <Input bind:value={imageURLValue} placeholder="https://pudim.com.br/pudim.jpg"/>
          <Button onclick={() => emoji = `$[Imagem](${imageURLValue})$`}>
            <Checkmark size="1.2rem"/>
          </Button>
        </div>
      </TabItem>
      <TabItem class="w-full">
        {#snippet titleSlot()}Pesquisar{/snippet}
        <Search includeDollarSign otherClasses="max-h-56" options={{"tbs": "ic:trans"}} inputValue={text} bind:result={emoji}/>
      </TabItem>
      <TabItem class="w-full">
        {#snippet titleSlot()}Numeração{/snippet}
        <Button onclick={() => emoji = '##'} class="w-full border border-transparent">Numerar essa opção dinamicamente</Button>
      </TabItem>
    </Tabs>
  </div>
{/if}