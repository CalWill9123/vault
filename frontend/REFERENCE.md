# React + Node.js Reference Sheet

---
---

# WEB DEV FUNDAMENTALS

Things every developer should know regardless of what they're building.

---

## What is MERN?
**What it is:** The stack Vault is built on — four technologies, one per letter. Say "I built a MERN app" in an interview and this is what you mean.

| Letter | Tech | Job | Where in Vault |
|---|---|---|---|
| M | **M**ongoDB | Stores your data permanently | `models/User.js`, `models/Transaction.js` |
| E | **E**xpress | Server framework — routes, middleware | `routes/`, `middleware/`, `index.js` |
| R | **R**eact | What the user sees and clicks | `src/pages/`, `src/components/` |
| N | **N**ode.js | Runs JavaScript outside the browser, on the server | Everything in `backend/` runs on it |

One thread ties it together: React (in the browser) → axios call → Express route (on Node) → Mongoose → MongoDB, and the response travels back the same path in reverse.

---

## How the Web Works (the Request/Response Cycle)
A browser (or any client) sends a **request** to a server. The server sends back a **response**. True everywhere — Express, Django, Rails, any backend.

```
Client → HTTP Request → Server → HTTP Response → Client
```

Every time you visit a URL, load an image, or submit a form — that's a request/response cycle.

A request has: method (GET/POST/etc), path, optional body, optional headers (like Authorization). A response has: status code, optional body.

---

## HTTP Methods
How you tell the server what you want to do.

| Method | Meaning         |
|--------|-----------------|
| GET    | Fetch data      |
| POST   | Send/create data|
| PUT    | Update data     |
| DELETE | Remove data     |

---

## Status Codes
Numbers the server sends back to tell you what happened.

| Code | Meaning       |
|------|---------------|
| 200  | OK            |
| 201  | Created       |
| 204  | No Content    |
| 400  | Bad Request   |
| 401  | Unauthorized  |
| 403  | Forbidden     |
| 404  | Not Found     |
| 500  | Server Error  |

---

## Frontend vs Backend
Two separate sides of every web app.

| | Frontend | Backend |
|---|---|---|
| What | What the user sees | Server logic and data |
| Language | HTML, CSS, JavaScript | Node.js, Python, etc. |
| Runs in | Browser | Server |
| Your tools | React, Vite | Express, MongoDB |

---

## DNS & URLs
A URL is just a human-readable address that points to a server IP.

```
https://moviewatchbycal.fly.dev/api/movies
  │        │                      │
protocol  domain               path/route
```

- **Protocol** — `https` means encrypted, `http` means not
- **Domain** — the address of the server
- **Path** — which route on that server to hit

---

## Ports
Your computer has thousands of ports — each one is a separate door a service can listen on.

| Port | Common use            |
|------|-----------------------|
| 80   | HTTP (web)            |
| 443  | HTTPS (secure web)    |
| 3001 | Your Express server   |
| 5173 | Vite dev server       |
| 27017| MongoDB               |

In production you use port 80/443 (standard web ports). In dev you use custom ports like 3001.

---

## localhost vs 0.0.0.0
- **localhost / 127.0.0.1** — only accepts connections from your own machine
- **0.0.0.0** — accepts connections from anywhere (required for deployment)

```js
app.listen(PORT, '0.0.0.0')  // use this for deployment
```

---

## Environment Variables & Secrets Management
Values that change between environments (dev vs production). Never hardcode secrets.

```
# .env — local only, never commit
MONGODB_URI=mongodb+srv://...
API_KEY=abc123
PORT=3001
```

```js
process.env.MONGODB_URI   // read it in your code
process.env.API_KEY
process.env.PORT
```

On hosting platforms (Fly.io, Render) you set these as "secrets" instead of a `.env` file.

**The transferable rule (every job, not just Vault):** if it would be bad for a stranger to read it, it goes in `.env` — never in code that reaches GitHub. Database credentials, cloud API keys, third-party tokens — same rule every time.

---

## Git Basics
Version control — tracks every change you make to your code.

```
git init                   // start tracking a project
git add filename           // stage a file
git add .                  // stage all changes
git commit -m "message"    // save a snapshot
git push                   // send to GitHub
git pull                   // get latest from GitHub
```

---

## .gitignore
Tells Git which files to never track. Always ignore these:

```
node_modules    // huge, reinstalled with npm install
.env            // contains your passwords
dist            // built files, regenerated with npm run build
```

---
---

# PART 1 — React Basics

---

## 1. Component Structure
**What it is:** A function that takes props and returns JSX. Every piece of UI is a component.

```js
const ComponentName = ({ prop1, prop2 }) => {
  return (
    <div>
      <h1>{prop1}</h1>
      <p>{prop2}</p>
    </div>
  )
}

export default ComponentName
```

---

## 2. JSX Attributes vs. Content
**What it is:** Two completely different places to put data on a JSX tag, and only one of them is visible on screen.

```js
// attribute — configures the element, NEVER shows up visually
<li key={transaction._id}></li>

// content — sits between the tags, this is what actually renders
<li key={transaction._id}>{transaction.category}</li>
```

Attributes live *inside* the opening tag, before its closing `>` — things like `key`, `value`, `onChange`, `className`. They configure the element or hand it data to work with internally, but the browser never draws them as text. Anything you actually want a person to **see** has to go between the opening and closing tags, as plain text or a `{}` expression. Writing `<li category={transaction.category}></li>` is completely valid JSX — it just renders an empty, invisible bullet point, because `category` is doing nothing but sitting there as configuration nobody asked for.

---

## 3. Import / Export
**What it is:** How files share code with each other. You must explicitly export and import everything.

```js
// default export — one per file
export default ComponentName
import ComponentName from './ComponentName'

// named export — can have multiple
export const myFunc = () => {}
import { myFunc } from './myFile'
```

---

## 4. Props
**What it is:** Data passed from parent to child. Child can read it, never change it. One direction only.

