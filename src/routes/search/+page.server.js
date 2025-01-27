export async function load({ cookies, url }) {
  const token = cookies.get('token');
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};
  
  const questionsResponse = await fetch('https://pergunta-do-dia.onrender.com/api/v1/questions?search=' + encodeURIComponent(url.searchParams.get('query')), options);
  const { questions } = await questionsResponse.json();

  return { questions };
}