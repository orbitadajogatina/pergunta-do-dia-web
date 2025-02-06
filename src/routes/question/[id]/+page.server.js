import { error } from '@sveltejs/kit';

export async function load({ cookies, params, url }) {
  const token = cookies.get('token');
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  const questionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + params.id, options);
  const question = await questionResponse.json();
  
  if (question.error) return error(questionResponse.status, { message: question.error });

  const similarQuestionsIDs = url.searchParams.get('similar')?.split(',') || [];
  let similarQuestions = [];
  for (const questionID of similarQuestionsIDs) {
    const similarQuestionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + questionID, options);
    const similarQuestion = await similarQuestionResponse.json();

    similarQuestions.push(similarQuestion)
  }

  return { question, similarQuestions, token };
}