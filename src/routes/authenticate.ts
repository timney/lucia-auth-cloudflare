import { Context } from 'hono';
import { Bindings } from '../index';
import { initializeLucia } from '../auth';

export const isAuthenticated = async (c: Context<{ Bindings: Bindings }>) => {
	const auth = initializeLucia(c.env.DB);
	const authRequest = auth.handleRequest(c);

	const session = await authRequest.validateBearerToken();
	if (session) {
		// valid request
		return new Response('Authenticated', {
			status: 200
		});
	}

	return new Response('Not authenticated', { status: 401 });
};
