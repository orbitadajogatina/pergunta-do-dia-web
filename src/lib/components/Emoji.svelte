<script>
  let { emoji } = $props();
</script>

{#if emoji.startsWith('$')}
  <div class="aspect-square h-[2.2rem]">
    <img src={emoji.match(/\$\[Imagem\]\((.*?)\)\$/)[1]} class="h-[2.2rem] mx-auto" alt="Emoji com imagem">
  </div>
{:else}
  <em-emoji native={emoji} set="twitter" size="2.2rem"></em-emoji>
{/if}