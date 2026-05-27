import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Loginsco from './pages/scolarite/Loginsco'
import ScolariteApp from './pages/scolarite/ScolariteApp'
import Loginprof from './pages/professeur/Loginprof'
import ProfesseurApp from './pages/professeur/ProfesseurApp'
import PublicApp from './pages/public/PublicApp'

function App() {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('currentView') || 'home'
  })
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'administration'
  })

  useEffect(() => {
    localStorage.setItem('currentView', currentView)
  }, [currentView])

  useEffect(() => {
    localStorage.setItem('userRole', userRole)
  }, [userRole])

  // Retour à l'accueil (depuis Home ou Public)
  const goHome = () => {
    localStorage.removeItem('currentView')
    localStorage.removeItem('userRole')
    setCurrentView('home')
    setUserRole('administration')
  }

  // Déconnexion Scolarité → retour au login
  const logoutSco = () => {
    localStorage.removeItem('currentView')
    localStorage.removeItem('userRole')
    setCurrentView('loginsco')
    setUserRole('administration')
  }

  // Déconnexion Professeur → retour au login prof
  const logoutProf = () => {
    localStorage.removeItem('currentView')
    localStorage.removeItem('userRole')
    setCurrentView('loginprof')
  }

  const handleScoLogin = (role) => {
    setUserRole(role)
    setCurrentView('scolarite')
  }

  switch (currentView) {
    case 'home':
      return <Home onNavigate={(page) => setCurrentView(page)} />

    case 'loginsco':
      return <Loginsco onBack={goHome} onLogin={handleScoLogin} />

    case 'scolarite':
      return <ScolariteApp onBack={logoutSco} role={userRole} />

    case 'loginprof':
      return <Loginprof onBack={goHome} onLogin={() => setCurrentView('professeurapp')} />

    case 'professeurapp':
      return <ProfesseurApp onBack={logoutProf} />

    case 'public':
      return <PublicApp onBack={goHome} />

    default:
      return <Home onNavigate={(page) => setCurrentView(page)} />
  }
}

export default App
