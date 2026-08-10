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
    <input
    value={type}
    onChange={(e) => setType(e.target.value)}
    placeholder="Enter type of transaction"
    />
    <input
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    placeholder="Enter category"
    />
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
