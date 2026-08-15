import { useState, useEffect } from "react"
import transactionService from "../services/transactionService"
import { useAuth } from "../context/AuthContext"
import TransactionList from "../components/TransactionList"
import TransactionForm from "../components/TransactionForm"
import SpendingChart from "../components/SpendingChart"
import budgetService from "../services/budgetService"
import BudgetSummary from "../components/BudgetSummary"

const Dashboard = () => {

  const [transactions,setTransactions] = useState([])
  const [budget,setBudget] = useState([])
  const {user} = useAuth()

  useEffect (() => {
    transactionService
    .getTransactions(user.token)
    .then(data => setTransactions(data))
    .catch(err => console.error(`${err} has just occured.`))
  },[])

  useEffect (() => {
    budgetService
    .getBudget(user.token)
    .then(data =>setBudget(data))
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
  <div className="min-h-screen bg-gray-950 px-4 py-6">
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <SpendingChart transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
      <TransactionForm onAdd={handleAdd} />
      <BudgetSummary transactions={transactions} budget={budget} />
    </div>
  </div>
)}

export default Dashboard
