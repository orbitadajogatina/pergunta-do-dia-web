import { transformFormDataIntoBodyToRequest } from '$lib/utils';
import { error, redirect, fail } from '@sveltejs/kit';

export async function load({ cookies, params, parent }) {
  const { user } = await parent();

  const token = cookies.get('token');
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  const questionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + params.id, options);
  let question = await questionResponse.json();

  if (question.author.id !== user.id || question.status === 3) error(403, 'Você não tem permissão para editar essa pergunta!')
  
  if (question.error) return error(questionResponse.status, { message: question.error });

  for (let index = 0; index < question.options.length; index++) {
    const option = question.options[index];
    option.id = crypto.randomUUID();
  }

  return { question, token };
}

export const actions = {
  default: async ({ cookies, request }) => {
    const token = cookies.get('token');
		const data = await request.formData();

    let question;

    try {
      const options = {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformFormDataIntoBodyToRequest(data))
      };
  
      const questionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + data.get('id'), options);
      question = await questionResponse.json();

      if (question.error) return fail(questionResponse.status, { message: question.error.replace('Error', 'Erro') });
    } catch (error) {
      return fail(500, { message: 'Erro: ' + error.toString() });
    }

    redirect(303, `/question/${question.id}`);

    return {success: true};
  }
}