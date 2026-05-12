import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: string
    positive: boolean
  }
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-600/10 rounded-lg text-blue-500">
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.value}
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  )
}
