function TransactionList({transactions,onDelete}) {
  return(
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-100">Transactions</h2>
      <ul className="flex flex-col gap-2">
        {transactions.map(transaction => {
          return (
            <li key={transaction._id} className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-200">
              <span>{transaction.category} — ${transaction.amount}</span>
              <button
                onClick={() => onDelete(transaction._id)}
                className="text-xs font-medium text-red-400 hover:underline"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </div>
)}
export default TransactionList