import {Hono} from "hono"

import { signup } from './routes/signup';
import { signin } from './routes/signin';
import { isAuthenticated } from './routes/authenticate';

export type Bindings = {
	DB: D1Database
}

const app = new Hono<{ Bindings:Bindings }>();

// app.use('*', hono())

app.post("/signup", signup);
app.post("/signin", signin);
app.post("/isauthenticated", isAuthenticated);

export default app
