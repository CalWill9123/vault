function TransactionList({transactions,onDelete}) {
  return(
    <div>
      <ul>
        
        {transactions.map(transaction => {
          return <li key={transaction._id}>{transaction.category} — ${transaction.amount}
          <button onClick={() => onDelete(transaction._id)}>Delete</button>
          </li>
        })}
        
      </ul>
        
    </div>
  
)}
export default TransactionList