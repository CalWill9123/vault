function TransactionList({transactions}) {
  return(
    <div>
      <ul>
        
        {transactions.map(transaction => {
          return <li key={transaction._id}>{transaction.category} — ${transaction.amount}</li>
        })}
        
      </ul>
        
    </div>
  
)}
export default TransactionList
