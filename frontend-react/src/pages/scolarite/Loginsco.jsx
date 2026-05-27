import { useState } from 'react'
import { GraduationCap, Eye, EyeOff, ArrowLeft, ShieldCheck, UserCog } from 'lucide-react'

export default function Loginsco({ onBack, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Register
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  })

  const roles = [
    { 
      id: 'administration', 
      label: 'Administration', 
      icon: ShieldCheck,
      description: 'Gestion complète : salles, emplois, professeurs, demandes',
      color: 'blue'
    },
    { 
      id: 'secimpla', 
      label: 'Sécimpla', 
      icon: UserCog,
      description: 'Gestion des emplois du temps et des parcours',
      color: 'indigo'
    },
  ]

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setForm({ nom: '', prenom: '', email: '', telephone: '', password: '', confirmPassword: '' })
    setSelectedRole('')
    setError('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    if (!selectedRole) {
      setError('Veuillez sélectionner un rôle')
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      if (email === 'admin@unigest.com' && password === 'admin123') {
        onLogin(selectedRole)
      } else if (email === 'secimpla@unigest.com' && password === 'secimpla123') {
        onLogin(selectedRole)
      } else {
        setError('Email ou mot de passe incorrect')
      }
      setLoading(false)
    }, 500)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')

    if (!selectedRole) {
      setError('Veuillez sélectionner un rôle')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setIsRegistering(false)
      resetForm()
      alert(`Compte ${selectedRole === 'administration' ? 'Administration' : 'Sécimpla'} créé avec succès ! En attente de vérification.`)
      setLoading(false)
    }, 1000)
  }

  const colorMap = {
    blue: {
      light: 'rgba(59,130,246,0.1)',
      border: 'rgba(59,130,246,0.3)',
      icon: '#60a5fa',
      button: '#3b82f6',
      buttonHover: '#2563eb',
      badge: 'rgba(59,130,246,0.15)',
      badgeText: '#93c5fd',
    },
    indigo: {
      light: 'rgba(99,102,241,0.1)',
      border: 'rgba(99,102,241,0.3)',
      icon: '#818cf8',
      button: '#6366f1',
      buttonHover: '#4f46e5',
      badge: 'rgba(99,102,241,0.15)',
      badgeText: '#a5b4fc',
    },
  }

  const colors = selectedRole ? colorMap[roles.find(r => r.id === selectedRole)?.color || 'blue'] : colorMap.blue

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
        style={{ 
          position: "fixed", top: "24px", left: "24px", 
          background: "none", border: "none", cursor: "pointer", 
          color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "8px" 
        }}
      >
        <ArrowLeft size={20} />
        <span style={{ fontSize: "14px" }}>Retour</span>
      </button>

      <div style={{ width: "100%", maxWidth: isRegistering ? "520px" : "448px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ 
            width: "64px", height: "64px", 
            background: selectedRole ? colors.light : "rgba(59,130,246,0.1)", 
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", 
            border: `1px solid ${selectedRole ? colors.border : "rgba(59,130,246,0.2)"}`, 
            margin: "0 auto 16px", transition: "all 0.3s"
          }}>
            <GraduationCap size={32} color={selectedRole ? colors.icon : "#60a5fa"} />
          </div>
          <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "white", marginBottom: "8px" }}>EmitGest</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
            Espace Scolarité - {isRegistering ? 'Inscription' : 'Connexion'}
          </p>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: isRegistering ? "32px 40px" : "40px"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "white", marginBottom: "24px" }}>
            {isRegistering ? 'Créer un compte' : 'Connectez-vous'}
          </h2>

          {/* ============ FORMULAIRE CONNEXION ============ */}
          {!isRegistering && (
            <form onSubmit={handleLogin}>
              {/* Sélection du rôle */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "12px" }}>
                  Choisir le rôle
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {roles.map(role => {
                    const isSelected = selectedRole === role.id
                    const c = colorMap[role.color]
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        style={{
                          padding: "16px 12px",
                          background: isSelected ? c.light : "rgba(255, 255, 255, 0.03)",
                          border: `2px solid ${isSelected ? c.border : "rgba(255, 255, 255, 0.1)"}`,
                          borderRadius: "16px",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.3s",
                        }}
                      >
                        <role.icon size={28} color={c.icon} style={{ margin: "0 auto 8px" }} />
                        <p style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>{role.label}</p>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", lineHeight: "1.4" }}>{role.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Email */}
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

              {/* Mot de passe */}
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
                  background: loading ? "rgba(59,130,246,0.5)" : selectedRole ? colors.button : "rgba(59,130,246,0.5)",
                  color: "white", fontWeight: "600", fontSize: "15px",
                  border: "none", borderRadius: "12px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s"
                }}>
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          )}

          {/* ============ FORMULAIRE INSCRIPTION ============ */}
          {isRegistering && (
            <form onSubmit={handleRegister}>
              {/* Sélection du rôle */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "12px" }}>
                  Choisir le rôle
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {roles.map(role => {
                    const isSelected = selectedRole === role.id
                    const c = colorMap[role.color]
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        style={{
                          padding: "16px 12px",
                          background: isSelected ? c.light : "rgba(255, 255, 255, 0.03)",
                          border: `2px solid ${isSelected ? c.border : "rgba(255, 255, 255, 0.1)"}`,
                          borderRadius: "16px",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.3s",
                        }}
                      >
                        <role.icon size={28} color={c.icon} style={{ margin: "0 auto 8px" }} />
                        <p style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>{role.label}</p>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", lineHeight: "1.4" }}>{role.description}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Nom & Prénom */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>Nom</label>
                  <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>Prénom</label>
                  <input type="text" required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", padding: "12px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
              </div>

              {/* Téléphone */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>Téléphone</label>
                <input type="text" required value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  style={{ width: "100%", padding: "12px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
              </div>

              {/* Mot de passe & Confirmation */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>Mot de passe</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPassword ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                      style={{ width: "100%", padding: "12px 36px 12px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: "6px" }}>Confirmer</label>
                  <div style={{ position: "relative" }}>
                    <input type={showConfirmPassword ? "text" : "password"} required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      style={{ width: "100%", padding: "12px 36px 12px 14px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 16px", color: "#fca5a5", fontSize: "13px", marginBottom: "16px" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                style={{
                  width: "100%", padding: "14px",
                  background: loading ? "rgba(59,130,246,0.5)" : selectedRole ? colors.button : "rgba(59,130,246,0.5)",
                  color: "white", fontWeight: "600", fontSize: "15px",
                  border: "none", borderRadius: "12px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s"
                }}>
                {loading ? "Inscription..." : "S'inscrire"}
              </button>
            </form>
          )}

          {/* Toggle Connexion / Inscription */}
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
              {isRegistering ? 'Déjà un compte ?' : "Pas encore de compte ?"}{' '}
              <button 
                onClick={() => { setIsRegistering(!isRegistering); resetForm() }}
                style={{ 
                  background: "none", border: "none", 
                  color: selectedRole ? colors.icon : "#60a5fa", 
                  cursor: "pointer", fontWeight: "600", fontSize: "13px" 
                }}>
                {isRegistering ? 'Se connecter' : "S'inscrire"}
              </button>
            </p>
          </div>

          {/* Comptes de test */}
          {!isRegistering && (
            <div style={{ 
              marginTop: "24px", padding: "16px", 
              background: "rgba(59,130,246,0.05)", 
              border: "1px solid rgba(59,130,246,0.15)", 
              borderRadius: "12px", fontSize: "12px", 
              color: "rgba(255,255,255,0.5)", textAlign: "center" 
            }}>
              <p style={{ marginBottom: "4px", fontWeight: "600", color: "rgba(255,255,255,0.6)" }}>Comptes de test :</p>
              <p style={{ color: "#93c5fd" }}>admin@unigest.com / admin123</p>
              <p style={{ color: "#a5b4fc" }}>secimpla@unigest.com / secimpla123</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255, 255, 255, 0.3); }
        input:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
      `}</style>
    </div>
  )
}