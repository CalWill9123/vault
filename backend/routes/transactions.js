import express from 'express'
import Transaction from '../models/Transaction.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()


router.use(authMiddleware)

router.get('/', async (req, res) => {
Transaction.find({user: req.user.id}).then(user => res.json(user))
})

router.post('/', async (req, res) => {
    const {amount, type, category, description, date} = req.body
    const transaction = new Transaction ({ amount, type, category, description, date, user: req.user.id})
    const savedTransaction  = await transaction.save()
    res.status(201).json(savedTransaction)
    
})

router.delete('/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

router.put('/:id', async (req,res) =>{
    const {amount,type, category,description,date} = req.body
    const updated = await Transaction.findByIdAndUpdate(req.params.id,{amount,type,category,description,date},{new:true})
   
    res.status(200).json(updated)
})


// GET    /api/transactions
// POST   /api/transactions
// PUT    /api/transactions/:id
// DELETE /api/transactions/:id

export default router
