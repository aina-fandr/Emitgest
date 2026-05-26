import { GraduationCap, ShieldCheck, BookOpen, Globe, LayoutDashboard, GraduationCap as GradIcon, Send } from 'lucide-react'

export default function Home({ onNavigate }) {
  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "radial-gradient(circle at center, #2e3c85 0%, #1a1f3d 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      padding: "24px"
    }}>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <GraduationCap className="w-12 h-12 text-blue-400" />
          <h1 className="text-5xl font-bold tracking-tight">EmitGest</h1>
        </div>
        <h2 className="text-xl font-light text-blue-100 opacity-90">Système de Gestion des Salles et Emplois du Temps</h2>
        <p className="text-sm text-blue-200/60 mt-2">Choisissez votre espace pour accéder aux services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        
        {/* Espace Scolarité - VA VERS LOGIN */}
        <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
            <ShieldCheck className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Espace Scolarité</h3>
          <p className="text-blue-100/60 text-sm leading-relaxed mb-8 flex-grow">
            Gestion complète des salles, emplois du temps, demandes et professeurs.
          </p>
          <button 
            onClick={() => onNavigate('loginsco')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" /> Accéder
          </button>
        </div>

        {/* Espace Professeur */}
        <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 border border-indigo-500/20">
            <BookOpen className="w-7 h-7 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Espace Professeur</h3>
          <p className="text-blue-100/60 text-sm leading-relaxed mb-8 flex-grow">
            Créez votre compte, soumettez vos disponibilités et contraintes.
          </p>
          <button 
            onClick={() => onNavigate('loginprof')}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <GradIcon className="w-4 h-4" /> Accéder
          </button>
        </div>

        {/* Espace Public */}
        <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
            <Globe className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Espace Public</h3>
          <p className="text-blue-100/60 text-sm leading-relaxed mb-8 flex-grow">
            Demande de réservation de salle pour associations et clubs.
          </p>
          <button 
            onClick={() => onNavigate('public')}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" /> Faire une demande
          </button>
        </div>

      </div>

      <footer className="mt-16 text-blue-200/30 text-xs tracking-widest uppercase">
        © 2026 UniGest - Université
      </footer>

      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}