```js
// parent
<Component value={data} onAction={handlerFn} />

// child
const Component = ({ value, onAction }) => {
  return <div>{value}</div>
}
```

---

## 5. useState
**What it is:** Stores a value in the component. When updated, the component re-renders.

```js
import { useState } from 'react'

const [value, setValue] = useState('')       // string
const [items, setItems] = useState([])       // array
const [show, setShow] = useState(false)      // boolean
const [count, setCount] = useState(0)        // number
```

---

## 6. Controlled Input
**What it is:** An input whose value is controlled by React state. `value` and `onChange` must always be paired.

```js
const [input, setInput] = useState('')

<input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Type here"
/>
```

---

## 7. Form Submission
**What it is:** Handling a form submit without the page reloading. Always call `e.preventDefault()` first.

```js
const handleSubmit = (e) => {
  e.preventDefault()
  // use your state values here
}

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

---

## 8. Event Handlers
**What it is:** Functions that run when the user does something. Pass a reference, never call it directly.

```js
// correct — runs on click
<button onClick={() => handleDelete(item.id)}>Delete</button>

// wrong — runs immediately on render
<button onClick={handleDelete(item.id)}>Delete</button>
```

---

## 9. Conditional Rendering
**What it is:** Showing or hiding UI based on a condition.

```js
// ternary — one thing OR another
{isWatched ? 'Watched' : 'Not watched'}

// && — only show if true
{errorMessage && <p>{errorMessage}</p>}
```

---

## 10. Template Literals
**What it is:** Strings with embedded variables. Use backticks, not quotes.

```js
const name = 'value'
console.log(`Label: ${name}`)
window.alert(`${name} already exists`)
```

---

## 11. Ternary Operator
**What it is:** A one-line if/else that returns a value.

```js
// condition ? if true : if false
const label = isActive ? 'Active' : 'Inactive'
```

---
---

# PART 2 — Data, Effects & Services

---

## 12. Rendering a List
**What it is:** Turning an array into JSX elements. Always use `key` with the item's id.

```js
{items.map(item =>
  <Component key={item.id} item={item} />
)}
```

---

## 13. Adding to an Array
**What it is:** Creating a new array with an item added. Never mutate state directly.

```js
setItems([...items, newItem])
```

---

## 14. Filtering an Array
**What it is:** Returning only items that match a condition.

```js
const visible = items.filter(item => showAll || item.active)

// toggle
setShowAll(!showAll)
```

---

## 15. Duplicate Check
**What it is:** Searching the array before adding to prevent duplicates.

```js
const duplicate = items.find(i => i.name.toLowerCase() === newName.toLowerCase())
if (duplicate) {
  window.alert(`${newName} already exists`)
  return
}
```

---

## 16. Service Module
**What it is:** A separate file that holds all axios calls. App.jsx never talks to the server directly.

```js
// services/itemService.js
import axios from 'axios'

const baseUrl = '/api/items'

const getAll = () => axios.get(baseUrl).then(res => res.data)
const create = (item) => axios.post(baseUrl, item).then(res => res.data)
const update = (id, item) => axios.put(`${baseUrl}/${id}`, item).then(res => res.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }
```

**Don't confuse this `create` with a MongoDB create.** This `create` just sends a POST request from the browser to your Express server — nothing touches the database here. The actual document only gets created later, on the server, inside the route handler that receives this POST (that's where `new Model().save()` happens — see §43/§67). Same word, two different layers: axios `create()` = "ask the server," Mongoose `.save()` = "server writes to the database."

---

## 17. useEffect + Service
**What it is:** Fetches data from the server once when the page loads. Empty array `[]` = run once only.

```js
import { useEffect } from 'react'

useEffect(() => {
  itemService
    .getAll()
    .then(data => setItems(data))
    .catch(error => console.error('Failed to load:', error))
}, [])
```

---

## 18. Error Handling
**What it is:** `.catch` runs if the server call fails. Always chain it so the app doesn't crash silently.

```js
itemService
  .create(newItem)
  .then(saved => setItems([...items, saved]))
  .catch(error => console.error('Failed:', error))
```

---

## 19. Deleting an Item
**What it is:** Handler lives in App.jsx where state is. Child just calls it with the id.

```js
// App.jsx
const handleDelete = (id) => {
  if (!window.confirm('Remove this item?')) return
  itemService
    .remove(id)
    .then(() => setItems(items.filter(i => i.id !== id)))
    .catch(error => console.error('Failed to delete:', error))
}
// pass down
<Component key={item.id} item={item} onDelete={handleDelete} />

// child button
<button onClick={() => onDelete(item.id)}>Delete</button>
```

---

## 20. Adding CSS
**What it is:** Two ways to style in React — CSS file with `className`, or inline styles as a JS object.

```js
// CSS file
import './App.css'
<div className="container">...</div>
```

```css
/* App.css */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
```

```js
// Inline style — camelCase, not kebab-case
<p style={{ color: 'red', borderRadius: '4px' }}>Error</p>
```

---

## 21. Notification Component
**What it is:** A reusable component for showing timed success/error messages. Returns null when there's nothing to show.

```js
// Notification.jsx
const Notification = ({ message, type }) => {
  if (message === null) return null
  return <div className={type === 'error' ? 'error' : 'success'}>{message}</div>
}

export default Notification
```

```css
.success { color: green; background: #e0ffe0; border: 2px solid green; padding: 10px; border-radius: 4px; }
.error   { color: red;   background: #ffe0e0; border: 2px solid red;   padding: 10px; border-radius: 4px; }
```

```js
// App.jsx
const [notification, setNotification] = useState(null)
const [notifType, setNotifType] = useState('success')

const notify = (message, type = 'success') => {
  setNotification(message)
  setNotifType(type)
  setTimeout(() => setNotification(null), 3000)
}

// in JSX
<Notification message={notification} type={notifType} />
```

---
---

# PART 3 — Node.js Backend

**The big idea:** Part 2 used json-server as a fake backend. Part 3 you build the real backend yourself.

```
React (axios) ──► Your Express server ──► returns data
```

Run two terminals:
- `npm run dev` — React frontend (port 5173)
- `npm run dev:server` — Express backend (port 3001)

---

## 22. Raw Node.js HTTP Server
**What it is:** The built-in Node.js way to create a server. No install needed. FSO shows this first so you understand what Express wraps.

```js
import http from 'http'

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(data))
})

