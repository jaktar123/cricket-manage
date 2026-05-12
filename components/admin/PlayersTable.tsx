'use client'

import { useState } from 'react'
import { FaSearch, FaFilter, FaDownload, FaEdit, FaTrash, FaEye, FaSortAmountDown } from 'react-icons/fa'
import Image from 'next/image'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { updatePlayer, deletePlayer } from '@/app/admin/actions'
import { RegistrationData } from '@/lib/types'

interface Player {
  id: string
  full_name: string
  age: number
  mobile: string
  email: string
  primary_role: string
  batting_style: string
  bowling_style: string
  jersey_number: number
  jersey_size: string
  payment_status: string
  created_at: string
  photo_url?: string
}

const EXPORT_COLUMNS = [
  { label: 'S.No', key: 'serial_no' },
  { label: 'Photo', key: 'photo_url' },
  { label: 'Full Name', key: 'full_name' },
  { label: 'Age', key: 'age' },
  { label: 'Mobile', key: 'mobile' },
  { label: 'Email', key: 'email' },
  { label: 'Role', key: 'primary_role' },
  { label: 'Batting', key: 'batting_style' },
  { label: 'Bowling', key: 'bowling_style' },
  { label: 'Jersey #', key: 'jersey_number' },
  { label: 'Size', key: 'jersey_size' },
  { label: 'Status', key: 'payment_status' },
  { label: 'Date', key: 'created_at' },
]

