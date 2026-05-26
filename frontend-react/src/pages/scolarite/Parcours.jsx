import { useState } from 'react'
import { Plus, Search, Edit3, Trash2, X, GraduationCap, Building, Phone, Mail, Hash } from 'lucide-react'

export default function Parcours() {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [parcours, setParcours] = useState([
    {
      id: 1,
      mention: 'Informatique',
      parcours: 'Génie Logiciel',
      niveau: 'L3',
      delegue: 'Rakoto Jean',
      whatsapp: '+261 34 12 345 67',
      mail: 'rakoto.jean@unigest.mg',
      salle: 'Salle C101'
    },
    {
      id: 2,
      mention: 'Mathématiques',
      parcours: 'Maths Appliquées',
      niveau: 'M1',
      delegue: 'Rabe Marie',
      whatsapp: '+261 33 98 765 43',
      mail: 'rabe.marie@unigest.mg',
      salle: 'Salle B202'
    },
    {
      id: 3,
      mention: 'Physique',
      parcours: 'Physique Nucléaire',
      niveau: 'L2',
      delegue: 'Randria Paul',
      whatsapp: '+261 32 11 222 33',
      mail: 'randria.paul@unigest.mg',
      salle: 'Labo D'
    },
  ])

  // États du formulaire
  const [form, setForm] = useState({
    mention: '',
    parcours: '',
    niveau: '',
    delegue: '',
    whatsapp: '',
    mail: '',
    salle: ''
  })

  const niveaux = ['L1', 'L2', 'L3', 'M1', 'M2', 'Doctorat']

  // Filtrer les parcours
  const filteredParcours = parcours.filter(p =>
    p.mention.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.parcours.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.niveau.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.delegue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.salle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const newParcours = {
      id: Date.now(),
      ...form
    }
    setParcours([...parcours, newParcours])
    setForm({ mention: '', parcours: '', niveau: '', delegue: '', whatsapp: '', mail: '', salle: '' })
    setShowModal(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce parcours ?')) {
      setParcours(parcours.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestion des Parcours</h2>
          <p className="text-slate-500 text-sm">Gérez les parcours, mentions et délégués</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-100 transition-all"
        >
          <Plus className="w-4 h-4" /> Ajouter un parcours
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher par mention, parcours, niveau, délégué ou salle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-4 gap-4">
        {niveaux.slice(0, 4).map(niveau => (
          <div key={niveau} className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500">{niveau}</p>
            <p className="text-2xl font-bold text-slate-800">
              {parcours.filter(p => p.niveau === niveau).length}
            </p>
            <p className="text-[10px] text-slate-400">parcours</p>
          </div>
        ))}
      </div>

      {/* Liste des parcours */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParcours.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all space-y-4">
            {/* En-tête carte */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <GraduationCap className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{p.parcours}</h4>
                  <p className="text-xs text-blue-600 font-medium">{p.mention}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full uppercase">
                {p.niveau}
              </span>
            </div>

            {/* Info délégué */}
            <div className="bg-slate-50 rounded-xl p-3 space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Délégué</p>
              <p className="text-sm font-semibold text-slate-700">{p.delegue}</p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Phone className="w-3 h-3" />
                <span>{p.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Mail className="w-3 h-3" />
                <span>{p.mail}</span>
              </div>
            </div>

            {/* Salle */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Building className="w-3 h-3" />
              <span>{p.salle}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2 border-t border-slate-50">
              <button className="flex-1 py-2 text-[11px] font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1 transition-colors">
                <Edit3 className="w-3 h-3" /> Modifier
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 py-2 text-[11px] font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredParcours.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Aucun parcours trouvé</p>
        </div>
      )}

      {/* Modal Ajouter */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Ajouter un parcours</h3>
                <p className="text-sm text-slate-500">Remplissez les informations du parcours</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Mention et Parcours */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mention</label>
                  <input
                    type="text"
                    required
                    value={form.mention}
                    onChange={(e) => setForm({ ...form, mention: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: Informatique"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Parcours</label>
                  <input
                    type="text"
                    required
                    value={form.parcours}
                    onChange={(e) => setForm({ ...form, parcours: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: Génie Logiciel"
                  />
                </div>
              </div>

              {/* Niveau et Salle */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Niveau</label>
                  <select
                    required
                    value={form.niveau}
                    onChange={(e) => setForm({ ...form, niveau: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">Sélectionner un niveau</option>
                    {niveaux.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Salle attribuée</label>
                  <input
                    type="text"
                    required
                    value={form.salle}
                    onChange={(e) => setForm({ ...form, salle: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: Salle C101"
                  />
                </div>
              </div>

              {/* Section Délégué */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase">Informations du Délégué</p>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={form.delegue}
                    onChange={(e) => setForm({ ...form, delegue: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: Rakoto Jean"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> WhatsApp</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="+261 34 XX XXX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.mail}
                      onChange={(e) => setForm({ ...form, mail: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="prenom.nom@unigest.mg"
                    />
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                >
                  Ajouter le parcours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}