import express from 'express'
import Transaction from '../models/Transaction.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()


router.use(authMiddleware)

router.get('/', async (req, res) => {
    try{
const user = await Transaction.find({user: req.user.id})
res.status(200).json(user)
    } catch (err){
        res.status(500).json({
            error: 'Server has failed.'
        })
    }
})

router.post('/', async (req, res) => {
    try{
    const {amount, type, category, description, date} = req.body
    const transaction = new Transaction ({ amount, type, category, description, date, user: req.user.id})
    const savedTransaction  = await transaction.save()
    res.status(201).json(savedTransaction)
    }catch (err){
        res.status(400).json({
            error: 'Bad data was sent.'
        })
    }
    
})

router.delete('/:id', async (req, res) => {
    try{
    await Transaction.findByIdAndDelete(req.params.id)
    res.status(204).end()
    }catch (err){
        res.status(400).json({
            error: 'Already deleted'
        })
    }
})

router.put('/:id', async (req,res) =>{
    try{
    const {amount,type, category,description,date} = req.body
    const updated = await Transaction.findByIdAndUpdate(req.params.id,{amount,type,category,description,date},{new:true,runValidators:true})
    res.status(200).json(updated)
    } catch (err){
        res.status(400).json({
            error: 'No data to update.'
        })
    }
})


// GET    /api/transactions
// POST   /api/transactions
// PUT    /api/transactions/:id
// DELETE /api/transactions/:id

export default router
