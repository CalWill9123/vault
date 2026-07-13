# CS Fundamentals — Transferable Knowledge

Concepts learned through building Vault. These apply to any language, any framework, any job.

---

## Hashing vs Encryption

Two ways to protect data — they are NOT the same thing.

| | Hashing | Encryption |
|---|---|---|
| Reversible? | No | Yes (with a key) |
| Use case | Passwords | Data you need to read back |
| Example | bcrypt | HTTPS, file encryption |

**Why hashing is better for passwords:** Even if someone steals your database, they can't reverse a hash back to the original password. Encryption can be decrypted if they get the key too.

**Rule:** Never store plaintext passwords. Always hash them.

---

## Stateless vs Stateful Authentication

**Stateful (sessions):** The server remembers you. It stores your session in memory or a database and checks it on every request.

**Stateless (JWT):** The server doesn't remember anything. Instead it hands you a signed token after login. You send that token with every request and the server just verifies the signature — no database lookup needed.

| | Stateful | Stateless (JWT) |
|---|---|---|
| Server stores session? | Yes | No |
| Scales easily? | Harder | Yes |
| What Vault uses | — | ✅ |

---

## Don't Leak Which Field Failed

When login fails, always return the same error for wrong email AND wrong password:
```
{ error: 'invalid credentials' }
```

Never say "email not found" or "wrong password" separately. An attacker can use that information to figure out which emails are registered in your system. This is called an **enumeration attack**.

---

## Secrets Management

**Never hardcode secrets in your code.** Your code goes to GitHub. GitHub is public.

- Passwords → `.env` file (never committed)
- API keys → `.env` file
- JWT secret → `.env` file

In production, secrets go on the server directly (Fly.io secrets, environment variables). The code just reads `process.env.WHATEVER` — it never knows the actual value at write time.

**Rule:** If it would be bad for a stranger to read it, it goes in `.env`.

---

## The Request/Response Cycle

Every interaction on the web is a request from a client and a response from a server. This is true whether you're building with Express, Django, Rails, or anything else.

```
Client (browser/app) → HTTP Request → Server → HTTP Response → Client
```

The request has:
- A **method** (GET, POST, PUT, DELETE)
- A **path** (/api/transactions)
- Sometimes a **body** (data being sent)
- Sometimes **headers** (metadata — like the Authorization token)

The response has:
- A **status code** (200, 201, 401, 404...)
- Sometimes a **body** (data being returned)

---

## Separation of Concerns

Each file should have one job. This is why Vault's backend is split the way it is:

| File | Job |
|---|---|
| `models/` | Define data shape |
| `routes/` | Handle requests |
| `middleware/` | Run checks before routes |
| `index.js` | Wire everything together |

If a file is doing two jobs, it's a sign it should be split. This makes bugs easier to find and code easier to explain in interviews.
