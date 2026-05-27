import React, { useState } from 'react';
import { Calendar, Clock, FileText, ArrowLeft, Globe, Printer, Building } from 'lucide-react';

export default function ReservationForm({ onBack }) {
  const [formData, setFormData] = useState({
    nomComplet: '',
    cin: '',
    email: '',
    telephone: '',
    nomAssociation: '',
    nomEvenement: '',
    description: '',
    date: '',
    heure: '',
    duree: '2',
    participants: '',
    typeSalle: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    const hasAssociation = formData.nomAssociation.trim() !== '';
    
    const printContent = `
      <div style="font-family: 'Inter', sans-serif; max-width: 700px; margin: auto; padding: 40px; border: 2px solid #059669; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px;">
          <h1 style="color: #059669; margin: 0;">EmitGest - Université</h1>
          <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Confirmation de Demande de Réservation</p>
        </div>
        
        <h2 style="color: #1e293b; font-size: 18px; margin-bottom: 20px;">Détails du demandeur</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 180px;">Nom complet :</td><td style="font-weight: 600;">${formData.nomComplet || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">CIN :</td><td style="font-weight: 600;">${formData.cin || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Email :</td><td style="font-weight: 600;">${formData.email || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Téléphone :</td><td style="font-weight: 600;">${formData.telephone || '-'}</td></tr>
          ${hasAssociation ? `<tr><td style="padding: 8px 0; color: #64748b;">Association / Club :</td><td style="font-weight: 600;">${formData.nomAssociation}</td></tr>` : ''}
        </table>

        <h2 style="color: #1e293b; font-size: 18px; margin-bottom: 20px;">Détails de la réservation</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 180px;">Événement :</td><td style="font-weight: 600;">${formData.nomEvenement || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Description :</td><td style="font-weight: 600;">${formData.description || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Date :</td><td style="font-weight: 600;">${formData.date || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Heure :</td><td style="font-weight: 600;">${formData.heure || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Durée :</td><td style="font-weight: 600;">${formData.duree} heure(s)</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Participants :</td><td style="font-weight: 600;">${formData.participants || '-'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Type de salle :</td><td style="font-weight: 600;">${formData.typeSalle || '-'}</td></tr>
        </table>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
          <p>Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
          <p style="color: #059669; font-weight: 600; margin-top: 8px;">Statut : En attente de validation</p>
        </div>
      </div>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Demande de Réservation - ${formData.nomEvenement || 'Sans titre'}</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; padding: 20px; color: #1e293b; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nomComplet || !formData.cin || !formData.email || !formData.nomEvenement || !formData.date || !formData.heure) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    const confirmation = window.confirm(
      'Votre demande a été enregistrée avec succès !\n\n' +
      'Voulez-vous imprimer le récapitulatif de votre demande ?'
    );
    
    if (confirmation) {
      handlePrint();
    }
    
    setFormData({
      nomComplet: '',
      cin: '',
      email: '',
      telephone: '',
      nomAssociation: '',
      nomEvenement: '',
      description: '',
      date: '',
      heure: '',
      duree: '2',
      participants: '',
      typeSalle: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#1e293b] font-sans antialiased pb-12">
      {/* Barre de navigation supérieure */}
      <header className="max-w-5xl mx-auto px-4 py-6 flex justify-between items-center flex-wrap gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-slate-50 transition shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimer
          </button>
          <div className="flex items-center gap-1.5 bg-[#e2f7ed] text-[#15803d] px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide">
            <Globe className="w-3.5 h-3.5" />
            Espace Public - Sans inscription
          </div>
        </div>
      </header>

      {/* Titre principal */}
      <main className="max-w-3xl mx-auto px-4 mt-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 mb-3 shadow-sm border border-emerald-100">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Demande de Réservation de Salle</h1>
          <p className="text-slate-500 text-sm mt-1">
            Remplissez le formulaire ci-dessous pour soumettre votre demande
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
 
          {/* Section 1 : Informations du demandeur */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Informations du demandeur</h2>
              <p className="text-xs text-slate-400 mt-0.5">Vérification d'identité requise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nom complet *</label>
                <input 
                  type="text"
                  name="nomComplet"
                  value={formData.nomComplet}
                  onChange={handleChange}
                  placeholder="Nom et prénom"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Numéro CIN *</label>
                <input 
                  type="text"
                  name="cin"
                  value={formData.cin}
                  onChange={handleChange}
                  placeholder="Ex: AB123456"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email *</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Téléphone</label>
                <input 
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="06 XX XX XX XX"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Nom de l'association / Club (facultatif) */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  Nom de l'association / Club
                  <span className="text-[10px] font-normal text-slate-400">(facultatif)</span>
                </span>
              </label>
              <input 
                type="text"
                name="nomAssociation"
                value={formData.nomAssociation}
                onChange={handleChange}
                placeholder="Ex: Club Informatique, AEEM... (optionnel)"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400"
              />
            </div>

            {/* Zone d'upload Copie de la CIN */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Copie de la CIN *</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition bg-slate-50/30">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">Téléversez une copie de votre CIN</p>
                <label className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-medium text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 transition">
                  <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  Choisir un fichier
                  <input type="file" className="hidden" required />
                </label>
              </div>
            </div>
          </div>

          {/* Section 2 : Détails de la réservation */}
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Détails de la réservation</h2>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nom de l'événement *</label>
              <input 
                type="text"
                name="nomEvenement"
                value={formData.nomEvenement}
                onChange={handleChange}
                placeholder="Ex: Conférence, Réunion, Atelier..."
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description</label>
              <textarea 
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez brièvement votre événement..."
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date souhaitée *</label>
                <div className="relative">
                  <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none bg-transparent"
                    required
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Heure de début *</label>
                <div className="relative">
                  <input 
                    type="time"
                    name="heure"
                    value={formData.heure}
                    onChange={handleChange}
                    className="w-full text-sm pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    required
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Durée (heures)</label>
                <select
                  name="duree"
                  value={formData.duree}
                  onChange={handleChange}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
                >
                  <option value="1">1 heure</option>
                  <option value="2">2 heures</option>
                  <option value="3">3 heures</option>
                  <option value="4">4 heures</option>
                  <option value="plus">Plus de 4 heures</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nombre de participants estimé</label>
                <input 
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  placeholder="Ex: 30"
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Type de salle souhaité</label>
                <select
                  name="typeSalle"
                  value={formData.typeSalle}
                  onChange={handleChange}
                  className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-400"
                >
                  <option value="" disabled>Sélectionner</option>
                  <option value="reunion" className="text-slate-700">Salle de réunion</option>
                  <option value="conference" className="text-slate-700">Salle de conférence</option>
                  <option value="fete" className="text-slate-700">Salle des fêtes</option>
                  <option value="amphi" className="text-slate-700">Amphithéâtre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
            <button 
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition bg-white"
            >
              Annuler
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-4 py-2.5 border border-emerald-200 rounded-lg text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition bg-white flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimer
              </button>
              <button 
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-lg text-sm font-semibold tracking-wide transition shadow-sm"
              >
                Soumettre la demande
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}