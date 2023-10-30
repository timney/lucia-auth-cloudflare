import { Context } from 'hono';
import { Bindings } from '../index';
import { z } from 'zod';
import { initializeLucia } from '../auth';

const User = z.object({
	username: z.string(),
	password: z.string().min(6).max(255)
});

export type SignupBody = z.infer<typeof User>;
export const signup = async (c: Context<{Bindings:Bindings}>) => {
	const { username, password } = await c.req.parseBody<SignupBody>();

	// validation
	if (
		typeof username !== "string" ||
		username.length < 4 ||
		username.length > 31
	) {
		return new Response("Invalid username", {
			status: 400
		});
	}
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return new Response("Invalid password", {
			status: 400
		});
	}

	try {
		const auth = initializeLucia(c.env.DB);
		const user = await auth.createUser({
			key: {
				providerId: "username", // auth method
				providerUserId: username.toLowerCase(), // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				username
			}
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {
				username
			}
		});

		return new Response(session.sessionId, {
			status: 200
		});
	} catch (e: Error | any) {
		if (
			e.message === 'AUTH_DUPLICATE_KEY_ID'
		) {
			return new Response("Username already taken", {
				status: 400
			});
		}

		return new Response("An unknown error occurred", {
			status: 500
		});
	}
};
