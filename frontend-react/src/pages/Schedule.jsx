
import { Wand2 } from 'lucide-react'

export default function Schedule() {
  const schedule = [
    { time: '08:00', courses: [{ day: 0, name: 'Mathématiques', teacher: 'Dr. Martin', room: 'Salle A101', group: 'L1-G1', color: 'blue' }]},
    { time: '10:00', courses: [
      { day: 1, name: 'Physique', teacher: 'Pr. Dubois', room: 'Salle B202', group: 'L1-G2', color: 'green' },
      { day: 4, name: 'Informatique', teacher: 'Dr. Chen', room: 'Salle C303', group: 'L2-G1', color: 'purple' }
    ]},
    { time: '14:00', courses: [
      { day: 0, name: 'Chimie', teacher: 'Pr. Laurent', room: 'Labo D', group: 'L1-G1', color: 'orange' },
      { day: 2, name: 'Anglais', teacher: 'Mme. Smith', room: 'Salle A105', group: 'L1-G2', color: 'pink' }
    ]},
  ]

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    green: 'bg-green-50 border-green-100 text-green-700',
    purple: 'bg-purple-50 border-purple-100 text-purple-700',
    orange: 'bg-orange-50 border-orange-100 text-orange-700',
    pink: 'bg-pink-50 border-pink-100 text-pink-700',
  }
  const getCourse = (courses, day) => courses.find(c => c.day === day)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Emploi du Temps</h2>
          <p className="text-slate-500 text-sm">Visualisation et génération automatique</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-lg">
          <Wand2 className="w-4 h-4" /> Générer auto
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-left text-xs font-semibold text-slate-400">Heure</th>
              {days.map(day => <th key={day} className="p-4 text-center text-xs font-semibold text-slate-400">{day}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {schedule.map((row, i) => (
              <tr key={i}>
                <td className="p-6 text-sm font-medium text-slate-500">{row.time}</td>
                {[0,1,2,3,4].map(day => {
                  const course = getCourse(row.courses, day)
                  return (
                    <td key={day} className="p-2">
                      {course ? (
                        <div className={`border p-3 rounded-xl ${colorClasses[course.color]}`}>
                          <p className="text-[10px] font-bold">{course.name}</p>
                          <p className="text-[9px] opacity-75">{course.teacher} | {course.room}</p>
                          <span className="inline-block mt-2 px-1.5 py-0.5 bg-white text-[8px] font-bold border rounded uppercase">{course.group}</span>
                        </div>
                      ) : <p className="text-center text-slate-300">—</p>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
