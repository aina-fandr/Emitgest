
import { Building, Calendar, Clipboard, GraduationCap, ListChecks, Users } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { icon: Building, value: '24', label: 'Salles disponibles', color: 'bg-blue-50 text-blue-600' },
    { icon: Calendar, value: '156', label: 'Cours programmés', color: 'bg-emerald-50 text-emerald-600' },
    { icon: Clipboard, value: '8', label: 'Demandes en attente', color: 'bg-orange-50 text-orange-600' },
    { icon: GraduationCap, value: '42', label: 'Professeurs vérifiés', color: 'bg-indigo-50 text-indigo-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Tableau de bord</h2>
        <p className="text-slate-500 text-sm">Vue d'ensemble de la gestion universitaire</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <ListChecks className="text-blue-600 w-5 h-5" />
          <h3 className="font-bold text-slate-800">Demandes récentes</h3>
        </div>
        <div className="divide-y divide-slate-50 p-2">
          <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg"><Users className="w-4 h-4 text-slate-500" /></div>
              <div><p className="text-sm font-semibold">Club Informatique</p><p className="text-[11px] text-slate-400">Hackathon - 2026-05-15</p></div>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 bg-orange-100 text-orange-600 rounded-full">En attente</span>
          </div>
        </div>
      </div>
    </div>
  )
}
