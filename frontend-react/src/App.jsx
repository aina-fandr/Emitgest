import { useState } from 'react'
import Home from './pages/Home'
import Loginsco from './pages/scolarite/Loginsco'
import ScolariteApp from './pages/scolarite/ScolariteApp'
import Loginprof from './pages/professeur/Loginprof'
import ProfesseurApp from './pages/professeur/ProfesseurApp'
import PublicApp from './pages/public/PublicApp'

function App() {
  const [currentView, setCurrentView] = useState('home')

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