<script>
  let { emoji } = $props();
</script>

{#if emoji.startsWith('$')}
   <!-- content here -->
{:else}
  <em-emoji native={emoji} set="twitter" size="2.2rem"></em-emoji>
{/if}