app.listen(3001)
console.log('Server running on port 3001')
```

---

## 23. nodemon
**What it is:** Auto-restarts the server when you save `index.js`. Without it you'd restart manually every time.

```
npm run dev:server
```

---

## 24. Express Setup
**What it is:** A library that makes routing clean. Always put `express.json()` before your routes.

```js
import express from 'express'
import cors from 'cors'

const app = express()     // creates the app — everything hangs off this
app.use(cors())           // allows requests from other ports/domains
app.use(express.json())   // parses request body so request.body works

// routes go here

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

- `const app = express()` — creates your Express app, required for everything else
- `app.use(cors())` — without this the browser blocks cross-origin requests
- `app.use(express.json())` — without this `request.body` is undefined

---

## 25. Express Router — Splitting Routes into Files
**What it is:** Instead of writing every route directly on `app` in `index.js`, related routes can live in their own file using `express.Router()`. That router is then "mounted" onto the main app at a path prefix — every route inside it automatically gets that prefix.

```js
// routes/auth.js
import express from 'express'
const router = express.Router()

router.post('/register', (request, response) => { /* ... */ })
router.post('/login', (request, response) => { /* ... */ })

export default router
```

```js
// index.js
import auth from './routes/auth.js'
app.use('/api/auth', auth)   // mounts the router — /register becomes /api/auth/register
```

Mounting needs **both** arguments — the path prefix and the router object itself. Leave out the router and Express has a path with nothing to run there.

---

## 26. REST Endpoints
**What REST actually is:** REST (**RE**presentational **S**tate **T**ransfer) is an architectural style for designing APIs — a set of conventions, not a strict protocol. Three core ideas:
- **Client-server:** frontend and backend are separate pieces that only talk over HTTP — neither needs to know how the other is built internally.
- **Stateless:** every request carries everything the server needs to handle it (e.g. a JWT in the header) — the server doesn't remember anything about your previous requests.
- **Resources, not actions:** URLs name *things* (`/api/items`, `/api/items/:id`), not verbs. The *action* you're taking comes from the HTTP method (GET/POST/PUT/DELETE), never from the URL itself — `/api/items/delete/3` is not RESTful, `DELETE /api/items/3` is.

**In practice, that convention looks like:** structuring URLs and HTTP methods so each method has one job.

| Method | Job             | Example              |
|--------|-----------------|----------------------|
| GET    | Fetch data      | GET /api/items       |
| POST   | Create item     | POST /api/items      |
| PUT    | Update item     | PUT /api/items/:id   |
| DELETE | Remove item     | DELETE /api/items/:id |

```js
app.get('/api/items', (request, response) => {
  response.json(items)
})

app.get('/api/items/:id', (request, response) => {
  const item = items.find(i => i.id === request.params.id)
  item ? response.json(item) : response.status(404).end()
})

app.delete('/api/items/:id', (request, response) => {
  items = items.filter(i => i.id !== request.params.id)
  response.status(204).end()
})
```

---

## 27. request.params vs request.body
**What it is:** Two places incoming data can come from.

```js
// params — from the URL: DELETE /api/items/3
request.params.id  // "3"

// body — data sent with the request: axios.post('/api/items', { name: 'thing' })
request.body.name  // "thing"
```

GET and DELETE use `params`. POST and PUT use `body`.

---

## 28. generateId
**What it is:** Finds the highest existing id and adds 1. Always returns a string to stay consistent with your data.

```js
const generateId = () => {
  const maxId = items.length > 0
    ? Math.max(...items.map(i => Number(i.id)))
    : 0
  return String(maxId + 1)
}
```

---

## 29. Validating the Request Body
**What it is:** Check that required fields exist before saving. The `return` stops the function immediately after the 400.

```js
app.post('/api/items', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  const item = {
    name: body.name,
    active: body.active || false,
    id: generateId(),
  }

  items = [...items, item]
  response.json(item)
})
```

---

## 30. Middleware
**What it is:** Code that runs on every request before it hits your route. `express.json()` is middleware.

```js
app.use(express.json())   // parses request body into a JS object
app.use(morgan('tiny'))   // logs every request to the terminal
```

Always register middleware before your routes.

---

## 31. HTTP Status Codes — In Practice
**What it is:** Sending the status codes from the table at the top of this sheet inside real Express routes.

```js
response.status(404).end()
response.status(400).json({ error: 'field missing' })
```

Most common in your routes: `200`/`201` on success, `400` for bad input, `404` for a missing id, `204` for a delete with nothing to send back.

---

## 32. Postman — Testing Routes
**What it is:** A tool to send HTTP requests to your backend without needing the frontend.

**GET all:**
- Method: `GET` — URL: `http://localhost:3001/api/items` — Send

**POST new item:**
- Method: `POST` — URL: `http://localhost:3001/api/items`
- Body → raw → JSON
```json
{ "name": "Item Name", "active": false }
```

**DELETE:**
- Method: `DELETE` — URL: `http://localhost:3001/api/items/1` — Send (expect 204)

---

## 33. Vite Proxy
**What it is:** Forwards `/api` requests from the frontend to the backend in development. Avoids CORS errors.

```js
// vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:3001'
  }
}
```

This is why `server.js` uses `/api/items` not `http://localhost:3001/api/items`.

## 34. Serving the Frontend from Express (Production)
**What it is:** In production there's no Vite, no proxy. Express serves everything — the React app AND the API. You build the frontend into a `dist` folder and tell Express to serve it as static files.

