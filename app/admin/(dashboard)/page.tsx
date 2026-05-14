
import { createClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'
import { FaUsers, FaMoneyBillWave, FaCalendarCheck, FaClock, FaTrophy } from 'react-icons/fa'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch stats - only successful payments
  const { count: totalPlayers } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .eq('payment_status', 'Success')

  const { data: recentPlayers } = await supabase
    .from('players')
    .select('full_name, primary_role, created_at')
    .eq('payment_status', 'Success')
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: revenueData } = await supabase
    .from('players')
    .select('payment_amount')
    .eq('payment_status', 'Success');
  
  const revenue = revenueData?.reduce((acc, player) => acc + (player.payment_amount || 0), 0) || 0;
  
  const { count: pendingPlayers } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .eq('payment_status', 'PENDING')


  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back, Organiser. Here&apos;s what&apos;s happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Registrations" 
          value={totalPlayers || 0} 
          icon={<FaUsers size={24} />} 
        />
        <StatCard 
          title="Total Revenue" 
          value={`₹${revenue}`} 
          icon={<FaMoneyBillWave size={24} />} 
        />
        <StatCard 
          title="Completed Games" 
          value="0" 
          icon={<FaCalendarCheck size={24} />} 
        />
        <StatCard 
          title="Pending Payments" 
          value={pendingPlayers || 0} 
          icon={<FaClock size={24} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">Recent Registrations</h3>
            <button className="text-blue-500 text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="divide-y divide-slate-800">
            {recentPlayers?.map((player, index) => (
              <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                <div>
                  <p className="text-white font-medium">{player.full_name}</p>
                  <p className="text-slate-500 text-sm">{player.primary_role}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs">
                    {new Date(player.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-green-500 text-xs font-medium">Paid</p>
                </div>
              </div>
            ))}
            {(!recentPlayers || recentPlayers.length === 0) && (
              <div className="px-6 py-10 text-center text-slate-500">
                No recent registrations found.
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mb-4">
            <FaTrophy size={32} />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Tournament Preparation</h3>
          <p className="text-slate-400 mb-6 max-w-sm">
            Once registration closes, you can start creating the tournament schedule and teams.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Setup Brackets
          </button>
        </div>
      </div>
    </div>
  )
}

