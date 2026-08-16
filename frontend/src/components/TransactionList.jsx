import { motion, AnimatePresence } from "framer-motion"

function TransactionList({transactions,onDelete}) {
  return(
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-100">Transactions</h2>
      <ul className="flex flex-col gap-2">
        <AnimatePresence>
          {transactions.map(transaction => {
            return (
              <motion.li
                key={transaction._id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-200"
              >
                <span>{transaction.category} — ${transaction.amount}</span>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => onDelete(transaction._id)}
                  className="text-xs font-medium text-red-400 hover:underline"
                >
                  Delete
                </motion.button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
)}
export default TransactionList