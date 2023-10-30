import { lucia } from "lucia";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { hono } from 'lucia/middleware';

export const initializeLucia = (db: D1Database) => {
	const auth = lucia({
		adapter: d1(db, {
			user: "user",
			key: "user_key",
			session: "user_session"
		}),
		env: "DEV",
		getUserAttributes: (data) => {
			return {
				username: data.username
			};
		},
		middleware: hono()
	});
	return auth;
};

export type Auth = ReturnType<typeof initializeLucia>;

export type UserSchema = {
	id: string;
	username: string;
};

type SessionSchema = {
	id: string;
	active_expires: number;
	idle_expires: number;
	user_id: string;
}

type KeySchema = {
	id: string;
	user_id: string;
	hashed_password: string | null;
};
