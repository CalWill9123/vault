import { useState, useEffect } from "react"
import transactionService from "../services/transactionService"
import { useAuth } from "../context/AuthContext"
import TransactionList from "../components/TransactionList"
import TransactionForm from "../components/TransactionForm"

const Dashboard = () => {

  const [transactions,setTransactions] = useState([])
  const {user} = useAuth()

  useEffect (() => {
    transactionService
    .getTransactions(user.token)
    .then(data => setTransactions(data))
    .catch(err => console.error(`${err} has just occured.`))
  },[])

  const handleAdd = (newTransaction) =>{
    setTransactions([...transactions,newTransaction]) 
  }
  const handleDelete = (id) => {
    if (!window.confirm('Remove this transaction?')) return
    transactionService
    .deleteTransaction(id,user.token)
    .then(() => setTransactions(transactions.filter(i => i._id !== id)))
    .catch(err => console.error(`${err} has occured`))
  }
 return (
  <div>
 <TransactionList transactions={transactions} onDelete={handleDelete} />
 <TransactionForm onAdd={handleAdd} />
 </div>
)}

export default Dashboard
