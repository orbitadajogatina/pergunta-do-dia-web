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

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transformFormDataIntoBodyToRequest(data))
    };

    try {
      const questionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions', options);
      let question = await questionResponse.json();

      if (question.error) throw { ...question, status: questionResponse.status };

      redirect(303, '/question/' + question.id);
  
      return {success: true};
    } catch (err) {
      console.error(err)
      return fail((err.status || 500), { message: (err.error || err.toString()) });
    }
  }
}