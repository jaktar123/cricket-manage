'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaUsers, FaChartBar, FaSignOutAlt, FaCog, FaBars, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', icon: FaChartBar, label: 'Overview' },
    { href: '/admin/players', icon: FaUsers, label: 'Players' },
    { href: '/admin/config', icon: FaCog, label: 'Config' },
  ]

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700">
          <Image src="/logo.png" alt="JTL" width={40} height={40} className="w-full h-full object-cover" />
        </div>
        <span className="text-2xl font-black text-white tracking-tighter">JTL</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} size={18} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-6 border-t border-slate-800">
        <form action="/api/auth/signout" method="POST">
          <button 
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all group"
          >
            <FaSignOutAlt className="group-hover:text-red-400 transition-colors" size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </form>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Header Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 px-6 flex items-center gap-4 z-40">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-lg"
          aria-label="Open Menu"
        >
          <FaBars size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md overflow-hidden border border-slate-700">
            <Image src="/logo.png" alt="JTL" width={32} height={32} className="w-full h-full object-cover" />
          </div>
          <span className="font-black text-white tracking-tight">JTL ADMIN</span>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#0f172a] border-r border-slate-800 p-6 flex-col sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-slate-900 p-6 flex flex-col z-50 lg:hidden shadow-2xl border-r border-slate-800"
            >
              <div className="absolute top-6 right-6">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-lg"
                  aria-label="Close Menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
