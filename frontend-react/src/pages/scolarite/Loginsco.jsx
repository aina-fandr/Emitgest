import { useState } from 'react'
import { GraduationCap, Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function Loginsco({ onBack, onLogin }) {
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
    
    setTimeout(() => {
      if (email === 'admin@unigest.com' && password === 'admin123') {
        onLogin()
      } else {
        setError('Email ou mot de passe incorrect')
      }
      setLoading(false)
    }, 500)
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
      <button 
        onClick={onBack}
        style={{ position: "fixed", top: "24px", left: "24px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "8px" }}
      >
        <ArrowLeft size={20} />
        <span style={{ fontSize: "14px" }}>Retour</span>
      </button>

      <div style={{ width: "100%", maxWidth: "448px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "64px", height: "64px", background: "rgba(59,130,246,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59,130,246,0.2)", margin: "0 auto 16px" }}>
            <GraduationCap size={32} color="#60a5fa" />
          </div>
          <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "white", marginBottom: "8px" }}>EmitGest</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>Espace Scolarité - Connexion</p>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "40px"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "white", marginBottom: "24px" }}>Connectez-vous</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@unigest.com"
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "12px", color: "white",
                  fontSize: "14px", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Mot de passe</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%", padding: "14px 48px 14px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "12px", color: "white",
                    fontSize: "14px", outline: "none", boxSizing: "border-box"
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 16px", color: "#fca5a5", fontSize: "13px", marginBottom: "20px" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{
                width: "100%", padding: "14px",
                background: loading ? "rgba(59,130,246,0.5)" : "#3b82f6",
                color: "white", fontWeight: "600", fontSize: "15px",
                border: "none", borderRadius: "12px",
                cursor: loading ? "not-allowed" : "pointer"
              }}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div style={{ marginTop: "24px", padding: "16px", background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: "12px", fontSize: "12px", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
            admin@unigest.com / admin123
          </div>
        </div>
      </div>
    </div>
  )
}