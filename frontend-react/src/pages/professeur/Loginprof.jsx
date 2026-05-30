import { useState } from 'react'
import { GraduationCap, Eye, EyeOff, ArrowLeft, Upload, FileText, CheckCircle } from 'lucide-react'

export default function Loginprof({ onBack, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fileName, setFileName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '',
    specialite: '', departement: '', password: '', confirmPassword: '',
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setFileName(file.name)
        setError('')
      } else {
        setError('Format non supporté. Utilisez PDF ou image (JPG, PNG)')
        setFileName('')
      }
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (email === 'prof@unigest.com' && password === 'prof123') {
        onLogin()
      } else {
        setError('Email ou mot de passe incorrect')
      }
      setLoading(false)
    }, 800)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    if (!fileName) {
      setError("Veuillez télécharger une pièce d'identité")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setSuccess('Demande soumise avec succès !')
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "radial-gradient(circle at center, #1e3a5f 0%, #0f172a 100%)",
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "24px"
    }}>
      <button onClick={onBack} style={{
        position: "fixed", top: "24px", left: "24px", background: "none",
        border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)",
        display: "flex", alignItems: "center", gap: "8px"
      }}>
        <ArrowLeft size={20} />
        <span style={{ fontSize: "14px" }}>Retour</span>
      </button>

      <div style={{ width: "100%", maxWidth: isRegistering ? "640px" : "448px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "64px", height: "64px", background: "rgba(99,102,241,0.15)",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(99,102,241,0.3)", margin: "0 auto 16px"
          }}>
            <GraduationCap size={32} color="#818cf8" />
          </div>
          <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "white", marginBottom: "8px" }}>EmitGest</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
            {isRegistering ? 'Espace Professeur - Inscription' : 'Espace Professeur - Connexion'}
          </p>
        </div>

        {/* ========== CONNEXION ========== */}
        {!isRegistering && (
          <div style={{
            background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "24px", padding: "40px"
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "white", marginBottom: "24px" }}>Connectez-vous</h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="prof@unigest.com"
                  style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Mot de passe</label>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ width: "100%", padding: "14px 48px 14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {error && (
                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 16px", color: "#fca5a5", fontSize: "13px", marginBottom: "20px" }}>{error}</div>
              )}
              <button type="submit" disabled={loading}
                style={{ width: "100%", padding: "14px", background: loading ? "rgba(99,102,241,0.5)" : "#6366f1", color: "white", fontWeight: "600", fontSize: "15px", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                Pas encore de compte ?{' '}
                <button onClick={() => { setIsRegistering(true); setError('') }}
                  style={{ background: "none", border: "none", color: "#818cf8", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
                  S'inscrire
                </button>
              </p>
            </div>
            <div style={{ marginTop: "24px", padding: "16px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "12px", fontSize: "12px", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
              prof@unigest.com / prof123
            </div>
          </div>
        )}

        {/* ========== INSCRIPTION ========== */}
        {isRegistering && (
          <div style={{
            background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "24px", padding: "40px"
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "white", marginBottom: "24px" }}>Créer un compte</h2>

            {success ? (
              /* ========== PAGE DE SUCCÈS ========== */
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{
                  width: "80px", height: "80px", background: "rgba(52, 211, 153, 0.1)",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", border: "2px solid rgba(52, 211, 153, 0.3)"
                }}>
                  <CheckCircle size={48} color="#34d399" />
                </div>
                <h3 style={{ color: "#34d399", fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
                  Demande soumise avec succès !
                </h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginBottom: "8px", lineHeight: "1.6" }}>
                  Votre compte est en cours de vérification par l'administration.
                </p>

                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "20px", marginTop: "24px", textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#34d399", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold", color: "white" }}>✓</div>
                    <div>
                      <p style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>Inscription complétée</p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>Vos informations ont été enregistrées</p>
                    </div>
                  </div>
                  <div style={{ width: "2px", height: "20px", background: "rgba(255,255,255,0.1)", marginLeft: "13px", marginBottom: "4px" }}></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(251, 191, 36, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold", color: "#fbbf24" }}>⏳</div>
                    <div>
                      <p style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>Vérification en cours</p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>L'administration vérifie votre pièce d'identité</p>
                    </div>
                  </div>
                  <div style={{ width: "2px", height: "20px", background: "rgba(255,255,255,0.1)", marginLeft: "13px", marginBottom: "4px" }}></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>🔓</div>
                    <div>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: "600" }}>Accès à l'espace professeur</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>Vous recevrez un email de confirmation</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "24px", padding: "16px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "12px", textAlign: "center" }}>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "4px" }}>Besoin d'aide ? Contactez le service scolarité</p>
                  <p style={{ color: "#818cf8", fontSize: "13px", fontWeight: "600" }}>scolarite@emitgest.mg</p>
                </div>

                <button onClick={() => { setIsRegistering(false); setSuccess(''); }}
                  style={{ marginTop: "24px", padding: "12px 32px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "white", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                  Retour à la connexion
                </button>
              </div>
            ) : (
              /* ========== FORMULAIRE INSCRIPTION ========== */
              <form onSubmit={handleRegister}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Nom</label>
                    <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Prénom</label>
                    <input type="text" required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                      style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Téléphone</label>
                  <input type="text" required value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                    style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Spécialité</label>
                    <input type="text" required value={form.specialite} onChange={(e) => setForm({ ...form, specialite: e.target.value })}
                      style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Département</label>
                    <input type="text" required value={form.departement} onChange={(e) => setForm({ ...form, departement: e.target.value })}
                      style={{ width: "100%", padding: "14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Mot de passe</label>
                    <div style={{ position: "relative" }}>
                      <input type={showPassword ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                        style={{ width: "100%", padding: "14px 40px 14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>Confirmer</label>
                    <div style={{ position: "relative" }}>
                      <input type={showConfirmPassword ? "text" : "password"} required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        style={{ width: "100%", padding: "14px 40px 14px 16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", marginBottom: "8px" }}>
                    <Upload size={14} style={{ display: "inline", marginRight: "6px" }} />
                    Pièce d'identité (PDF ou image)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "rgba(255, 255, 255, 0.05)", border: `2px dashed ${fileName ? 'rgba(52, 211, 153, 0.5)' : 'rgba(255, 255, 255, 0.15)'}`, borderRadius: "12px", cursor: "pointer" }}>
                    <FileText size={20} color={fileName ? "#34d399" : "rgba(255,255,255,0.4)"} />
                    <span style={{ color: fileName ? "#34d399" : "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                      {fileName || "Cliquez pour télécharger votre pièce d'identité"}
                    </span>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} style={{ display: "none" }} />
                  </label>
                </div>
                {error && (
                  <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "12px", padding: "12px 16px", color: "#fca5a5", fontSize: "13px", marginBottom: "16px" }}>{error}</div>
                )}
                <button type="submit" disabled={loading}
                  style={{ width: "100%", padding: "14px", background: loading ? "rgba(99,102,241,0.5)" : "#6366f1", color: "white", fontWeight: "600", fontSize: "15px", border: "none", borderRadius: "12px", cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Création..." : "Créer mon compte"}
                </button>
              </form>
            )}

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                Déjà un compte ?{' '}
                <button onClick={() => { setIsRegistering(false); setError(''); setSuccess('') }}
                  style={{ background: "none", border: "none", color: "#818cf8", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
                  Se connecter
                </button>
              </p>
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: "32px", color: "rgba(255,255,255,0.2)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px" }}>
          © 2026 EmitGest - Université
        </p>
      </div>

      <style>{`
        input::placeholder { color: rgba(255, 255, 255, 0.3); }
        input:focus, select:focus { border-color: #818cf8 !important; }
      `}</style>
    </div>
  )
}