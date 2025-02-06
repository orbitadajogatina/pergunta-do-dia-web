import { error } from '@sveltejs/kit';

export async function load({ cookies, params }) {
  const token = cookies.get('token');
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  const questionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + params.id, options);
  const question = await questionResponse.json();
  
  if (question.error) return error(questionResponse.status, { message: question.error });

  return { question, token };
}