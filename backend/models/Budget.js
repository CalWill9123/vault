import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    month:String,
    totalBudget:Number,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Budget',BudgetSchema)