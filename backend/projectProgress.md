# Vault — Project Progress

_Last updated: 2026-07-07_

---

## Backend

### `models/User.js` ✅
Defined what a user looks like in the database — name, email, password, timestamps. The blueprint MongoDB uses every time someone registers.

### `models/Transaction.js` ✅
Defined what a transaction looks like — amount, type (income/expense), category, description, date. Most importantly, added a `ref: 'User'` that links every transaction back to the user who owns it.

### `index.js` ✅
Imports and mounts both the auth router (`/api/auth`) and the transactions router (`/api/transactions`).

### `routes/auth.js` ✅
The gatekeeper for new users. Register hashes the password with bcrypt and saves a new User. Login finds the user, verifies the password, and hands back a JWT token. The whole cybersecurity layer.

### `middleware/auth.js` ✅
The bouncer. Runs before any protected route, pulls the JWT off the request header, verifies it with `jwt.verify`, and either attaches the user to `req.user` and lets the request through, or sends a 401.

### `routes/transactions.js` ✅
GET fetches only the logged-in user's transactions, POST creates one and stamps it with their id, DELETE now correctly declared as `router.delete('/:id', ...)` so `req.params.id` resolves properly.

---

## Frontend — In Progress

### `context/AuthContext.jsx` ✅
Global auth state — stores the logged-in user, exposes `login`/`logout` to the whole app via `useAuth`. Graded 10/10.

### `services/authService.js`
`register()` ✅ done, graded 10/10. `login()` — up next.

### `services/transactionService.js` — upcoming
API calls for get, create, and delete transactions.

### `pages/Login.jsx` — upcoming
Login form — calls authService, stores token on success.

### `pages/Register.jsx` — upcoming
Register form — calls authService, redirects to login on success.

### `pages/Dashboard.jsx` — upcoming
Main page — shows transaction list, charts, and budget info.

### `components/TransactionForm.jsx` — upcoming
Form for adding a new transaction.

### `components/TransactionList.jsx` — upcoming
Renders the list of transactions.

### `components/Navbar.jsx` — upcoming
Navigation bar with logout button.

---

## Next up
1. `login()` in `authService.js`.
