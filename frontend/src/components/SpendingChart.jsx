import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const COLORS = ['#22c55e', '#4ade80', '#86efac', '#16a34a', '#15803d', '#166534', '#bbf7d0']

const SpendingChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense')

  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
    return acc
  }, {})

  const categories = Object.keys(totals)

  if (categories.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-800 bg-gray-900 text-sm text-gray-400">
        Add an expense to see your spending breakdown
      </div>
    )
  }

  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map(c => totals[c]),
        backgroundColor: categories.map((_, i) => COLORS[i % COLORS.length]),
        borderColor: '#0a0a0f',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#d1d5db', padding: 16 },
      },
    },
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-100">Spending by Category</h2>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default SpendingChart
