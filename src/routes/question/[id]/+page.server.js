import { redirect, fail } from '@sveltejs/kit';

export async function load({ cookies, params }) {
  const token = cookies.get('token');
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  const questionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + params.id, options);
  const question = await questionResponse.json();

  return { question };
}