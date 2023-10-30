# Auth with lucia on cloudflare workers

Using bearer tokens rather than cookies.

### create a new D1 database

```bash
wrangler d1 create userauth
```

### add binding
```toml
[[d1_databases]]
binding = "DB" # available in your Worker on env.DB
database_name = "<DATABASE_NAME>"
database_id = "<unique-ID-for-your-database>"
```

### create the tables
```bash
wrangler d1 execute userauth --file ./db/user.sql
wrangler d1 execute userauth --file ./db/user_key.sql
wrangler d1 execute userauth --file ./db/user_session.sql
```

