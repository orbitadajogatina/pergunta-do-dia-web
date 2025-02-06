export async function load({ cookies, params, parent }) {
  const { user } = await parent();

  const token = cookies.get('token');
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  const questionsResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions?author=' + (params.id || user.id), options);
  const questions = await questionsResponse.json();
  
  if (questions.error) return error(questionResponse.status, { message: question.error });

  if (params.id === user.id || !params.id) return {profile: user, firstPage: questions, token};

  const userResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/' + questions.questions[0].id, options);
  const { author, error } = await userResponse.json();
  
  if (error) return error(userResponse.status, { message: userResponse.error });

  return { profile: author, firstPage: questions, token };
}

export const actions = {
  default: async ({ cookies }) => {
    cookies.set('token', '', { path: '/' });
    redirect(303, '/login');
    return {success: true};
  }
}