import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { query, searchOptions } = await request.json();

  const options = {method: 'GET', headers: {Authorization: request.headers.get('authorization')}};
  const response = await fetch('https://pergunta-do-dia.onrender.com/api/v1/users/me', options);

  if (response.status !== 200) return json([]);

  const gis = await import('async-g-i-s');

  const gisSearch = await gis.default(query, {query: searchOptions});
  const results = gisSearch.map(result => result.url).filter(url => searchOptions?.tbs === 'ic:trans' ? url.endsWith('.png') : url);
  
  return json(results);
}