```js
// index.js — add these imports at the top
import { fileURLToPath } from 'url'
import path from 'path'

// add this after middleware, before routes
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'dist')))
```

---

## 35. Dev vs Production
**What it is:** The two environments your app runs in and how they differ.

| | Development | Production |
|---|---|---|
| Frontend | Vite on port 5173 | Built into `dist/` |
| Backend | Express on port 3001 | Express on one port |
| Proxy | Vite proxy forwards `/api` | Not needed — same server |
| Command | `npm run dev` + `npm run dev:server` | `npm start` |

---

## 36. Deploying to Fly.io
**What it is:** Hosting your app on the internet so anyone can visit it.

**Steps:**
```
# 1. install flyctl (Mac)
brew install flyctl

# 2. login
fly auth login

# 3. build the frontend first
npm run build

# 4. set up fly config (do once)
fly launch

# 5. deploy
fly deploy
```

**After any change:**
```
npm run build
fly deploy
```

**Important — listen on 0.0.0.0 for deployment:**
Fly.io requires your server to accept connections from outside, not just localhost.
```js
app.listen(PORT, '0.0.0.0')  // required for Fly.io — without this you get a 502
```

**Set environment variables on Fly:**
```
fly secrets set MONGODB_URI="your-connection-string"
```

---

# PART 3C — MongoDB

**The big idea:** Your data currently lives in a `let movies = []` array in `index.js`. Every time the server restarts, it resets. MongoDB is a database that stores data permanently so it survives restarts and deployments.

```
Before 3c:   React → Express → array in memory (resets on restart)
After 3c:    React → Express → MongoDB (persists forever)
```

---

## 37. mongoose.js — Practice Script
**What it is:** A standalone script for testing your MongoDB connection and saving documents. Not part of your main app — run it directly from the terminal to verify things work.

```js
import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give a password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://<username>:${password}@cluster0.xxxxx.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

// define the shape of your data
const itemSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  watched: Boolean
})

// create a model — this becomes the collection in MongoDB
const Item = mongoose.model('Item', itemSchema)

// create and save one document
const item = new Item({
  title: 'The Conjuring',
  rating: 4,
  watched: true
})

item.save().then(() => {
  console.log('item saved')
  mongoose.connection.close()
})
```

**Run it:**
```
node mongoose.js yourpassword
```

---

## 38. Schema & Model
**What it is:** A schema defines the shape of your data. A model is what you use to create, read, update, and delete documents in MongoDB.

```js
// schema — defines what fields exist and their types
const itemSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  watched: Boolean
})

// model — gives you methods to interact with the database
// first arg = collection name (MongoDB pluralizes it automatically → 'items')
const Item = mongoose.model('Item', itemSchema)
```

---

## 39. Schema Field Options — enum
**What it is:** Restricts a field to one of a fixed set of values. Wrap the type in an object and add `enum` — if a save doesn't match one of the listed values, Mongoose blocks it with a validation error.

```js
type: { type: String, enum: ['income', 'expense'] }
```

---

## 40. Schema Field Options — ObjectId & ref (Relationships)
**What it is:** How one document points to another. `mongoose.Schema.Types.ObjectId` is the type of every document's `_id` — when a field holds a *different* document's id, you type it as `ObjectId` and add `ref` to say which model it points to. This is how Vault links a transaction to the user who owns it.

```js
// Transaction.js — this is exactly what you built
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
```

- `type: mongoose.Schema.Types.ObjectId` — this field stores an id, not a full document
- `ref: 'User'` — tells Mongoose *which* model that id belongs to (must match the string you passed to `mongoose.model('User', ...)`)

**Querying by a reference field:** `req.user.id` from your JWT is a string, but the `user` field in the database is stored as an `ObjectId`. Mongoose casts the string for you automatically, so this just works:

```js
Transaction.find({ user: req.user.id })   // string gets cast to ObjectId under the hood
```

**`.populate()` — the method you'll reach for next:** Right now `Transaction.find()` returns transactions with just the user's raw id (e.g. `"64abc..."`). If you ever need the actual user data (their name or email) attached to a transaction instead of just the id, `.populate()` swaps the id for the full referenced document:

```js
Transaction.find({ user: req.user.id }).populate('user')
// each transaction.user is now the full User document, not just its id
```

You don't need `.populate()` for Vault's current features (the frontend already knows who's logged in) — but it's the standard next step the moment you need related data from two collections in one response.

---

## 41. MongoDB Atlas Setup
**What it is:** The cloud-hosted MongoDB service. Your database lives here, not on your computer.

**Steps:**
1. Create account at mongodb.com
2. Create a free cluster
3. Database Access → create a user with a password
4. Network Access → allow access from anywhere (0.0.0.0/0)
5. Connect → get your connection string

**Connection string format:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
```

---

## 42. .env File & process.env
**Why it's needed:** Your code goes to GitHub, and GitHub is public. If you hardcode your MongoDB password or JWT secret directly in your code, anyone can read it and own your database. The `.env` file keeps secrets off GitHub entirely — it never gets committed.

Think of it like this: your code is a recipe that says "add the secret ingredient." The `.env` file is a locked box only the server can open. Someone stealing the recipe still doesn't know the ingredient.

**What it is:** A file that stores sensitive values like passwords and API keys. `process.env` is how Node reads those values inside your code.

```
# .env — local only, never commit this file
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?appName=Cluster0
JWT_SECRET=somesupersecretkey
PORT=3001
```

```
# .gitignore — add this line so Git never touches it
.env
```

```js
// index.js — import at the top, then read with process.env
import 'dotenv/config'

mongoose.connect(process.env.MONGODB_URI)
jwt.sign({ id: user._id }, process.env.JWT_SECRET)
```

In production (Fly.io, Render), you set these as server "secrets" instead of a `.env` file — same idea, different delivery.

---

## 43. Connecting index.js to MongoDB
**What it is:** Replacing the hardcoded array in `index.js` with a real MongoDB connection. After this, data persists even when the server restarts.

```js
import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error('error connecting:', error.message))
```

---

## 44. toJSON Transform
**What it is:** MongoDB stores documents with `_id` and `__v` fields. This transform cleans them up so your frontend receives a normal `id` instead.
Without this, your frontend gets `_id: "64abc..."` instead of `id: "64abc..."` and React won't match them correctly.

```js
movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()  // create id from _id
    delete returnedObject._id                           // remove _id
    delete returnedObject.__v                           // remove version field
  }
})
```

---

## 45. MongoDB Route Methods
**What it is:** Replace your old array operations with these MongoDB model methods. No more manual `generateId` — MongoDB handles IDs automatically.

```js
// GET all — find({}) means "find everything"
Movie.find({}).then(movies => response.json(movies))

