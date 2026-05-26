import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Loginsco from './pages/scolarite/Loginsco'
import ScolariteApp from './pages/scolarite/ScolariteApp'
import Loginprof from './pages/professeur/Loginprof'
import ProfesseurApp from './pages/professeur/ProfesseurApp'
import PublicApp from './pages/public/PublicApp'

function App() {
  // 1. On initialise le state avec la valeur stockée dans localStorage, 
  //    sinon on met 'home' par défaut.
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('emigest_view') || 'home'
  })

  // 2. À chaque fois que 'currentView' change, on met à jour le localStorage
  useEffect(() => {
    localStorage.setItem('emigest_view', currentView)
  }, [currentView])

  const goHome = () => setCurrentView('home')

  switch (currentView) {
    case 'home':
      return <Home onNavigate={(page) => setCurrentView(page)} />

    case 'loginsco':
      return <Loginsco onBack={goHome} onLogin={() => setCurrentView('scolarite')} />

    case 'scolarite':
      return <ScolariteApp onBack={goHome} />

    case 'loginprof':
      return <Loginprof onBack={goHome} onLogin={() => setCurrentView('professeurapp')} />

    case 'professeurapp':
      return <ProfesseurApp onBack={goHome} />

    case 'public':
      return <PublicApp onBack={goHome} />

    default:
      return <Home onNavigate={(page) => setCurrentView(page)} />
  }
}

export default App