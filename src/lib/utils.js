export async function getQuestions(token, random = false, allQuestions = [], page = 0, url = "https://pergunta-do-dia.onrender.com/api/v1/questions?") {
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  while (page >= 0) {
    const questionsResponse = await fetch(url + `page=${page}`, options);
    const { questions, count } = await questionsResponse.json();

    allQuestions = allQuestions.concat(questions);
    if (count < 500) {
      page = -1;
    } else {
      page++;
    }
  }

  if (random) allQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

  return allQuestions;
}

export function transformFormDataIntoBodyToRequest(data) {
  const { question, description, footer, image, options } = Object.fromEntries(data);
    
  let normalizedOptions = [];
  for (let { emoji, text } of JSON.parse(options)) {
    // const serverEmoji = emoji.match(/^<a?:.+?:\d{18}>/u);
    if (!emoji || !text) throw("Couldn't parse option because it's missing emoji or text.")
    const imageEmojiURL = emoji.match(/\$\[Imagem\]\((.*?)\)\$/);
    if (imageEmojiURL) emoji = '$' + imageEmojiURL[1] + '$';

    normalizedOptions.push(emoji + ' - ' + text)
  }

  return { title: question, description, footer, image, options: normalizedOptions.join('\n') };
}