// GET one by id
Movie.findById(request.params.id).then(movie => response.json(movie))

// POST — create and save a new document
const movie = new Movie({ title: body.title, rating: body.rating })
movie.save().then(savedMovie => response.json(savedMovie))

// DELETE
Movie.findByIdAndDelete(request.params.id).then(() => response.status(204).end())
```

---

# PART 3D — Authentication & Security

**The big idea:** MongoDB stores the data, but auth is what decides who's allowed to touch it. This section covers hashing passwords, issuing tokens, and locking down routes.

---

## 46. Password Hashing with bcrypt
**What it is:** You never store a plain-text password. bcrypt scrambles it into a one-way hash before saving. On login, bcrypt compares the input against the stored hash — it can't "un-hash", it just checks if they match.

```js
// hashing — do this before saving a new user
const passwordHash = await bcrypt.hash(password, 10)  // 10 = salt rounds

// comparing — do this on login
const match = await bcrypt.compare(plainTextPassword, storedHash)  // true or false
```

Never store `password` — always store `passwordHash`.

---

## 47. JWT (JSON Web Tokens)
**What it is:** A signed token you hand to the user after a successful login. The frontend stores it and sends it with every future request to prove who they are. You sign it with a secret key — anyone can read the payload, but only your server can create a valid signature.

```js
// signing — after verifying login credentials
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

// verifying — in middleware to protect routes
const decoded = jwt.verify(token, process.env.JWT_SECRET)
// decoded.id is the user's _id
```

Store `JWT_SECRET` in `.env` — never hardcode it.

---

## 48. Auth Route Pattern (Register & Login)
**What it is:** The two routes every auth system needs. Register saves a new user with a hashed password. Login finds the user, checks the password, and returns a JWT. Always use the same error message for wrong email AND wrong password — never reveal which one failed.

```js
// register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: passwordHash })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ error: 'invalid credentials' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: 'invalid credentials' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  res.json({ token })
})
```

---

## 49. Protected CRUD Routes (Transactions Pattern)
**What it is:** Routes that require a logged-in user. `router.use(authMiddleware)` protects every route in the file at once. User identity comes from `req.user.id` (set by the middleware) — never from `req.body`, or users could fake ownership.

```js
router.use(authMiddleware)  // protects all routes below this line

// GET — fetch only this user's transactions
router.get('/', async (req, res) => {
  Transaction.find({ user: req.user.id }).then(transactions => res.json(transactions))
})

// POST — create a transaction, stamp it with the logged-in user's id
router.post('/', async (req, res) => {
  const { amount, type, category, description, date } = req.body
  const transaction = new Transaction({ amount, type, category, description, date, user: req.user.id })
  const savedTransaction = await transaction.save()
  res.status(201).json(savedTransaction)
})

// DELETE — remove by id
router.delete('/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id)
  res.status(204).end()
})
```

`user: req.user.id` is what links each transaction to the logged-in user — the same `ref: 'User'` you set up in the Transaction schema.

---

# EXTRAS — Modern JS Patterns

---

## 50. Optional Chaining (?.)
**What it is:** Safely access nested properties. Returns `undefined` instead of crashing if something is null.

```js
item?.genre?.toLowerCase()
```

---

## 51. Nullish Coalescing (??)
**What it is:** Fallback value only when something is `null` or `undefined`. Unlike `||`, won't override `0` or `false`.

```js
const rating = item.rating ?? 'No rating'
```

---

## 52. Object Shorthand
**What it is:** When the variable name matches the key name, you can skip the repetition.

```js
const title = 'Inception'
const rating = 9

const movie = { title, rating }   // same as { title: title, rating: rating }
```

---

## 53. Spread Operator
**What it is:** Copies arrays or objects. Use to add items or merge without mutating.

```js
const newArray = [...items, newItem]
const updated = { ...item, watched: true }
```

---

## 54. Array Methods
**What it is:** Built-in methods for working with arrays beyond map and filter.

```js
items.find(i => i.id === '3')          // first match or undefined
items.some(i => i.active)              // true if ANY match
items.every(i => i.active)             // true if ALL match
items.reduce((sum, i) => sum + i.rating, 0)  // collapse to single value
```

---

## 55. async/await
**What it is:** Cleaner syntax for promises. Same as `.then()` but easier to read.

```js
const fetchItems = async () => {
  try {
    const data = await itemService.getAll()
    setItems(data)
  } catch (error) {
    console.error('Failed:', error)
  }
}
```

---

## 56. try/catch (Error Handling)
**What it is:** Wraps code that might throw an error. If it throws, the `catch` block runs instead of crashing the app. Not the same as `if/else` — use it specifically when a function is designed to throw on failure rather than return false.

```js
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)  // throws if invalid
  req.user = decoded
  next()
} catch {
  res.status(401).json({ error: 'invalid credentials' })
}
```

`if/else` handles expected conditions (true/false). `try/catch` handles code that can crash.

---

## 57. Destructuring
**What it is:** Pull values out of objects or arrays into their own variables.

```js
const { title, rating } = movie
const [items, setItems] = useState([])
const Component = ({ title, rating }) => { ... }
```

---

## 58. console.log Debugging
**What it is:** Quick tricks to make debugging faster and clearer.

```js
console.log('items:', items)                    // label it
console.log(JSON.stringify(item, null, 2))      // full object structure
console.log({ title, rating, watched })         // multiple values at once
```

---

# PART 4 — React: Advanced Patterns

---

## 59. React Context (createContext / useContext)
**What it is:** A way to share state across your whole app without passing props through every component. Instead of `App → Page → Component → DeepChild`, any component can just call `useAuth()` and get what it needs directly.

Three moving parts:

```js
// 1. create the context (the "channel")
const AuthContext = createContext()

