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



  
  
  const inputStyle = "rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"

  return(
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-6">
    <h2 className="text-lg font-semibold text-gray-100">Add Transaction</h2>
    <input
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    placeholder="Enter amount"
    className={inputStyle}
    />
    <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className={inputStyle}
    >
    <option value="">Select type</option>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
    </select>
    <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className={inputStyle}
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
    className={inputStyle}
    />
    <input
    value={date}
    onChange={(e) => setDate(e.target.value)}
    placeholder="Enter date"
    className={inputStyle}
    />
    <button type="submit" className="mt-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">Submit</button>
  </form>

  )}

export default TransactionForm
