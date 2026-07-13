# Vault — Refresher (come back here anytime you feel lost)

## What is this project, again?
**Vault** = a personal finance tracker (log transactions, see spending charts, set budget goals). It's your main resume project — the one you deliberately built bigger than the NBA app because you wanted something you could fully explain in an interview. That's the whole rule of this project: **you write the logic, I scaffold/hint/grade.** I'm not allowed to just hand you working code — that would defeat the point.

## The two halves of the app
```
vault/
├── backend/   <-- the server. Talks to MongoDB. FULLY DONE.
└── frontend/  <-- what you're looking at right now. In progress.
```

- **Backend** = Express + MongoDB. Handles register/login (hashing passwords, issuing JWT tokens) and stores/reads transactions. 100% complete, tested, working.
- **Frontend** = React. What the user actually sees/clicks. This is what we're building now.

## Backend: the mental model (fully done, but here's how it fits together)
Same "one job per layer" idea as the frontend:

1. **Schemas** (`models/User.js`, `models/Transaction.js`) — blueprints for what a document looks like. Two separate schemas. MongoDB auto-generates an `_id` for every document — you didn't build that part.
2. **The link between them** — this is the part you *did* build: every `Transaction` has a `user` field storing the `_id` of the `User` who made it. That's how a transaction is tied to its owner instead of floating around unowned.
3. **Routes** (`routes/auth.js`, `routes/transactions.js`) — each route file imports its model and uses it to read/write the database. `auth.js` uses `User`, `transactions.js` uses `Transaction` (and stamps new ones with `req.user.id`).
4. **Hashing** — the `register` route runs the password through `bcrypt` before saving, so plaintext passwords never hit the database. `login` compares the submitted password against that stored hash.
5. **JWT** — on successful login, the server signs a token (`jwt.sign`) and sends it back. Think of it like a stamped wristband: "this person already proved who they are."
6. **Middleware** (`middleware/auth.js`) — checks that wristband (`jwt.verify`) on protected routes (like transactions) before letting the request through. No valid token, no entry.

**One-line version:** schema → link via `user` ref → routes use schema to read/write → hash passwords → JWT proves identity → middleware checks that JWT on routes that need protecting.

---

## Frontend: the mental model
Think of it in 3 layers, each with ONE job:

1. **`authService.js`** (`src/services/`) — the "phone" that calls the backend.
   Just axios requests. `register()` and `login()` both POST data to the server and hand back the response. **Both done, both 10/10.**

2. **`AuthContext.jsx`** (`src/context/`) — the app's "memory" of who's logged in.
   Holds `user` in React state, with a `login()`/`logout()` that just *update that state* — no server talk here at all. **Done, 10/10.**

3. **Pages/components** (`Login.jsx`, `Register.jsx`, `Dashboard.jsx`, etc.) — **not built yet.** These are what will actually *use* #1 and #2 together: a form submits → calls `authService.login()` → gets a token/user back → hands that to `AuthContext`'s `login()` to remember it.

## Why login() felt like "new" work but wasn't
`authService.login()` is the exact same axios pattern as `register()`, just pointed at a different URL. You already proved you can do this — you literally just did it again today and got it right first try.

## Where we are right now
- ✅ Backend — fully done
- ✅ `authService.js` — `register()` and `login()` both done
- ✅ `AuthContext.jsx` — done
- 🔲 **Next: `Login.jsx`** — first actual page. This is a step up because it's a component (JSX + form + event handler), not just one function. We'll scaffold it the same way as everything else — I give you the empty shell/pattern, you fill in the logic.
- Still totally empty: `Register.jsx`, `Dashboard.jsx`, `Navbar.jsx`, `TransactionForm.jsx`, `TransactionList.jsx`, `transactionService.js`

## The actual pattern of your mistakes so far
Every bug you've hit has been a **precision slip** — a missing `:id`, a wrong import, a typo — never a "you don't get the concept" moment. That's a really different (and much less scary) category of mistake than not understanding what's going on. Losing the thread after a few days off is normal and has nothing to do with whether you can do this.

## Also — REFERENCE.md
Your other file, `REFERENCE.md`, is the syntax/pattern cheat sheet (numbered sections by topic). This file (`refresher.md`) is the "why are we doing this and where are we" sheet. Use both freely — neither is cheating.