// 2. Provider — wraps your app, holds the state, broadcasts it
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. custom hook — any component calls this to plug in
export const useAuth = () => useContext(AuthContext)
```

```js
// in main.jsx — wrap your whole app in the Provider
<AuthProvider>
  <App />
</AuthProvider>

// in any component — grab what you need
const { user, logout } = useAuth()
```

The `value` prop on `<AuthContext.Provider>` is what every consumer receives. Whatever you put in `value`, any component can pull out via `useAuth()`.

---

## 60. React Router — Routes & Pages
**What it is:** Maps different URL paths to different page components. Wrap the whole app once in `BrowserRouter`, then declare which component renders at which path with `Routes`/`Route`.

```js
// main.jsx — wrap the whole app once
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter>
  <App />
</BrowserRouter>
```

```js
// App.jsx — map paths to pages
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

**Don't confuse this with your API layer.** `BrowserRouter` has nothing to do with `authService` or Express — it only connects React to the **browser's URL bar** (and back/forward history) so React Router knows what the current URL is and can change it without a full page reload. No network call happens here at all.

**A `Route` is declarative, not active.** It doesn't "navigate" anywhere itself — it's just a mapping: "if the URL is X, show component Y." It reacts to whatever the URL already is; it doesn't change it.

---

## 61. useNavigate — Redirecting in Code
**What it is:** Sends the user to a different page from inside a function (e.g. after a successful login) instead of waiting for them to click a link.

```js
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/dashboard')   // call this after login succeeds
```

`useNavigate` only works inside a component that's rendered underneath `BrowserRouter` — that's why the wrap in §59 has to happen first.

**Not click-bound.** `navigate` is just a plain function — you call it from wherever your own code decides to (inside an `async` `handleSubmit` after `authService.login()` resolves, a `useEffect`, a timeout, whatever). The click-triggered, declarative version of this is `<Link to="/dashboard">` (like an `<a>` tag) — not the same tool, and not covered yet.

---

## 62. Lifting State Up (Callback Props)
**What it is:** When a child component needs to change data that lives in its parent, it can't just reach up and edit the parent's state directly — props only flow one way (§3). Instead, the parent passes a *function* down as a prop; the child calls that function, and the function (which lives in the parent, next to the real `setState`) does the actual updating.

```js
// parent — owns the state
const Dashboard = () => {
  const [transactions, setTransactions] = useState([])

  const handleAdd = (newTransaction) => {
    setTransactions([...transactions, newTransaction])
  }

  return <TransactionForm onAdd={handleAdd} />
}

// child — never touches state directly, just calls what it was given
const TransactionForm = ({ onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({ amount, category })   // hands data back UP to the parent
  }
}
```

This is the pattern behind `Dashboard.jsx` coordinating `TransactionForm.jsx` and `TransactionList.jsx` — the parent is the single source of truth for the transactions array; the children just report events (`onAdd`, `onDelete`) and let the parent decide what to do about them.

---

## 63. Protected Routes (Route Guarding)
**What it is:** Right now, typing `/dashboard` directly into the URL bar works whether or not you're logged in — nothing checks. A protected route wraps a page and checks `useAuth()`'s `user` before rendering it: no user, redirect to `/login`; user exists, render the real page.

```js
// components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  return children
}

// App.jsx — wrap the route that needs protecting
<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />
```

`<Navigate to="..." />` is the declarative cousin of `useNavigate()` (§60) — same redirect, but usable directly in JSX instead of inside a function.

---

## 64. Sending the JWT with Requests (Authorization Header)
**What it is:** The backend's `authMiddleware` (§48) checks every protected request for `req.headers.authorization` — a login token has to actually be attached to each request, or the server sends back a 401. Nothing does this automatically; every service call that hits a protected route has to add the header itself.

```js
// services/transactionService.js
const getTransactions = (token) =>
  axios.get(baseURL, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data)
```

The `Bearer ` prefix has to match what the backend expects to split on (`req.headers.authorization?.split(' ')[1]` in `middleware/auth.js`) — that's why it's `Bearer ${token}`, not just the raw token. The token itself comes from `useAuth()`'s `user` (whatever `authService.login()` returned), so `Dashboard.jsx` will need to pass it into every `transactionService` call.

---

## 65. Persisting State to localStorage
**What it is:** React state (`useState`) resets to its initial value every time the component tree remounts — which includes a full page refresh. A valid JWT sitting in memory doesn't survive that, so without extra work, refreshing the page logs the user out even though their token is still good. `localStorage` is a browser-provided key/value store that *does* survive refreshes (and even closing the tab) — only cleared by `logout()`, `localStorage.clear()`, or the user manually clearing site data.

Three raw methods, all string-only — objects need `JSON.stringify`/`JSON.parse` on the way in/out:
```js
localStorage.setItem('key', JSON.stringify(value))   // save
localStorage.getItem('key')                           // read — returns a string or null
localStorage.removeItem('key')                         // delete
```

Applied to `AuthContext.jsx` — read from localStorage once, on mount, as `useState`'s **lazy initializer** (a function passed to `useState` instead of a plain value; it only runs once, on the very first render):

