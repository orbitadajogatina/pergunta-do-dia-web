import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const gis = await import('async-g-i-s');
	const { query, searchOptions } = await request.json();

  const gisSearch = await gis.default(query, {query: searchOptions});
  const results = gisSearch.map(result => result.url).filter(url => searchOptions?.tbs === 'ic:trans' ? url.endsWith('.png') : url);
  
  return json(results);
}