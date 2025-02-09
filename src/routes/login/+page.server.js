import { redirect, fail } from '@sveltejs/kit';

export async function load({ cookies }) {
  const token = cookies.get('token');
  if (token) {
    const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};
    const response = await fetch('https://pergunta-do-dia.onrender.com/api/v1/users/me', options);
    const user = await response.json();

    if (!user.error) redirect(303, '/');
  };
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
    const token = data.get('token');

    const options = {method: 'GET', headers: {Authorization: 'Bearer ' + token}};
    const response = await fetch('https://pergunta-do-dia.onrender.com/api/v1/users/me', options);

    if (response.status !== 200) {
      const errorStatus = response.status;
      const {error: errorTextFallback} = await response.json();

      const errorText = {
        401: 'Token inválido. Tente novamente.'
      };

      return fail(errorStatus, {message: errorText[errorStatus] || errorTextFallback});
    };

    cookies.set('token', token, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    redirect(303, '/');
    return {success: true};
	}
}