```js
const [user, setUser] = useState(() => {
  try {
    const savedUser = localStorage.getItem('auth_user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch (e) {
    console.error(`Failed to parse session. ${e} has occured.`)
    return null
  }
})

useEffect(() => {
  if (user) {
    localStorage.setItem('auth_user', JSON.stringify(user))
  } else {
    localStorage.removeItem('auth_user')
  }
}, [user])   // re-run only when user actually changes — not every render
```

The `try/catch` (§56) guards against corrupted/manually-edited localStorage data crashing `JSON.parse` on load. The `useEffect` keeps localStorage in sync going forward — it fires on `login()` (writes) and `logout()` (removes), since both just call `setUser(...)`, which changes `user`, which re-triggers this effect.

**Check it for real, don't just trust the code:** DevTools → Application tab → Storage → Local Storage → your origin. You'll see the `auth_user` key appear on login and disappear on logout.

---

## 66. The Frontend↔Backend Contract
**What it is:** The frontend and backend aren't magically linked — they just both agree, separately, on the same shape of data. Nothing enforces this at write-time; if they drift apart, it fails silently instead of loudly.

```js
// backend/routes/auth.js — the route reads exactly these three keys off req.body
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  ...
})
```

```js
// frontend — the form has to send exactly those three keys, spelled the same way
authService.register({ name, email, password })
```

If the frontend sent `{ username, email, password }` instead — one field misnamed — `req.body.name` would just be `undefined` on the backend. No crash, no error. The user gets saved with a missing name and nobody's told. This is why `Login.jsx` sends `{email, password}` and `Register.jsx` sends `{name, email, password}` — they're not "the same form," they're two separate contracts, each matching its own backend route's `req.body` destructuring exactly. **Watch for this again with `transactionService.js`** — whatever shape `TransactionForm.jsx` sends has to match what `routes/transactions.js`'s POST route destructures, field for field.

---

# CS FUNDAMENTALS — Transferable Knowledge

Concepts learned through building Vault. These apply to any language, any framework, any job.

---

## 67. Hashing vs Encryption
**What it is:** Two ways to protect data — not the same thing.

| | Hashing | Encryption |
|---|---|---|
| Reversible? | No | Yes (with a key) |
| Use case | Passwords | Data you need to read back |
| Example | bcrypt | HTTPS, file encryption |

Hashing is better for passwords — even if someone steals your database, they can't reverse a hash. Never store plaintext passwords. Always hash them.

---

## 68. Stateless vs Stateful Authentication
**What it is:** Two ways to handle "is this user logged in?"

| | Stateful (sessions) | Stateless (JWT) |
|---|---|---|
| Server stores session? | Yes | No |
| Scales easily? | Harder | Yes |
| What Vault uses | — | ✅ |

Stateless means the server hands you a signed token after login. You send it with every request and the server just verifies the signature — no database lookup needed.

---

## 69. Enumeration Attack Prevention
**What it is:** Never tell an attacker which specific field failed on login. Always return the same error for wrong email AND wrong password.

```js
// correct — attacker learns nothing
res.status(401).json({ error: 'invalid credentials' })

// wrong — attacker can map which emails are registered
res.status(401).json({ error: 'email not found' })
```

If you say "email not found," an attacker can cycle through emails and build a list of valid accounts.

---

## 70. Separation of Concerns
**What it is:** Each file should have one job. If a file is doing two things, it's a sign it should be split. Makes bugs easier to find and code easier to explain in interviews.

| File | Job |
|---|---|
| `models/` | Define data shape |
| `routes/` | Handle requests |
| `middleware/` | Run checks before routes |
| `index.js` | Wire everything together |

---

## 71. How to Read an Error Message
**What it is:** Error messages tell you exactly what went wrong — most beginners skip past them. Read them like a sentence.

```
TypeError: Cannot read properties of null (reading 'password')
```

Break it down:
- **TypeError** — the category of error
- **Cannot read properties of null** — you tried to access something on a null value
- **(reading 'password')** — specifically the `password` field

Then ask: *where in my code would something be null that I'm calling `.password` on?* — that's your bug.

**Always read the line number** in the stack trace. It points directly to where things went wrong.

---

## 72. Debugging Systematically
**What it is:** A process for finding bugs without panicking. Guessing randomly wastes time — narrow it down.

1. **Read the error message** — what does it actually say?
2. **Find the line number** — go there first
3. **Add a console.log before the crash** — what does the data actually look like at that point?
4. **Check your assumptions** — "I thought this was a string" → log it and confirm
5. **Change one thing at a time** — if you change three things at once, you won't know what fixed it

Most bugs come from: wrong variable name, wrong data shape, something being null/undefined when you expected a value.

---

## 73. How to Google an Error
**What it is:** Googling effectively is a real skill. Bad searches return nothing useful.

**Remove project-specific parts** from the error:
```
// bad search — too specific to your code
"foundUser.password undefined vault app express"

// good search — the actual error pattern
"cannot read properties of null reading password express"
```

Add the technology name: `express`, `mongoose`, `react`, `jwt`

If Stack Overflow doesn't help, search the **official docs** — MDN for JS, Mongoose docs for MongoDB, Express docs for routing.

---

## 74. CRUD — The Four Operations
**What it is:** Every database-driven app does some combination of these four things. If you understand CRUD, you understand 80% of what backends do.

| Letter | Operation | HTTP Method | Mongoose |
|---|---|---|---|
| C | Create | POST | `new Model().save()` |
| R | Read | GET | `Model.find()` |
| U | Update | PUT | `Model.findByIdAndUpdate()` |
| D | Delete | DELETE | `Model.findByIdAndDelete()` |

Vault's transaction routes are CRUD. So is every todo app, every social media feed, every e-commerce site.

---

## 75. Thinking in Inputs and Outputs
**What it is:** When you don't know how to write a function, ignore the code and just ask: *what goes in, what comes out?*

Example — POST /api/transactions:
- **Input:** amount, type, category, description, date (from req.body) + user id (from req.user)
- **Output:** the saved transaction object, status 201

Once you know that, the code is just filling in the middle. This works for any function at any level.

---

