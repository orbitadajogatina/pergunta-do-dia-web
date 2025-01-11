import { redirect, fail } from '@sveltejs/kit';

export async function load({ cookies, url }) {
  const token = cookies.get('token');
  if (!token && !['/login'].includes(url.pathname)) redirect(303, '/login');

  const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};
  const response = await fetch('https://pergunta-do-dia.onrender.com/api/v1/users/me', options);
  const user = await response.json();
  if (response.error) return fail(response.status, { message: user.error });
  
  return {user};
}