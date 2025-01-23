<script>
  let { emoji } = $props();
</script>

{#if emoji.startsWith('$')}
  <img src={emoji.match(/\$\[Imagem\]\((.*?)\)\$/)[1]} class="h-[2.2rem]" alt="Emoji com imagem">
{:else}
  <em-emoji native={emoji} set="twitter" size="2.2rem"></em-emoji>
{/if}