import { useState } from 'react'
import { GraduationCap, LayoutDashboard, DoorOpen, Calendar, ClipboardList, Users, ArrowLeft, LogOut, GitBranch, ShieldCheck, UserCog, Eye } from 'lucide-react'
import Dashboard from './Dashboard'
import Parcours from './Parcours'
import Rooms from './Rooms'
import Schedule from './Schedule'
import Requests from './Requests'
import Professors from './Professors'

export default function ScolariteApp({ onBack, role = 'administration' }) {
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Menus complets pour l'Administration
  const adminMenuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'parcours', label: 'Gestion des parcours', icon: GitBranch },
    { id: 'rooms', label: 'Gestion des salles', icon: DoorOpen },
    { id: 'schedule', label: 'Emploi du temps', icon: Calendar },
    { id: 'requests', label: 'Demandes', icon: ClipboardList },
    { id: 'professors', label: 'Professeurs', icon: Users },
  ]

  // Menus restreints pour Sécimpla (Emploi du temps en lecture seule + Demandes)
  const secimplaMenuItems = [
    { id: 'schedule', label: 'Emploi du temps', icon: Eye, badge: 'Consultation' },
    { id: 'requests', label: 'Demandes de salle', icon: ClipboardList, badge: 'Validation' },
  ]

  const menuItems = role === 'secimpla' ? secimplaMenuItems : adminMenuItems

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': 
        return role === 'secimpla' ? <SecimplaHome /> : <Dashboard />
      case 'parcours': 
        return role === 'secimpla' ? <Unauthorized /> : <Parcours />
      case 'rooms': 
        return role === 'secimpla' ? <Unauthorized /> : <Rooms />
      case 'schedule': 
        return <Schedule readOnly={role === 'secimpla'} />
      case 'requests': 
        return <Requests readOnly={false} role={role} />
      case 'professors': 
        return role === 'secimpla' ? <Unauthorized /> : <Professors />
      default: 
        return role === 'secimpla' ? <Schedule readOnly={true} /> : <Dashboard />
    }
  }

  const roleConfig = {
    administration: {
      color: 'blue',
      icon: ShieldCheck,
      label: 'Administration',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-200',
    },
    secimpla: {
      color: 'indigo',
      icon: UserCog,
      label: 'Sécimpla',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-500',
      borderColor: 'border-indigo-200',
    },
  }

  const config = roleConfig[role] || roleConfig.administration

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        {/* En-tête sidebar */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className={`text-${config.color}-600 w-6 h-6`} />
            <h1 className="text-xl font-bold text-slate-800">EmitGest</h1>
          </div>
          <div className={`flex items-center gap-2 mt-2 px-2 py-1 ${config.bgColor} rounded-lg`}>
            <config.icon className={`w-4 h-4 ${config.textColor}`} />
            <p className={`text-[10px] font-bold ${config.textColor} tracking-widest uppercase`}>
              Espace {config.label}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? `bg-${config.color}-50 text-${config.color}-600 border-r-4 border-${config.color}-600`
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${config.bgColor} ${config.textColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Pied sidebar */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-500 hover:text-slate-800 transition-colors rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </button>
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-500 hover:text-red-600 transition-colors rounded-lg"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {renderPage()}
      </main>
    </div>
  )
}

// Composant page d'accueil Sécimpla
function SecimplaHome() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Bienvenue, Sécimpla</h2>
        <p className="text-slate-600">Vous avez accès à la consultation des emplois du temps et à la validation des demandes de salle.</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <Eye className="text-indigo-500 w-8 h-8" />
            <div>
              <p className="font-bold text-slate-800">Emploi du temps</p>
              <p className="text-xs text-slate-500">Consultation seule</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <ClipboardList className="text-indigo-500 w-8 h-8" />
            <div>
              <p className="font-bold text-slate-800">Demandes</p>
              <p className="text-xs text-slate-500">Validation des réservations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant pour les pages non autorisées
function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <ShieldCheck className="w-10 h-10 text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Accès non autorisé</h2>
      <p className="text-slate-500 text-sm max-w-md">
        Votre rôle Sécimpla ne vous permet pas d'accéder à cette section. 
        Veuillez contacter un administrateur si nécessaire.
      </p>
    </div>
  )
}