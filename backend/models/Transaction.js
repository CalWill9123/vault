import mongoose from 'mongoose'


const transactionSchema = new mongoose.Schema({
    amount:Number,
    type:{type:String, enum: ['income','expense']},
    category:String,
    description:String,
    date:Date,
    user :{type: mongoose.Schema.Types.ObjectId, ref:'User'}

})

export default mongoose.model('Transaction', transactionSchema)
