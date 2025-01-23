export async function load({ cookies }) {
  const token = cookies.get('token');
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  const latestQuestionResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions/latest', options);
  const latestQuestion = await latestQuestionResponse.json();
  
  const statsResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/stats', options);
  const stats = await statsResponse.json();

  const queueResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/queue', options);
  const queue = await queueResponse.json();

  return {latestQuestion, stats, queue};
}