export default function PlayersTable({ players: initialPlayers }: { players: Player[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  const filteredPlayers = initialPlayers
    .filter(player => {
      const matchesSearch = player.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.mobile.includes(searchTerm)
      const matchesRole = roleFilter === 'All' || player.primary_role === roleFilter
      return matchesSearch && matchesRole
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      if (sortBy === 'name') return a.full_name.localeCompare(b.full_name)
      if (sortBy === 'age_asc') return a.age - b.age
      if (sortBy === 'age_desc') return b.age - a.age
      return 0
    })

  const exportToCSV = () => {
    const headers = ['Name', 'Age', 'Mobile', 'Email', 'Role', 'Batting', 'Bowling', 'Jersey No', 'Size', 'Status']
    const data = filteredPlayers.map(p => [
      p.full_name, p.age, p.mobile, p.email, p.primary_role, p.batting_style, p.bowling_style, p.jersey_number, p.jersey_size, p.payment_status
    ])
    
    const csvContent = [headers, ...data].map(e => e.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `players_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = async (selectedColumns: string[]) => {
    setLoading(true)
    const doc = new jsPDF()
    
    // Sort players by created_at ASCENDING for chronological serial numbers
    const sortedPlayers = [...filteredPlayers].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    
    // Add title
    doc.setFontSize(18)
    doc.text('Tournament Registrations', 14, 22)
    doc.setFontSize(11)
    doc.setTextColor(100)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)
    doc.text(`Total Players: ${sortedPlayers.length}`, 14, 36)

    // Load images if photo_url is selected
    const imageMap: { [key: string]: string } = {}
    if (selectedColumns.includes('photo_url')) {
      await Promise.all(sortedPlayers.map(async (player) => {
        if (player.photo_url) {
          try {
            const response = await fetch(player.photo_url)
            const blob = await response.blob()
            const base64 = await new Promise<string>((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result as string)
              reader.readAsDataURL(blob)
            })
            imageMap[player.photo_url] = base64
          } catch (error) {
            console.error('Failed to load image', player.photo_url, error)
          }
        }
      }))
    }
    
    const tableColumn = EXPORT_COLUMNS
      .filter(col => selectedColumns.includes(col.key))
      .map(col => col.label)
      
    const photoColIndex = EXPORT_COLUMNS
      .filter(col => selectedColumns.includes(col.key))
      .findIndex(col => col.key === 'photo_url')



    const tableRows = sortedPlayers.map((player, index) => {
      return EXPORT_COLUMNS
        .filter(col => selectedColumns.includes(col.key))
        .map(col => {
          if (col.key === 'serial_no') {
            return index + 1
          }
          if (col.key === 'created_at') {
            return new Date(player.created_at).toLocaleDateString()
          }
          if (col.key === 'photo_url') {
            return '' // Keep cell empty to prevent URL overflow
          }
          const val = player[col.key as keyof Player]
          return val ?? '' // Fallback to empty string for autoTable
        })
    })

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [241, 245, 249] },
      margin: { top: 45 },
      styles: { 
        minCellHeight: selectedColumns.includes('photo_url') ? 35 : 10,
        valign: 'middle'
      },
      columnStyles: photoColIndex !== -1 ? { [photoColIndex]: { cellWidth: 35 } } : {},
      didDrawCell: (data) => {
        if (photoColIndex !== -1 && data.column.index === photoColIndex && data.cell.section === 'body') {
          const player = sortedPlayers[data.row.index]
          if (player.photo_url && imageMap[player.photo_url]) {
            // Further increased image size and centered it
            doc.addImage(imageMap[player.photo_url], 'JPEG', data.cell.x + 2.5, data.cell.y + 2.5, 30, 30)
          }
        }
      },
    })

    doc.save(`players_export_${new Date().toISOString().split('T')[0]}.pdf`)
    setIsExportModalOpen(false)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this registration?')) {
      setLoading(true)
      try {
        await deletePlayer(id)
      } catch {
        alert('Failed to delete player')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-w-[140px]"
            >
              <option value="All">All Roles</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All Rounder">All Rounder</option>
              <option value="Wicket Keeper">Wicket Keeper</option>
            </select>
          </div>
          <div className="relative">
            <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-w-[140px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="age_asc">Age (Low-High)</option>
              <option value="age_desc">Age (High-Low)</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-all text-sm border border-slate-700"
          >
            <FaDownload size={12} className="text-blue-400" />
            <span>CSV</span>
          </button>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all text-sm shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <FaDownload size={12} />
            )}
            <span>{loading ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-slate-400 font-medium text-sm">S.No</th>
              <th className="px-6 py-4 text-slate-400 font-medium text-sm">Photo</th>
              <th className="px-6 py-4 text-slate-400 font-medium text-sm">Player Name</th>
              <th className="px-6 py-4 text-slate-400 font-medium text-sm">Role</th>
              <th className="px-6 py-4 text-slate-400 font-medium text-sm">Contact</th>
              <th className="px-6 py-4 text-slate-400 font-medium text-sm">Status</th>
              <th className="px-6 py-4 text-slate-400 font-medium text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredPlayers.map((player) => (
              <tr key={player.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-slate-300 text-sm font-medium">
                  {/* Serial number based on registration time (total - index since we show newest first) */}
                  {initialPlayers.length - initialPlayers.findIndex(p => p.id === player.id)}
                </td>
                <td className="px-6 py-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden border border-slate-700 flex-shrink-0">
                    {player.photo_url ? (
                      <Image 
                        src={player.photo_url} 
                        alt={player.full_name} 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-blue-500 font-bold bg-blue-600/10">
                        {player.full_name.charAt(0)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white font-medium">{player.full_name}</span>
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm">{player.primary_role}</td>
                <td className="px-6 py-4">
                  <p className="text-white text-sm">{player.mobile}</p>
                  <p className="text-slate-500 text-xs">{player.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20">
                    {player.payment_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => { setSelectedPlayer(player); setIsViewModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      <FaEye size={16} />
                    </button>
                    <button 
                      onClick={() => { setSelectedPlayer(player); setIsEditModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-green-500 transition-colors"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(player.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simplified Details Modal */}
      {isViewModalOpen && selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-white font-bold text-xl">Player Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-8 flex flex-col items-center">
              <div className="w-32 h-32 rounded-xl bg-slate-800 mb-6 overflow-hidden border-2 border-blue-500/30">
                {selectedPlayer.photo_url ? (
                  <Image 
                    src={selectedPlayer.photo_url} 
                    alt="Photo" 
                    width={128} 
                    height={128} 
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">No Photo</div>
                )}
              </div>
              <h4 className="text-2xl font-bold text-white mb-1">{selectedPlayer.full_name}</h4>
              <p className="text-blue-500 font-medium mb-8">{selectedPlayer.primary_role}</p>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Age</p>
                  <p className="text-white font-medium">{selectedPlayer.age}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Jersey Details</p>
                  <p className="text-white font-medium">#{selectedPlayer.jersey_number} (Size: {selectedPlayer.jersey_size})</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Batting Style</p>
                  <p className="text-white font-medium">{selectedPlayer.batting_style}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Bowling Style</p>
                  <p className="text-white font-medium">{selectedPlayer.bowling_style}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Mobile</p>
                  <p className="text-white font-medium">{selectedPlayer.mobile}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Email</p>
                  <p className="text-white font-medium truncate max-w-[150px]">{selectedPlayer.email}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Payment Status</p>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20">
                    {selectedPlayer.payment_status}
                  </span>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Registration Date</p>
                  <p className="text-white font-medium">{new Date(selectedPlayer.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export PDF Modal */}
      {isExportModalOpen && (
        <ExportPDFModal 
          onClose={() => setIsExportModalOpen(false)}
          onExport={exportToPDF}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedPlayer && (
        <EditPlayerModal 
          player={selectedPlayer}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  )
}

function ExportPDFModal({ onClose, onExport }: { onClose: () => void, onExport: (cols: string[]) => void }) {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    ['serial_no', ...EXPORT_COLUMNS.slice(1, 6).map(c => c.key)] // Default include S.No
  )

  const toggleColumn = (key: string) => {
    if (selectedColumns.includes(key)) {
      setSelectedColumns(selectedColumns.filter(c => c !== key))
    } else {
      setSelectedColumns([...selectedColumns, key])
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h3 className="text-white font-bold text-xl">Export PDF</h3>
            <p className="text-slate-500 text-sm">Select columns to include in the report</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors">✕</button>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-3 mb-8">
            {EXPORT_COLUMNS.map((col) => (
              <label 
                key={col.key}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedColumns.includes(col.key) 
                    ? 'bg-blue-600/10 border-blue-500 text-white' 
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                <input 
                  type="checkbox"
                  className="hidden"
                  checked={selectedColumns.includes(col.key)}
                  onChange={() => toggleColumn(col.key)}
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                  selectedColumns.includes(col.key) ? 'bg-blue-500 border-blue-500' : 'border-slate-600'
                }`}>
                  {selectedColumns.includes(col.key) && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className="text-sm font-medium">{col.label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-2xl transition-all border border-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={() => onExport(selectedColumns)}
              disabled={selectedColumns.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-2xl transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditPlayerModal({ player, onClose }: { player: Player, onClose: () => void }) {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: player.full_name,
    age: player.age.toString(),
    mobile: player.mobile,
    email: player.email,
    role: player.primary_role,
    battingStyle: player.batting_style,
    bowlingStyle: player.bowling_style,
    jerseyNumber: player.jersey_number.toString(),
    jerseySize: player.jersey_size,
    photoUrl: player.photo_url || "",
    rulesAccepted: true,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updatePlayer(player.id, formData)
      onClose()
    } catch {
      alert('Failed to update player')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-white font-bold text-xl">Edit Player Info</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Jersey No</label>
                  <input
                    type="number"
                    value={formData.jerseyNumber}
                    onChange={(e) => setFormData({...formData, jerseyNumber: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Mobile</label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Batsman</option>
                  <option>Bowler</option>
                  <option>All Rounder</option>
                  <option>Wicket Keeper</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Batting</label>
                  <select
                    value={formData.battingStyle}
                    onChange={(e) => setFormData({...formData, battingStyle: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Right Hand</option>
                    <option>Left Hand</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Bowling</label>
                  <select
                    value={formData.bowlingStyle}
                    onChange={(e) => setFormData({...formData, bowlingStyle: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>None</option>
                    <option>Right Arm Fast</option>
                    <option>Left Arm Fast</option>
                    <option>Right Arm Spin</option>
                    <option>Left Arm Spin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Jersey Size</label>
                <select
                  value={formData.jerseySize}
                  onChange={(e) => setFormData({...formData, jerseySize: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>XXL</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
