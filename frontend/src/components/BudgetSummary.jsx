const BudgetSummary = ({transactions,budget}) => {
   const currentDate = new Date()
    const currentMonthNumber = currentDate.getMonth() + 1
const expenses = transactions.filter(t => t.type === 'expense')
const budgetEntry = budget.find(b => Number(b.month) === currentMonthNumber)

const totals = expenses.reduce((sum,i) => sum + i.amount,0)


return(
    <div> {totals} spent of {budgetEntry?.totalBudget}</div>
)

}

export default BudgetSummary