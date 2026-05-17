import { useState } from 'react'
import { GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function Login({ onBack, onLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    
    // Simuler une connexion (à remplacer par un appel API)
    setTimeout(() => {
      if (email === 'admin@unigest.com' && password === 'admin123') {
        onLogin()
      } else {
        setError('Email ou mot de passe incorrect')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "radial-gradient(circle at center, #1e3a5f 0%, #0f172a 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px"
    }}>
      {/* Bouton retour */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 text-white/60 hover:text-white flex items-center gap-2 transition-colors"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Retour</span>
      </button>

      {/* Carte de login */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
              <GraduationCap className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EmitGest</h1>
          <p className="text-blue-200/60 text-sm">Espace Scolarité - Connexion</p>
        </div>

        {/* Formulaire */}
        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "40px"
        }}>
          <h2 className="text-xl font-semibold text-white mb-6">Connectez-vous</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-blue-200/80 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@unigest.com"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                className="focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-xs font-bold text-blue-200/80 uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "14px 48px 14px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                  className="focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.5)",
                    padding: "4px"
                  }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fca5a5",
                fontSize: "13px"
              }}>
                {error}
              </div>
            )}

            {/* Bouton connexion */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: loading ? "rgba(59, 130, 246, 0.5)" : "#3b82f6",
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                border: "none",
                borderRadius: "12px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s"
              }}
              className="hover:bg-blue-500"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connexion...
                </span>
              ) : "Se connecter"}
            </button>
          </form>

          {/* Info compte test */}
          <div style={{
            marginTop: "24px",
            padding: "16px",
            background: "rgba(59, 130, 246, 0.05)",
            border: "1px solid rgba(59, 130, 246, 0.15)",
            borderRadius: "12px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center"
          }}>
            <p className="mb-1">Compte de test :</p>
            <p className="text-blue-300">admin@unigest.com / admin123</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-blue-200/20 text-xs tracking-widest uppercase">
          © 2026 EmitGest - Université
        </p>
      </div>

      <style>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  )
}