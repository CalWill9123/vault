import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import auth from './routes/auth.js'
import Transaction from './routes/transactions.js'
import Budget from './routes/budget.js'


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/transactions', Transaction)
app.use('/api/budget',Budget)


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error('error connecting to MongoDB:', error.message))


app.use('/api/auth',auth)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
