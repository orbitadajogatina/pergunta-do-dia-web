import { transformFormDataIntoBodyToRequest } from '$lib/utils';
import { redirect, fail } from '@sveltejs/kit';

export async function load({ cookies }) {
  const token = cookies.get('token');
  return { token };
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