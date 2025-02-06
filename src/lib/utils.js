export async function getQuestions(token, random = false, allQuestions = [], page = 0, url = "https://pergunta-do-dia.onrender.com/api/v1/questions?") {
  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};

  while (page >= 0) {
    const questionsResponse = await fetch(url + `page=${page}`, options);
    const { questions, count } = await questionsResponse.json();

    allQuestions = allQuestions.concat(questions);
    if (count < 500) {
      page = -1;
    } else {
      page++;
    }
  }

  if (random) allQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

  return allQuestions;
}