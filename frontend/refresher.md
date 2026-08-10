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

3. **Pages/components** (`Login.jsx`, `Register.jsx`, `Dashboard.jsx`, etc.) — this is what actually *uses* #1 and #2 together: a form submits → calls `authService.login()` → gets a token/user back → hands that to `AuthContext`'s `login()` to remember it. `Login.jsx` is the first one built (see below) — it proves this whole pattern works end to end.

## Why login() felt like "new" work but wasn't
`authService.login()` is the exact same axios pattern as `register()`, just pointed at a different URL. That part clicked fast, first try.

`Login.jsx` (the actual page) was a different story — it was the first task that required combining state + `useAuth()` + `useNavigate()` + the service layer, all at once, with no single fresh pattern shown right before it. It took 6 grading rounds and was genuinely rough. That's not a sign anything's wrong — combining several previously-separate concepts for the first time is just a harder category of task than any one of them alone, for anyone.

## Where we are right now (updated 2026-07-14)
- ✅ Backend — fully done
- ✅ `authService.js` — `register()` and `login()` both done
- ✅ `AuthContext.jsx` — done
- ✅ `Login.jsx` — done (controlled inputs, calls `authService.login()`, stores it via context, redirects with `useNavigate()`). Not yet manually tested end-to-end in the browser — worth doing that before moving on.
- 🔲 **Next: `Register.jsx`** — same shape as Login.jsx but for registering a new user. **New this round:** scaffolding will include more of the structural shape up front (function signature, state variables named but empty, comments marking where each piece of logic goes) — you still write every line of actual logic, but you don't have to invent the shape from a blank file too. This is a deliberate accommodation, not a lowered bar.
- Still totally empty: `Dashboard.jsx`, `TransactionForm.jsx`, `TransactionList.jsx`
- `Navbar.jsx` — still just `<nav>Vault</nav>`, no logout button yet
- `transactionService.js` — only `baseURL` is set, no functions yet
- `App.jsx` — only has `/login` and `/dashboard` routes; `/register` route still needs to be added
- CSS framework decision still not made — plain CSS only so far, worth revisiting before the frontend grows more

## The actual pattern of your mistakes so far
Every bug you've hit has been a **precision slip** — a missing `:id`, a wrong import, a duplicate declaration, a missing closing brace — never a "you don't get the concept" moment. That's a really different (and much less scary) category of mistake than not understanding what's going on. Losing the thread after a few days off is normal and has nothing to do with whether you can do this.

## Why the blank page feels worse than the logic itself
If starting from nothing feels more draining than actually writing the logic once there's a shape to fill in — that's a real, named thing, not laziness: generating structure from an empty file is exactly the kind of open-ended, self-directed planning that's disproportionately effortful with ADHD, and anxiety/perfectionism tends to pile on top of that friction and read it as "something's wrong with me" instead of "this specific step costs me more than the next step does." The scaffolding change above exists to take load off that specific step, not to make the project easier overall.

## Using REFERENCE.md so it actually sticks
Rereading a definition feels like it's teaching you something, but recognizing it on a reread isn't the same as being able to produce it from memory — that's why the same entries can feel like they never quite stick even after looking them up a bunch of times. Before checking an entry, try to recall/guess the pattern first, even a fragment, then look. That forced-recall step is what actually moves it into memory — better than another clean reread.

## Also — REFERENCE.md
Your other file, `REFERENCE.md`, is the syntax/pattern cheat sheet (numbered sections by topic). This file (`refresher.md`) is the "why are we doing this and where are we" sheet. Use both freely, and using them just-in-time instead of reading cover-to-cover is completely normal — that's how working devs actually use documentation, not a discipline failure.
