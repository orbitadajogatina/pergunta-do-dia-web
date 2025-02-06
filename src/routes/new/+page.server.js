import { redirect, fail } from '@sveltejs/kit';

export async function load({ cookies }) {
  const token = cookies.get('token');
  return { token };
}

function transformFormDataIntoBodyToRequest(data) {
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

export const actions = {
  default: async ({ cookies, request }) => {
    const token = cookies.get('token');
		const data = await request.formData();

    let question;

    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformFormDataIntoBodyToRequest(data))
      };
  
      const questionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions', options);
      question = await questionResponse.json();

      if (question.error) return fail(questionResponse.status, { message: question.error.replace('Error', 'Erro') });
    } catch (error) {
      return fail(500, { message: 'Erro: ' + error.toString() });
    }

    const similarQuery = question.similarQuestions.length ? `?similar=${question.similarQuestions.map(e => e.id).join(',')}` : '';
    redirect(303, `/question/${question.id}${similarQuery}`);

    return {success: true};
  }
}