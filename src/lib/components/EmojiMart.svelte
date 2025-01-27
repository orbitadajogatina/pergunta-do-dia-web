<script>
  import { onMount, createEventDispatcher, onDestroy } from "svelte";

  let emojiPickerEl;
  let picker;
  let mounted = false;

  export let options = {};

  const dispatch = createEventDispatcher();

  onMount(async () => {
    const EmojiMart = await import('emoji-mart');
    const data = await import('@emoji-mart/data');
    
    picker = new EmojiMart.Picker({
      onClickOutside: () => {
        if (mounted) dispatch("close");
      },
      onEmojiSelect: (emoji) => {
        dispatch("select", emoji);
      },
      theme: localStorage.theme || 'auto',
      data: data.default,
      ...options
    });
    emojiPickerEl.appendChild(picker);
    setTimeout(() => {
      // ensure click outside works
      mounted = true;
    }, 1);
  });

  onDestroy(() => {
    // the clickoutside handler is not unregistered properly, so this is probably redundant
    picker = null;
    emojiPickerEl = null;
  });
</script>

<div on:click|preventDefault|stopPropagation bind:this={emojiPickerEl} />