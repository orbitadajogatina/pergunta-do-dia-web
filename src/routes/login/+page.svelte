<script>
  import { Button, Input, Helper } from 'odj-svelte-ui';
	let { form } = $props();
</script>

<div class="relative h-full w-full">
  <div class="absolute inset-0 bg-center bg-cover brightness-100 dark:brightness-[0.45] bg-[url('/logo-with-background.png')]"></div>
  <div class="flex flex-row items-center h-full p-2">
    <div class="relative flex flex-col items-center p-6 backdrop-blur-xl border rounded-xl text-center max-w-lg mx-auto bg-neutral-100/80 dark:bg-neutral-900/60 dark:border-neutral-600">
      <img src="/logo-no-background.png" alt="Logo Pergunta do Dia" class="h-20">
      <h1 class="text-2xl font-bold">Pergunta do Dia Web</h1>
      <span class="mt-1">Para começar a usar, insira o token que pode ser obtido no comando
        <span class="font-mono p-0.5 rounded-lg border dark:bg-neutral-700 bg-neutral-300 border-neutral-400">/token</span> do bot.
      </span>
      <form class="flex gap-2 mt-3 w-full items-start" method="POST">
        <div class="w-full">
          <Input name="token" placeholder="Token" class="font-mono" color={form?.message ? "red" : "default"}/>
          {#if form?.message}
            <Helper class="mt-2 text-left" color="red">
              <span class="font-medium">Ops!</span>
              {form?.message}
            </Helper>
          {/if}
        </div>
        <Button type="submit">Logar</Button>
      </form>
    </div>
  </div>
</div>