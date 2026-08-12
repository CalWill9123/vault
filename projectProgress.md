# Vault — Project Progress

_Last updated: 2026-08-11_

---

## Backend

### `models/User.js` ✅
Defined what a user looks like in the database — name, email, password, timestamps. The blueprint MongoDB uses every time someone registers.

### `models/Transaction.js` ✅
Defined what a transaction looks like — amount, type (income/expense), category, description, date. Most importantly, added a `ref: 'User'` that links every transaction back to the user who owns it.

### `index.js` ✅
Imports and mounts both the auth router (`/api/auth`) and the transactions router (`/api/transactions`).

### `routes/auth.js` ✅
The gatekeeper for new users. Register hashes the password with bcrypt and saves a new User. Login finds the user, verifies the password, and hands back a JWT token.

### `middleware/auth.js` ✅
The bouncer. Runs before any protected route, pulls the JWT off the request header, verifies it with `jwt.verify`, and either attaches the user to `req.user` and lets the request through, or sends a 401.

### `routes/transactions.js` ✅
GET fetches only the logged-in user's transactions, POST creates one and stamps it with their id, DELETE correctly declared as `router.delete('/:id', ...)`. No PUT route yet.

**Backend is fully done. No open bugs. Connected to a real MongoDB Atlas cluster (`.env` filled in as of 2026-08-05).**

---

## Frontend — Full auth + transaction flow working end-to-end

### `context/AuthContext.jsx` ✅
Global auth state — stores the logged-in user, exposes `login`/`logout` to the whole app via `useAuth`. **Now persists to `localStorage`** (as of 2026-08-11) — `useState` lazy-loads any saved session on mount, and a `useEffect([user])` keeps localStorage in sync on every login/logout. Session survives a page refresh. **Tested live — reloading `/dashboard` no longer bounces to `/login`.**

### `services/authService.js` ✅
`register()` and `login()` both done.

### `services/transactionService.js` ✅
`getTransactions()`, `addTransactions()`, `deleteTransaction()` — all done, all attach the JWT via `Authorization: Bearer` header.

### `pages/Login.jsx` ✅
Controlled email/password form. Calls `authService.login()`, hands the result to `AuthContext`'s `login()`, redirects to `/dashboard` on success. **Tested live in the browser — works.**

### `pages/Register.jsx` ✅
Controlled name/email/password form. Calls `authService.register()`, redirects to `/login` on success. **Tested live — works.**

### `components/ProtectedRoute.jsx` ✅
Wraps `/dashboard`. Checks `useAuth()`'s `user` — no user, redirects to `/login`; user exists, renders the page. **Tested live in a logged-out state — correctly blocks access.**

### `pages/Dashboard.jsx` ✅
Fetches transactions on load (`useEffect` + `getTransactions`), holds them in state, renders `TransactionForm` and `TransactionList` together. Owns `handleAdd` (passed to `TransactionForm` as `onAdd`) and `handleDelete` (passed to `TransactionList` as `onDelete` — confirms via `window.confirm`, calls `transactionService.deleteTransaction`, then filters the deleted transaction out of state by `_id`).

### `components/TransactionList.jsx` ✅
Takes `transactions` and `onDelete` as props, `.map()`s over the list, renders each as a `<li>` with category, amount, and a **Delete button** (calls `onDelete(transaction._id)`).

### `components/TransactionForm.jsx` ✅
Controlled inputs for all 5 fields (amount, type, category, description, date). On submit, calls `transactionService.addTransactions()`, then calls `onAdd()` with the real saved transaction (including its database `_id`) so `Dashboard` can update its list without a page refresh.

**Full flow tested live end-to-end on 2026-08-09:** register → login → protected dashboard → fetch transactions → add a new transaction → list updates instantly, no refresh. Confirmed against the real database, not mocked.

**Delete + session persistence tested live end-to-end on 2026-08-11:** added a transaction, deleted it (confirm dialog → real DELETE request → item disappears), and confirmed the session now survives a page refresh instead of bouncing to `/login`.

### `components/Navbar.jsx` — still a placeholder
Just `<nav>Vault</nav>`. No logout button, and no visible login/logout UI anywhere in the app yet — next task up.

---

## Known limitations (not bugs, just not built yet)
- No login/logout UI — `Navbar.jsx` is still a placeholder, no way to log out from the app itself (only by clearing localStorage manually).
- No way to edit a transaction from the UI yet (delete is done; `PUT /api/transactions/:id` doesn't exist on the backend at all yet).
- No CSS framework — everything is completely unstyled, plain HTML elements.
- No charts yet (`chart.js` / `react-chartjs-2` are installed as dependencies, unused so far).
- No budget goals feature yet.
- Not deployed anywhere yet.

---

## Next up (Phase 1 of the longer-term plan — "finish Vault")
1. `Navbar.jsx` — login/logout UI, using `useAuth()`'s `user`/`logout()`.
2. Transaction edit (PUT) — backend route + frontend UI, the only CRUD operation not yet built.
3. Pick and install a CSS framework (Tailwind is the leading candidate, been on the table since 2026-07-01).
4. Charts — spending breakdown using `chart.js`/`react-chartjs-2`.
5. Budget goals feature.
6. Deploy (Fly.io, per the reference sheet's deploy section).
