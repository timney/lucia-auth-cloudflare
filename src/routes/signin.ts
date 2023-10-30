import { Context } from 'hono';
import { Bindings } from '../index';
import { SignupBody } from './signup';
import { initializeLucia } from '../auth';

export const signin = async (c: Context<{Bindings:Bindings}>) => {
	const { username, password } = await c.req.parseBody<SignupBody>();

	try {
		const auth = initializeLucia(c.env.DB);
		const key = await auth.useKey("username", username.toLowerCase(), password);
		const session = await auth.createSession({
			userId: key.userId,
			attributes: {
			}
		});
		return new Response(session.sessionId, {
			status: 200
		});
	} catch(e: Error | any) {
		console.log(e)
		if (
			(e.message === "AUTH_INVALID_KEY_ID" ||
				e.message === "AUTH_INVALID_PASSWORD")
		) {
			// user does not exist
			// or invalid password
			return new Response("Incorrect username or password", {
				status: 400
			});
		}
		return new Response("An unknown error occurred", {
			status: 500
		});
	}
}