## 76. Working Backwards
**What it is:** When you're stuck, start from what you *want* to end up with and trace backwards to what you need.

Example — you want `res.json({ token })`:
- To have a `token` → you need `jwt.sign(...)`
- To call `jwt.sign` → you need the user's `_id`
- To have the user's `_id` → you need to find the user first
- To find the user → you need their email from `req.body`

Now you have your steps in order. Write them top to bottom.

---

## 77. The Principle of Least Privilege
**What it is:** Only give code (or users) the minimum access they need to do their job. A real security principle used everywhere.

Examples in Vault:
- Transactions route only gets the user's own transactions — not everyone's
- `req.user.id` comes from the verified JWT — not from `req.body` where users could fake it
- `.env` keeps secrets off GitHub — the app only reads what it needs at runtime

In interviews: "I applied least privilege by scoping transactions to the authenticated user via middleware rather than trusting client-supplied user ids."

---

## 78. Precision vs Comprehension Errors
**What it is:** Two completely different types of mistakes. Knowing which one you made tells you how to fix it.

**Comprehension error** — you don't understand the concept. Fix: re-read, ask for an explanation, look it up.

**Precision error** — you understand the concept but made a small execution mistake. Fix: slow down, re-read your own code line by line.

Examples of precision errors:
- Missing `const` before a variable
- Wrong parameter name (`res` vs `response`)
- `export default` placed too early
- Calling `.then()` and `await` on the same line

Most bugs while learning are precision errors, not comprehension errors. That distinction matters — it means you're further along than you think.

---

## 79. Think Smaller
**What it is:** When a problem feels overwhelming, you're probably trying to solve too much at once. The fix is always to shrink the problem until it's something you can actually hold in your head.

**The rule:** If you can't explain what the next line of code should do, the step is still too big.

Break it down until each step is one sentence:
```
// too big — "write the login route"

// just right:
// 1. pull email and password from req.body
// 2. find the user by email
// 3. if no user, return 401
// 4. compare passwords
// 5. if no match, return 401
// 6. sign a token
// 7. send the token back
```

Now write step 1. Don't think about step 2 yet.

---

## 80. Git Branching & Pull Requests
**What it is:** Solo, committing straight to `main` is fine. On any real team, it isn't — everyone works on a separate **branch** so `main` always stays deployable.

```
git checkout -b feature/add-register-page   // branch off main
// make your commits here
git push -u origin feature/add-register-page
```

Then you open a **pull request (PR)** — a request for someone to review your branch's changes before they get merged into `main`. A reviewer reads the diff, comments, you push fixes, then it merges. This is the actual day-to-day workflow at almost every SWE job — "just push to main" doesn't scale past one person.

---

## 81. The Event Loop — Why async/await Doesn't Block
**What it is:** JavaScript runs on a single thread — it can only do one thing at a time. So when you `await` a database call or an axios request, how does the rest of the app keep responding?

The **event loop** is the mechanism: slow operations (network calls, timers, file reads) get handed off to the runtime (Node/browser), and your JS code moves on immediately. When that operation finishes, its `.then()`/callback gets queued and run *later*, in between other work — not blocking anything in the meantime.

```js
console.log('1')
setTimeout(() => console.log('2'), 0)   // queued for later, even with 0ms delay
console.log('3')
// logs: 1, 3, 2 — not 1, 2, 3
```

This is why your `authService.login()` call doesn't freeze the page while it waits for the server — the request goes off, the event loop keeps the UI responsive, and your `.then()` runs once the response comes back.

---

## 82. Big O Notation — The Basics
**What it is:** A way to describe how an algorithm's runtime grows as the input grows. Common interview topic, and useful for spotting slow code in your own projects.

| Notation | Name | Example |
|---|---|---|
| O(1) | Constant | Reading `arr[0]` |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | `.find()`, `.filter()`, a `for` loop over an array |
| O(n²) | Quadratic | A loop inside a loop over the same data |

You don't need to calculate it precisely day to day — the useful habit is noticing **loops inside loops over the same data** (that's usually O(n²) and a sign there might be a faster way) versus a single pass (O(n), usually fine).

---

## 83. Technical Debt
**What it is:** Shortcuts taken to ship faster now, at the cost of harder-to-maintain code later — like a financial loan, it has to get "paid back" eventually (refactored) or it keeps accumulating interest (more bugs, slower changes).

Not inherently bad — sometimes shipping now and cleaning up later is the right call. The problem is debt that's never acknowledged or repaid. In interviews, being able to say "we took on debt here to hit a deadline, and here's what paying it down would've looked like" reads as senior judgment, not a confession.

---

## 84. DRY vs. Premature Abstraction (Rule of Three)
**What it is:** "Don't Repeat Yourself" is real, but applying it too early creates the opposite problem — an abstraction built around a guess at future needs that doesn't actually fit when those needs arrive.

**The Rule of Three:** don't abstract something out until you've written it **three** separate times. Two similar-looking pieces of code might just be a coincidence; a third occurrence is a real pattern worth extracting into a shared function/component.

Building `TransactionForm` and `TransactionList` separately even though they'll share some logic is fine at first — the shared piece becomes obvious once you're staring at actual duplication, not before.

---

## 85. Idempotency
**What it is:** An operation is **idempotent** if doing it once and doing it five times leave the system in the same state. This matters because networks are unreliable — a client might retry a request that actually succeeded but whose response got lost.

| Method | Idempotent? | Why |
|---|---|---|
| GET | Yes | Reading data doesn't change anything |
| PUT | Yes | "Set this field to X" — repeating it is harmless |
| DELETE | Yes | Already deleted → deleting again is still "gone" |
| POST | **No** | Retrying a POST can create a duplicate (e.g. two identical transactions) |

This is part of *why* REST (§25) assigns POST specifically to "create" — it's the one method callers have to be careful about retrying.

**When you're stuck:** Don't stare at the whole file. Pick the smallest possible next thing and do only that. The rest will follow.
