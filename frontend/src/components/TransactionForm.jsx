import transactionService from "../services/transactionService"
import { useState,useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const TransactionForm = ({onAdd}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
   const transaction = {amount,type,category,description,date}
   transactionService.addTransactions(transaction,user.token)
   .then(res => onAdd(res))
   .catch(err => console.error(`${err} has occured.`))
   
   
   
  }
  const [amount,setAmount] = useState('')
  const [type, setType] = useState('')
  const [category,setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const {user} = useAuth()



  
  
  return(
    <form onSubmit={handleSubmit}>
    <input
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    placeholder="Enter amount"
    />
    <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    >
    <option value="">Select type</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
    </select>
    <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    >
    <option value="">Select category</option>
    <option value="food">Food</option>
    <option value="rent">Rent</option>
    <option value="utilities">Utilities</option>
    <option value="transportation">Transportation</option>
    <option value="entertainment">Entertainment</option>
    <option value="income">Income</option>
    <option value="other">Other</option>
    </select>
    <input
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Enter description"
    />
    <input
    value={date}
    onChange={(e) => setDate(e.target.value)}
    placeholder="Enter date"
    />
    <button type="submit">Submit</button>
  </form>
  
  )}

export default TransactionForm
