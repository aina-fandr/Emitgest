import { useState } from 'react'
import { GraduationCap, LayoutDashboard, DoorOpen, Calendar, ClipboardList, Users, ArrowLeft, LogOut, GitBranch } from 'lucide-react'
import Dashboard from './Dashboard'
import Parcours from './Parcours'
import Rooms from './Rooms'
import Schedule from './Schedule'
import Requests from './Requests'
import Professors from './Professors'

export default function ScolariteApp({ onBack }) {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'parcours', label: 'Gestion des parcours et mentions', icon: GitBranch },
    { id: 'rooms', label: 'Gestion des salles', icon: DoorOpen },
    { id: 'schedule', label: 'Emploi du temps', icon: Calendar },
    { id: 'requests', label: 'Demandes', icon: ClipboardList },
    { id: 'professors', label: 'Professeurs', icon: Users },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />
      case 'parcours': return <Parcours />
      case 'rooms': return <Rooms />
      case 'schedule': return <Schedule />
      case 'requests': return <Requests />
      case 'professors': return <Professors />
      default: return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="text-blue-600 w-6 h-6" />
            <h1 className="text-xl font-bold text-slate-800">EmitGest</h1>
          </div>
          <p className="text-[10px] font-bold text-blue-500 tracking-widest uppercase">Espace Scolarité</p>
        </div>
        <nav className="flex-1 py-6 space-y-1">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Accueil
          </button>
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-500 hover:text-red-600 transition-colors">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{renderPage()}</main>
    </div>
  )
}