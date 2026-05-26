import { useState } from 'react'
import { Search, CheckCircle, XCircle, Mail, Phone, Building, FileText, List, Grid3X3, Bell, Clock } from 'lucide-react'

export default function Professors() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [notification, setNotification] = useState(null)

  const [professors, setProfessors] = useState([
    { id: 1, nom: 'Martin', prenom: 'Pierre', email: 'pierre.martin@unigest.mg', telephone: '+261 34 11 222 33', specialite: 'Mathématiques', departement: 'Sciences', statut: 'approved', dateInscription: '2026-01-15', fichierVerification: 'carte_martin.pdf' },
    { id: 2, nom: 'Dubois', prenom: 'Sophie', email: 'sophie.dubois@unigest.mg', telephone: '+261 33 44 555 66', specialite: 'Physique', departement: 'Sciences', statut: 'pending', dateInscription: '2026-03-20', fichierVerification: 'passeport_dubois.jpg' },
    { id: 3, nom: 'Chen', prenom: 'Li', email: 'li.chen@unigest.mg', telephone: '+261 32 77 888 99', specialite: 'Informatique', departement: 'Technologie', statut: 'approved', dateInscription: '2025-11-10', fichierVerification: 'carte_chen.pdf' },
    { id: 4, nom: 'Laurent', prenom: 'Marc', email: 'marc.laurent@unigest.mg', telephone: '+261 34 00 111 22', specialite: 'Chimie', departement: 'Sciences', statut: 'rejected', dateInscription: '2026-02-05', fichierVerification: 'cin_laurent.jpg' },
    { id: 5, nom: 'Smith', prenom: 'Emma', email: 'emma.smith@unigest.mg', telephone: '+261 33 99 000 11', specialite: 'Anglais', departement: 'Langues', statut: 'pending', dateInscription: '2026-05-01', fichierVerification: 'passeport_smith.pdf' },
  ])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleApprove = (id) => {
    setProfessors(professors.map(p => p.id === id ? { ...p, statut: 'approved' } : p))
    showNotification('Professeur approuve avec succes', 'success')
  }

  const handleReject = (id) => {
    setProfessors(professors.map(p => p.id === id ? { ...p, statut: 'rejected' } : p))
    showNotification('Professeur rejete', 'error')
  }

  const filtered = professors.filter(p => {
    const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || p.prenom.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase()) || p.specialite.toLowerCase().includes(searchTerm.toLowerCase())
    return filterStatus === 'all' ? matchesSearch : matchesSearch && p.statut === filterStatus
  })

  const stats = { total: professors.length, approved: professors.filter(p => p.statut === 'approved').length, pending: professors.filter(p => p.statut === 'pending').length, rejected: professors.filter(p => p.statut === 'rejected').length }

  const getStatusBadge = (statut) => {
    if (statut === 'approved') return { text: 'Approuve', bg: 'bg-emerald-100', txt: 'text-emerald-600' }
    if (statut === 'pending') return { text: 'En attente', bg: 'bg-orange-100', txt: 'text-orange-600' }
    return { text: 'Rejete', bg: 'bg-red-100', txt: 'text-red-600' }
  }

  return (
    <div className="space-y-8">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 text-white ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
          <Bell className="w-4 h-4" /><span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Professeurs</h2>
        <p className="text-slate-500 text-sm">Gerez les professeurs et les verifications</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[{ label: 'Total', value: stats.total, color: 'text-slate-600' }, { label: 'Approuves', value: stats.approved, color: 'text-emerald-600' }, { label: 'En attente', value: stats.pending, color: 'text-orange-600' }, { label: 'Rejetes', value: stats.rejected, color: 'text-red-600' }].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input type="text" placeholder="Rechercher un professeur..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
        </div>
        <div className="flex gap-2">
          {[{ value: 'all', label: 'Tous' }, { value: 'approved', label: 'Approuves' }, { value: 'pending', label: 'En attente' }, { value: 'rejected', label: 'Rejetes' }].map(f => (
            <button key={f.value} onClick={() => setFilterStatus(f.value)} className={`px-4 py-2 rounded-lg text-xs font-bold ${filterStatus === f.value ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>{f.label}</button>
          ))}
        </div>
        <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}><Grid3X3 className="w-4 h-4" /></button>
          <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}><List className="w-4 h-4" /></button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(prof => {
            const s = getStatusBadge(prof.statut)
            return (
              <div key={prof.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">{prof.prenom[0]}{prof.nom[0]}</div>
                    <div>
                      <h4 className="font-bold text-slate-800">{prof.prenom} {prof.nom}</h4>
                      <p className="text-xs text-slate-500">{prof.specialite}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${s.bg} ${s.txt}`}>{s.text}</span>
                </div>
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{prof.email}</div>
                  <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{prof.telephone}</div>
                  <div className="flex items-center gap-2"><Building className="w-3 h-3" />{prof.departement}</div>
                  <div className="flex items-center gap-2"><Clock className="w-3 h-3" />{prof.dateInscription}</div>
                </div>
                <button onClick={() => alert(prof.fichierVerification)} className="w-full flex items-center justify-center gap-2 py-2 text-[11px] font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                  <FileText className="w-3 h-3" /> Voir piece
                </button>
                {prof.statut === 'pending' ? (
                  <div className="flex gap-2 pt-2 border-t border-slate-50">
                    <button onClick={() => handleApprove(prof.id)} className="flex-1 py-2 text-[11px] font-bold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-1"><CheckCircle className="w-3 h-3" /> Approuver</button>
                    <button onClick={() => handleReject(prof.id)} className="flex-1 py-2 text-[11px] font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center justify-center gap-1"><XCircle className="w-3 h-3" /> Rejeter</button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2 border-t border-slate-50">
                    <button onClick={() => handleApprove(prof.id)} className={`flex-1 py-2 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 ${prof.statut === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}><CheckCircle className="w-3 h-3" /> Approuver</button>
                    <button onClick={() => handleReject(prof.id)} className={`flex-1 py-2 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 ${prof.statut === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-slate-50 text-slate-500'}`}><XCircle className="w-3 h-3" /> Rejeter</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-slate-400">Professeur</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-400">Specialite</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-400">Contact</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-400">Statut</th>
                <th className="p-4 text-left text-xs font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(prof => {
                const s = getStatusBadge(prof.statut)
                return (
                  <tr key={prof.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">{prof.prenom[0]}{prof.nom[0]}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{prof.prenom} {prof.nom}</p>
                          <p className="text-[11px] text-slate-400">{prof.departement}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{prof.specialite}</td>
                    <td className="p-4">
                      <div className="text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-1"><Mail className="w-3 h-3" />{prof.email}</div>
                        <div className="flex items-center gap-1"><Phone className="w-3 h-3" />{prof.telephone}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${s.bg} ${s.txt}`}>{s.text}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {prof.statut === 'pending' ? (
                          <>
                            <button onClick={() => handleApprove(prof.id)} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"><CheckCircle className="w-4 h-4" /></button>
                            <button onClick={() => handleReject(prof.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><XCircle className="w-4 h-4" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleApprove(prof.id)} className={`p-2 rounded-lg ${prof.statut === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}><CheckCircle className="w-4 h-4" /></button>
                            <button onClick={() => handleReject(prof.id)} className={`p-2 rounded-lg ${prof.statut === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-slate-50 text-slate-400'}`}><XCircle className="w-4 h-4" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500">Aucun professeur trouve</p>
        </div>
      )}
    </div>
  )
}