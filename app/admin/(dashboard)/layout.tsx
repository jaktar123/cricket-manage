
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FaUsers, FaChartBar, FaSignOutAlt, FaCog } from 'react-icons/fa'
import Image from 'next/image'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700">
            <Image src="/logo.png" alt="JTL" width={40} height={40} className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">JTL</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
          >
            <FaChartBar size={18} />
            <span>Overview</span>
          </Link>
          <Link 
            href="/admin/players" 
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
          >
            <FaUsers size={18} />
            <span>Players</span>
          </Link>
          <Link 
            href="/admin/config" 
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
          >
            <FaCog size={18} />
            <span>Config</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <form action="/api/auth/signout" method="POST">
            <button 
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <FaSignOutAlt size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
