import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from'../models/User.js'
const router = express.Router()

router.post('/register',async (req , res) => {
    try{
    const {name , email , password} = req.body
    const passwordHash = await bcrypt.hash(password,10)
    const user = new User ({name , email , password: passwordHash})
    const savedUser = await user.save()
    res.status(201).json(savedUser)
    }catch (err){
        res.status(400).json({
            error: 'Invalid data request'
        })
    }
})


// POST /api/auth/register
// POST /api/auth/login



router.post('/login', async (req , res) => {
    try{
    const {email , password} = req.body
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
    return res.status(401).json({error: 'invalid credentials'})
    
    }
    const correctPassword = await bcrypt.compare(password,foundUser.password)
    if(!correctPassword){
        return res.status(401).json({error: 'invalid credentials'})
    }

    const token = jwt.sign({ id: foundUser._id}, process.env.JWT_SECRET)
    res.json({ token })
} catch(err){
    res.status(400).json({
        error:'Bad login request.'
    })
}
    

})

export default router