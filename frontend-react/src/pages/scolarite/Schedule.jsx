import { useState } from 'react'
import { Wand2, Search, ChevronDown, GraduationCap, Hash } from 'lucide-react'

export default function Schedule() {
  // Données des mentions, niveaux et parcours
  const mentions = [
    {
      id: 1,
      nom: 'Informatique',
      niveaux: [
        {
          id: 1,
          nom: 'L1',
          groupes: [
            { id: 1, nom: 'Groupe 1', code: 'L1-G1' },
            { id: 2, nom: 'Groupe 2', code: 'L1-G2' },
          ]
        },
        {
          id: 2,
          nom: 'L2',
          groupes: [
            { id: 3, nom: 'Groupe 1', code: 'L2-G1' },
            { id: 4, nom: 'Groupe 2', code: 'L2-G2' },
          ]
        },
        {
          id: 3,
          nom: 'L3',
          groupes: [
            { id: 5, nom: 'Groupe 1', code: 'L3-G1' },
          ]
        },
      ]
    },
    {
      id: 2,
      nom: 'Mathématiques',
      niveaux: [
        {
          id: 4,
          nom: 'L1',
          groupes: [
            { id: 6, nom: 'Groupe 1', code: 'L1-G1' },
          ]
        },
        {
          id: 5,
          nom: 'M1',
          groupes: [
            { id: 7, nom: 'Groupe 1', code: 'M1-G1' },
          ]
        },
      ]
    },
    {
      id: 3,
      nom: 'Physique',
      niveaux: [
        {
          id: 6,
          nom: 'L2',
          groupes: [
            { id: 8, nom: 'Groupe 1', code: 'L2-G1' },
          ]
        },
      ]
    },
    {
      id: 4,
      nom: 'Chimie',
      niveaux: [
        {
          id: 7,
          nom: 'L1',
          groupes: [
            { id: 9, nom: 'Groupe 1', code: 'L1-G1' },
          ]
        },
      ]
    },
  ]

  // Emplois du temps par groupe
  const [schedules, setSchedules] = useState({
    'L1-G1': {
      mention: 'Informatique',
      niveau: 'L1',
      groupe: 'Groupe 1',
      cours: [
        { time: '08:00', courses: [{ day: 0, name: 'Mathématiques', teacher: 'Dr. Martin', room: 'Salle A101', color: 'blue' }] },
        { time: '10:00', courses: [{ day: 1, name: 'Physique', teacher: 'Pr. Dubois', room: 'Salle B202', color: 'green' }, { day: 4, name: 'Informatique', teacher: 'Dr. Chen', room: 'Salle C303', color: 'purple' }] },
        { time: '14:00', courses: [{ day: 0, name: 'Chimie', teacher: 'Pr. Laurent', room: 'Labo D', color: 'orange' }] },
      ]
    },
    'L1-G2': {
      mention: 'Informatique',
      niveau: 'L1',
      groupe: 'Groupe 2',
      cours: [
        { time: '08:00', courses: [{ day: 2, name: 'Algorithmique', teacher: 'Dr. Chen', room: 'Salle C101', color: 'purple' }] },
        { time: '10:00', courses: [{ day: 0, name: 'Réseaux', teacher: 'Pr. Martin', room: 'Salle A102', color: 'blue' }] },
        { time: '14:00', courses: [{ day: 2, name: 'Anglais', teacher: 'Mme. Smith', room: 'Salle A105', color: 'pink' }, { day: 3, name: 'Base de données', teacher: 'Dr. Lee', room: 'Salle C301', color: 'green' }] },
      ]
    },
    'L2-G1': {
      mention: 'Informatique',
      niveau: 'L2',
      groupe: 'Groupe 1',
      cours: [
        { time: '08:00', courses: [{ day: 1, name: 'Java', teacher: 'Dr. Chen', room: 'Salle C303', color: 'purple' }] },
        { time: '10:00', courses: [{ day: 3, name: 'Systèmes', teacher: 'Pr. Dubois', room: 'Salle B202', color: 'green' }] },
        { time: '14:00', courses: [{ day: 0, name: 'Projet', teacher: 'Dr. Martin', room: 'Salle A101', color: 'blue' }, { day: 4, name: 'Web', teacher: 'Mme. Smith', room: 'Salle A105', color: 'pink' }] },
      ]
    },
    'M1-G1': {
      mention: 'Mathématiques',
      niveau: 'M1',
      groupe: 'Groupe 1',
      cours: [
        { time: '08:00', courses: [{ day: 0, name: 'Analyse', teacher: 'Dr. Martin', room: 'Salle A101', color: 'blue' }] },
        { time: '10:00', courses: [{ day: 2, name: 'Algèbre', teacher: 'Pr. Laurent', room: 'Labo D', color: 'orange' }] },
        { time: '14:00', courses: [{ day: 1, name: 'Statistiques', teacher: 'Pr. Dubois', room: 'Salle B202', color: 'green' }] },
      ]
    },
    'L2-G1-Math': {
      mention: 'Mathématiques',
      niveau: 'L2',
      groupe: 'Groupe 1',
      cours: [
        { time: '08:00', courses: [{ day: 3, name: 'Géométrie', teacher: 'Pr. Laurent', room: 'Labo D', color: 'orange' }] },
        { time: '10:00', courses: [{ day: 1, name: 'Probabilités', teacher: 'Dr. Martin', room: 'Salle A101', color: 'blue' }] },
        { time: '14:00', courses: [{ day: 2, name: 'Anglais', teacher: 'Mme. Smith', room: 'Salle A105', color: 'pink' }] },
      ]
    },
  })

  // États de sélection
  const [selectedMention, setSelectedMention] = useState('')
  const [selectedNiveau, setSelectedNiveau] = useState('')
  const [selectedGroupe, setSelectedGroupe] = useState('')
  const [currentSchedule, setCurrentSchedule] = useState(null)
  const [searchGroup, setSearchGroup] = useState('')

  // Récupérer les niveaux de la mention sélectionnée
  const availableNiveaux = selectedMention
    ? mentions.find(m => m.id === parseInt(selectedMention))?.niveaux || []
    : []

  // Récupérer les groupes du niveau sélectionné
  const availableGroupes = selectedMention && selectedNiveau
    ? mentions
        .find(m => m.id === parseInt(selectedMention))
        ?.niveaux.find(n => n.id === parseInt(selectedNiveau))
        ?.groupes || []
    : []

  // Toutes les classes disponibles pour la recherche
  const allGroups = Object.entries(schedules).map(([code, data]) => ({
    code,
    mention: data.mention,
    niveau: data.niveau,
    groupe: data.groupe,
  }))

  const filteredGroups = allGroups.filter(g =>
    g.mention.toLowerCase().includes(searchGroup.toLowerCase()) ||
    g.code.toLowerCase().includes(searchGroup.toLowerCase()) ||
    g.niveau.toLowerCase().includes(searchGroup.toLowerCase())
  )

  const handleSelectGroupe = (code) => {
    if (schedules[code]) {
      setCurrentSchedule({ code, ...schedules[code] })
    }
  }

  const handleSubmitSelection = () => {
    if (selectedMention && selectedNiveau && selectedGroupe) {
      const groupe = availableGroupes.find(g => g.id === parseInt(selectedGroupe))
      if (groupe && schedules[groupe.code]) {
        setCurrentSchedule({ code: groupe.code, ...schedules[groupe.code] })
      }
    }
  }

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100',
    green: 'bg-green-50 border-green-100',
    purple: 'bg-purple-50 border-purple-100',
    orange: 'bg-orange-50 border-orange-100',
    pink: 'bg-pink-50 border-pink-100',
  }
  const textColorClasses = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    purple: 'text-purple-700',
    orange: 'text-orange-700',
    pink: 'text-pink-700',
  }
  const subTextColorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    pink: 'text-pink-500',
  }
  const borderColorClasses = {
    blue: 'border-blue-200',
    green: 'border-green-200',
    purple: 'border-purple-200',
    orange: 'border-orange-200',
    pink: 'border-pink-200',
  }

  const getCourse = (courses, day) => courses?.find(c => c.day === day)

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Emploi du Temps</h2>
          <p className="text-slate-500 text-sm">Visualisation et génération automatique par classe</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg">
          <Wand2 className="w-4 h-4" /> Générer auto
        </button>
      </div>

      {/* Sélection de la classe */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Sélectionner une classe
        </h3>

        {/* Sélecteurs Mention → Niveau → Groupe */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mention */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Mention</label>
            <select
              value={selectedMention}
              onChange={(e) => {
                setSelectedMention(e.target.value)
                setSelectedNiveau('')
                setSelectedGroupe('')
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Choisir une mention</option>
              {mentions.map(m => (
                <option key={m.id} value={m.id}>{m.nom}</option>
              ))}
            </select>
          </div>

          {/* Niveau */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Niveau</label>
            <select
              value={selectedNiveau}
              onChange={(e) => {
                setSelectedNiveau(e.target.value)
                setSelectedGroupe('')
              }}
              disabled={!selectedMention}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
            >
              <option value="">Choisir un niveau</option>
              {availableNiveaux.map(n => (
                <option key={n.id} value={n.id}>{n.nom}</option>
              ))}
            </select>
          </div>

          {/* Groupe */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Groupe</label>
            <select
              value={selectedGroupe}
              onChange={(e) => setSelectedGroupe(e.target.value)}
              disabled={!selectedNiveau}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
            >
              <option value="">Choisir un groupe</option>
              {availableGroupes.map(g => (
                <option key={g.id} value={g.id}>{g.nom} ({g.code})</option>
              ))}
            </select>
          </div>

          {/* Bouton Afficher */}
          <div className="flex items-end">
            <button
              onClick={handleSubmitSelection}
              disabled={!selectedMention || !selectedNiveau || !selectedGroupe}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium text-sm transition-colors"
            >
              Afficher l'emploi
            </button>
          </div>
        </div>

        {/* OU Recherche rapide */}
        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Ou rechercher une classe</p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par code (ex: L1-G1) ou mention..."
              value={searchGroup}
              onChange={(e) => setSearchGroup(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          
          {/* Résultats recherche */}
          {searchGroup && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
              {filteredGroups.map(g => (
                <button
                  key={g.code}
                  onClick={() => handleSelectGroupe(g.code)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    currentSchedule?.code === g.code
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-slate-200 hover:border-blue-200'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800">{g.mention}</p>
                  <p className="text-[10px] text-slate-500">{g.niveau} - {g.groupe}</p>
                  <p className="text-[10px] text-blue-500 font-bold mt-1">{g.code}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Emploi du temps affiché */}
      {currentSchedule ? (
        <div>
          {/* Info de la classe */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-800">{currentSchedule.mention}</p>
              <p className="text-sm text-slate-600">
                {currentSchedule.niveau} - {currentSchedule.groupe}{' '}
                <span className="text-blue-600 font-bold ml-2">[{currentSchedule.code}]</span>
              </p>
            </div>
            <button
              onClick={() => setCurrentSchedule(null)}
              className="ml-auto text-xs text-slate-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>

          {/* Tableau emploi du temps */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-slate-400">Heure</th>
                  {days.map(day => (
                    <th key={day} className="p-4 text-center text-xs font-semibold text-slate-400">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentSchedule.cours?.map((row, i) => (
                  <tr key={i}>
                    <td className="p-6 text-sm font-medium text-slate-500">{row.time}</td>
                    {[0, 1, 2, 3, 4].map(day => {
                      const course = getCourse(row.courses, day)
                      return (
                        <td key={day} className="p-2">
                          {course ? (
                            <div className={`border p-3 rounded-xl ${colorClasses[course.color]}`}>
                              <p className={`text-[10px] font-bold ${textColorClasses[course.color]}`}>{course.name}</p>
                              <p className={`text-[9px] ${subTextColorClasses[course.color]}`}>{course.teacher} | {course.room}</p>
                            </div>
                          ) : (
                            <p className="text-center text-slate-300 text-xs">—</p>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Message si aucune classe sélectionnée */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <GraduationCap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-500 mb-2">Aucune classe sélectionnée</h3>
          <p className="text-sm text-slate-400">
            Veuillez sélectionner une mention, un niveau et un groupe ci-dessus pour afficher l'emploi du temps.
          </p>
        </div>
      )}
    </div>
  )
}