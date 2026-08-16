import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import auth from './routes/auth.js'
import Transaction from './routes/transactions.js'
import Budget from './routes/budget.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/transactions', Transaction)
app.use('/api/budget',Budget)


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error('error connecting to MongoDB:', error.message))


app.use('/api/auth',auth)

const frontendDist = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendDist))
app.use((req, res) => res.sendFile(path.join(frontendDist, 'index.html')))

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`))
