import express from 'express'
import Budget from '../models/Budget.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/',async(req,res)=>{
    try{
        const user = await Budget.find({user: req.user.id})
        res.status(200).json(user)
    } catch(err){
        res.status(500).json({
            error: 'Server has failed.'
        })
    }
})

router.post('/',async(req,res)=>{
    try{
        const {month,totalBudget} = req.body
        const saved = await new Budget({month,totalBudget,user: req.user.id}).save()
        res.status(201).json(saved)
    } catch(err){
        res.status(400).json({
            error: 'Bad data was sent.'
        })
    }
})

export default router