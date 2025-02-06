<script>
  import { Input, Button } from 'odj-svelte-ui';
  import Picker from './Editor.Picker.svelte';
  import Add from 'svelte-ionicons/Add.svelte';
  import Menu from 'svelte-ionicons/Menu.svelte';
  import Close from 'svelte-ionicons/Close.svelte';
  import { dragHandleZone, dragHandle } from "svelte-dnd-action";
	import { flip } from 'svelte/animate';

  let { value = $bindable([]) } = $props();

  function addOption() {
    value.push({ emoji: null, text: null, id: crypto.randomUUID() });
  }

  function removeOption(id) {
    value = value.filter(item => item.id !== id);
  }

  const flipDurationMs = 200;
  function saveOptionsOrder (event) {
    value = event.detail.items;
  }
</script>

<div class="flex flex-col gap-2">
  {#if value?.length > 0}
    <section class="flex flex-col gap-2"  use:dragHandleZone={{items: value, flipDurationMs, dropTargetStyle: {outline: 'rgba(255, 255, 255, 0) solid 0px'}}} onconsider={saveOptionsOrder} onfinalize={saveOptionsOrder}>
      {#each value as option (option.id)}
        <div class="rounded-lg p-2 border border-light-surface-300 dark:border-dark-surface-600 bg-white dark:bg-dark-surface-700 flex flex-row items-center gap-2 min-h-10 outline-none" animate:flip={{duration: flipDurationMs}}>
          <Picker bind:emoji={option.emoji} text={option.text}/>
          <Input bind:value={option.text} class="dark:border-dark-surface-500 dark:bg-dark-surface-600" placeholder="Texto da Opção" tabindex=1/>
          <button type="button" onclick={() => removeOption(option.id)}>
            <Close size="1.2rem" class="outline-none"/>
          </button>
          <div use:dragHandle>
            <Menu size="1.2rem" class="outline-none"/>
          </div>
        </div>
      {/each}
    </section>
  {/if}
  <Button onclick={addOption} color="alternative" class="w-full border-light-surface-300 dark:border-dark-surface-600 dark:bg-dark-surface-700 hover:dark:bg-dark-surface-700/75 flex flex-row gap-2">
    <Add size="1.2rem" class="outline-none"/>
    <span>Adicionar opção</span>
  </Button>
</div>