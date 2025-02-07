<script>
  import Emoji from './Emoji.svelte';
  
  const data = {
    "approvedQuestions": 68,
    "sentQuestions": 759,
    "declinedQuestions": 8,
    "inReviewQuestions": 0,
    "daysPrediction": "2025-03-07T15:00:00.282Z",
    "authorRanking": [
      {
        "author": "668199172276748328",
        "questionsCount": 412
      }
    ]
  }

  let totalQuestions = Object.values(data).reduce((previous, current) => {
    return typeof current === 'number' ? previous + current : previous;
  }, 0);
</script>

{#snippet questionStatusIndicator (statusName, emoji, numberOfQuestions, color)}
  <div class="relative rounded-lg min-h-8 bg-light-surface-200 dark:bg-[#262b29]">
    <div class="absolute top-0 left-0 h-full rounded-lg z-0 bg-{color}-300 dark:bg-{color}-600" style="width: {numberOfQuestions/totalQuestions * 100}%" ></div>
    <div class="relative z-10 flex flex-row items-center gap-1.5 justify-between p-2 rounded-lg">
      <div class="flex flex-row items-center gap-3 min-h-8">
        <Emoji {emoji} width="1.7rem" height="1.7rem"/>
        <span class="font-medium">{statusName}</span>
      </div>
      <div class="min-w-max text-right text-sm">{numberOfQuestions} perguntas</div>
    </div>
  </div>
{/snippet}

<div class="grid gap-2">
  {@render questionStatusIndicator("Aprovadas", "✅", data.approvedQuestions, "primary")}
  {@render questionStatusIndicator("Enviadas", "☑️", data.sentQuestions, "sky")}
  {@render questionStatusIndicator("Recusadas", "❌", data.declinedQuestions, "red-surface")}
  {@render questionStatusIndicator("Em revisão", "⌛", data.inReviewQuestions, "yellow")}
</div>