import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import transactionService from "../services/transactionService"
import { useAuth } from "../context/AuthContext"
import TransactionList from "../components/TransactionList"
import TransactionForm from "../components/TransactionForm"
import SpendingChart from "../components/SpendingChart"
import SpendingTime from "../components/SpendingTime"
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
 const cards = [
    <SpendingChart transactions={transactions} />,
    <SpendingTime transactions={transactions} />,
    <TransactionList transactions={transactions} onDelete={handleDelete} />,
    <TransactionForm onAdd={handleAdd} />,
    <BudgetSummary transactions={transactions} budget={budget} />,
  ]

 return (
  <div className="min-h-screen bg-gray-950 px-4 py-6">
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
        >
          {card}
        </motion.div>
      ))}
    </div>
  </div>
)}

export default Dashboard
