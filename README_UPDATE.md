# 🎓 EmitGest - Système de Gestion des Salles et Emplois du Temps

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Production%20Ready-green)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

**EmitGest** est une application web complète pour la gestion des salles d'université, des classes, des emplois du temps et des professeurs. Le système offre une interface intuitive pour administrateurs, professeurs et étudiants.

## 🌟 Caractéristiques Principales

- ✅ **Gestion des Salles** - Création, modification, suppression avec détails complets
- ✅ **Gestion des Classes** - Parcours, mentions, niveaux et délégués
- ✅ **Interface Responsive** - Design moderne avec Tailwind CSS
- ✅ **API REST** - Backend robuste avec .NET Core
- ✅ **Base de données PostgreSQL** - Stockage fiable et scalable
- ✅ **Authentification CORS** - Sécurité entre frontend et backend

## 🏗️ Architecture

```
EmitGest/
├── Backend/                    # API .NET Core (Port 5222)
│   ├── Controllers/            # Endpoints REST
│   ├── Models/                 # Modèles de données
│   ├── Data/                   # Context Entity Framework
│   ├── Migrations/             # Migrations PostgreSQL
│   └── Program.cs              # Configuration
│
├── frontend-react/             # Interface React (Port 3000)
│   ├── src/
│   │   ├── pages/              # Pages principales
│   │   ├── services/           # Services API
│   │   ├── config/             # Configuration
│   │   └── App.jsx             # Composant racine
│   └── package.json
│
└── README.md                   # Cette documentation
```

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 16+ avec npm
- **.NET 8 SDK**
- **PostgreSQL** 12+
- **Git**

### Installation

#### 1️⃣ Cloner et entrer dans le projet
```bash
cd /media/neva/5a878616-283e-4dac-960e-511f9f7e9767/EMIT-GEST/Emitgest
```

#### 2️⃣ Configurer la base de données
```bash
# Assurer que PostgreSQL est en cours d'exécution
# Créer la base de données 'emitgest_bd' si nécessaire
```

#### 3️⃣ Lancer le Backend
```bash
cd Backend
dotnet restore
dotnet run
# ✅ Backend disponible: http://localhost:5222
```

#### 4️⃣ Lancer le Frontend (dans un nouveau terminal)
```bash
cd frontend-react
npm install
npm start
# ✅ Frontend disponible: http://localhost:3000
```

## 📱 Pages et Fonctionnalités

### Espace Scolarité
- **Dashboard** - Vue d'ensemble du système
- **Gestion des Classes** - CRUD complet des classes et parcours
- **Gestion des Salles** - CRUD complet des salles
- **Emploi du Temps** - Planification des cours
- **Demandes** - Gestion des réservations
- **Professeurs** - Liste et validation des professeurs

### Espace Professeur
- Création de compte
- Disponibilités et contraintes
- Consultation de l'emploi du temps

### Espace Public
- Formulaire de demande de réservation
- Consultation des salles disponibles

## 🔌 API Endpoints

### Salles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/salles` | Lister toutes les salles |
| `GET` | `/api/salles/{id}` | Obtenir une salle spécifique |
| `POST` | `/api/salles` | Créer une nouvelle salle |
| `PUT` | `/api/salles/{id}` | Mettre à jour une salle |
| `DELETE` | `/api/salles/{id}` | Supprimer une salle |

### Classes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/classes` | Lister toutes les classes |
| `GET` | `/api/classes/{id}` | Obtenir une classe spécifique |
| `POST` | `/api/classes` | Créer une nouvelle classe |
| `PUT` | `/api/classes/{id}` | Mettre à jour une classe |
| `DELETE` | `/api/classes/{id}` | Supprimer une classe |

### Documentation Swagger
```
http://localhost:5222/swagger/index.html
```

## 🛠️ Configuration

### Variables d'Environnement Frontend

Créer `.env.local` dans `frontend-react/`:
```bash
REACT_APP_API_URL=http://localhost:5222
```

### Configuration Backend

Éditer `Backend/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=emitgest_bd;Username=neva;Password=aina2006"
  }
}
```

## 📊 Modèles de Données

### Salle
```json
{
  "id": 1,
  "nom": "Salle C101",
  "batiment": "Bâtiment C",
  "etage": 1,
  "capacite": 50,
  "equipement": "Projecteur, Tableau blanc",
  "estDisponible": true,
  "creeLe": "2026-05-26T10:30:00Z",
  "misAJourLe": "2026-05-26T10:30:00Z"
}
```

### Classe
```json
{
  "id": 1,
  "parcours": "Génie Logiciel",
  "mention": "Informatique",
  "niveau": "L3",
  "nomDelegue": "Rakoto Jean",
  "numDelegue": "+261 34 12 345 67",
  "salleClasse": "Salle C101"
}
```

## 🔐 Sécurité

- ✅ CORS configuré pour frontend seulement
- ✅ Validation des données au backend
- ✅ Gestion des erreurs robuste
- ✅ Notifications de sécurité appropriées

## 🧪 Test des Endpoints

### Avec curl

```bash
# Lister les salles
curl http://localhost:5222/api/salles

# Créer une salle
curl -X POST http://localhost:5222/api/salles \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Salle A101",
    "batiment": "A",
    "etage": 1,
    "capacite": 40,
    "equipement": "Projecteur"
  }'
```

## 📚 Technologies

### Backend
- **ASP.NET Core 8** - Framework web moderne
- **Entity Framework Core** - ORM puissant
- **PostgreSQL** - Base de données robuste
- **Swagger/OpenAPI** - Documentation API

### Frontend
- **React 18** - Bibliothèque UI
- **Tailwind CSS** - Design system
- **Lucide React** - Icônes vectorielles
- **Fetch API** - Requêtes HTTP

## 🐛 Dépannage

### Le frontend ne se connecte pas au backend
```bash
# Vérifier que le backend est lancé
curl http://localhost:5222/api/salles

# Si l'erreur persiste:
# 1. Vérifier le port dans .env.local
# 2. Redémarrer le frontend
npm start
```

### Erreur de base de données
```bash
# Appliquer les migrations
cd Backend
dotnet ef database update
```

### Port déjà utilisé
```bash
# Trouver et tuer le processus
lsof -i :5222
kill -9 <PID>
```

## 📈 Roadmap Future

- [ ] Système d'authentification JWT
- [ ] Système de rôles et permissions
- [ ] Notifications temps réel (WebSocket)
- [ ] Export PDF/Excel
- [ ] Dashboard avec statistiques
- [ ] API GraphQL
- [ ] Application mobile

## 📝 Documentation Complémentaire

- [Rapport Complet](./RAPPORT_PROJET.md)
- [Guide d'Intégration](./SETUP_INTEGRATION.md)
- [API Documentation](./API_INTEGRATION_GUIDE.md)

## 💡 Conseils de Développement

1. **Ordre de lancement:** Backend d'abord, puis Frontend
2. **Cache du navigateur:** Vider si les changements ne s'affichent pas
3. **Logs:** Consulter la console navigateur et le terminal backend
4. **Migrations:** Toujours tester les migrations en développement

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer:

1. Créer une branche feature
2. Committer les changements
3. Pousser vers la branche
4. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteur

- **Développement:** AI Assistant
- **Date:** 26 Mai 2026
- **Version:** 1.0.0

## 📞 Support

Pour toute question ou problème:
- Consultez la documentation
- Vérifiez les logs du navigateur (F12)
- Consultez les logs du terminal backend

---

**Créé avec ❤️ pour l'université**

Dernière mise à jour: 26 Mai 2026
