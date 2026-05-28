import { useState, useEffect } from 'react'
import { Plus, Search, Edit3, Trash2, X, GraduationCap, Building, Phone, Check, AlertCircle } from 'lucide-react'
import { classesService } from '../../api/services/classesService'

export default function Parcours() {
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // États du formulaire
  const [form, setForm] = useState({
    parcours: '',
    mention: '',
    niveau: '',
    nomDelegue: '',
    numDelegue: '',
    salleClasse: ''
  })

  const niveaux = ['L1', 'L2', 'L3', 'M1', 'M2', 'Doctorat']

  useEffect(() => {
    loadClasses()
  }, [])

  const loadClasses = async () => {
    try {
      setLoading(true)
      const data = await classesService.getAll()
      setClasses(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Erreur lors du chargement des parcours')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Filtrer les parcours
  const filteredClasses = classes.filter(c =>
    c.mention.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.parcours.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.niveau.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nomDelegue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.salleClasse.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAddClass = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    
    try {
      await classesService.create(form)
      setSuccess('Parcours ajouté avec succès')
      setForm({ parcours: '', mention: '', niveau: '', nomDelegue: '', numDelegue: '', salleClasse: '' })
      setShowModal(false)
      await loadClasses()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Erreur lors de l\'ajout: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditClass = (classe) => {
    setForm(classe)
    setEditingId(classe.id)
    setShowModal(true)
  }

  const handleUpdateClass = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    
    try {
      await classesService.update(editingId, form)
      setSuccess('Parcours mis à jour avec succès')
      setForm({ parcours: '', mention: '', niveau: '', nomDelegue: '', numDelegue: '', salleClasse: '' })
      setEditingId(null)
      setShowModal(false)
      await loadClasses()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Erreur lors de la mise à jour: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteClass = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce parcours?')) return
    
    setError(null)
    try {
      await classesService.delete(id)
      setSuccess('Parcours supprimé avec succès')
      await loadClasses()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Erreur lors de la suppression: ' + err.message)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setForm({ parcours: '', mention: '', niveau: '', nomDelegue: '', numDelegue: '', salleClasse: '' })
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" /> {success}
        </div>
      )}

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
              {classes.filter(c => c.niveau === niveau).length}
            </p>
            <p className="text-[10px] text-slate-400">parcours</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-slate-500">Chargement des parcours...</p>
        </div>
      ) : (
        <>
          {/* Liste des parcours */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.length === 0 ? (
              <div className="col-span-3 text-center py-12 bg-white rounded-2xl border border-slate-200">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Aucun parcours trouvé</p>
              </div>
            ) : (
              filteredClasses.map(classe => (
                <div key={classe.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all space-y-4">
                  {/* En-tête carte */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <GraduationCap className="text-blue-600 w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{classe.parcours}</h4>
                        <p className="text-xs text-blue-600 font-medium">{classe.mention}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full uppercase">
                      {classe.niveau}
                    </span>
                  </div>

                  {/* Info délégué */}
                  <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Délégué</p>
                    <p className="text-sm font-semibold text-slate-700">{classe.nomDelegue}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Phone className="w-3 h-3" />
                      <span>{classe.numDelegue}</span>
                    </div>
                  </div>

                  {/* Salle */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Building className="w-3 h-3" />
                    <span>{classe.salleClasse}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-slate-50">
                    <button 
                      onClick={() => handleEditClass(classe)}
                      className="flex-1 py-2 text-[11px] font-bold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" /> Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteClass(classe.id)}
                      className="flex-1 py-2 text-[11px] font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Supprimer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Modal Ajouter/Modifier */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {editingId ? 'Modifier le parcours' : 'Ajouter un parcours'}
                </h3>
                <p className="text-sm text-slate-500">Remplissez les informations du parcours</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateClass : handleAddClass} className="space-y-5">
              {/* Mention et Parcours */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mention</label>
                  <input
                    type="text"
                    name="mention"
                    required
                    value={form.mention}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: Informatique"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Parcours</label>
                  <input
                    type="text"
                    name="parcours"
                    required
                    value={form.parcours}
                    onChange={handleInputChange}
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
                    name="niveau"
                    required
                    value={form.niveau}
                    onChange={handleInputChange}
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
                    name="salleClasse"
                    required
                    value={form.salleClasse}
                    onChange={handleInputChange}
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
                    name="nomDelegue"
                    required
                    value={form.nomDelegue}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: Rakoto Jean"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Numéro de téléphone</span>
                  </label>
                  <input
                    type="text"
                    name="numDelegue"
                    required
                    value={form.numDelegue}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="+261 34 XX XXX XX"
                  />
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-slate-400 transition-colors shadow-lg shadow-blue-100"
                >
                  {submitting ? 'En cours...' : (editingId ? 'Mettre à jour' : 'Ajouter le parcours')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}