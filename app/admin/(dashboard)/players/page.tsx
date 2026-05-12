
import { createClient } from '@/lib/supabase/server'
import PlayersTable from '@/components/admin/PlayersTable'

export default async function PlayersPage() {
  const supabase = await createClient()
  
  const { data: players, error } = await supabase
    .from('players')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase Error:', error)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading players: {error.message}
        <pre className="mt-4 text-xs">{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }

  console.log('Players fetched:', players?.length || 0)

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Registered Players</h1>
          <p className="text-slate-400">View and manage all tournament registrations.</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-sm">Total Count</p>
          <p className="text-2xl font-bold text-white">{players?.length || 0}</p>
        </div>
      </header>

      <PlayersTable players={players || []} />
    </div>
  )
}
