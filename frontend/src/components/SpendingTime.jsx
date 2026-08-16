import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

const SpendingTime = ({transactions}) =>{
    const expenses = transactions.filter(t => t.type === 'expense' && t.date)

    const totals = expenses.reduce((acc,t) => {
        const dateKey = t.date.slice(0,10)
        acc[dateKey] = (acc[dateKey] || 0) + Number(t.amount)
        return acc
    },{})

    const dates = Object.keys(totals)

    dates.sort()

    if (dates.length === 0) {
      return (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-800 bg-gray-900 text-sm text-gray-400">
          Add an expense to see your spending over time
        </div>
      )
    }

    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Spending',
          data: dates.map(d => totals[d]),
          borderColor: '#22c55e',
          backgroundColor: '#22c55e',
          tension: 0.3,
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
      scales: {
        x: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
        y: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
      },
    }

    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-100">Spending Over Time</h2>
        <Line data={data} options={options} />
      </div>
    )
}

export default SpendingTime
