# Connexion Backend et Frontend - Emitgest

## Configuration réalisée

### 1. **Service API (Frontend)**
J'ai créé un service réutilisable pour faire les appels HTTP au backend:
- **Fichier**: `frontend-react/src/services/apiService.js`
- **Fonctionnalités**: GET, POST, PUT, DELETE
- **Utilisation**: 
  ```javascript
  import ApiService from '../../services/apiService'
  const data = await ApiService.get('/api/salles')
  ```

### 2. **Configuration API (Frontend)**
Fichier de configuration centralisé:
- **Fichier**: `frontend-react/src/config/api.config.js`
- **Contient**: URL de base, endpoints, timeout
- **Utilisation**: 
  ```javascript
  import API_CONFIG from '../../config/api.config'
  const endpoint = API_CONFIG.ENDPOINTS.ROOMS // '/api/salles'
  ```

### 3. **Variables d'environnement**
- **Fichier**: `frontend-react/.env`
- **Contient**: `REACT_APP_API_URL=http://localhost:5000`
- **Nota**: Modifiez selon le port réel du backend

### 4. **CORS Backend**
Le backend .NET est configuré pour accepter les requêtes du frontend:
- **Politique**: "AllowReactApp"
- **Origine**: `http://localhost:3000`
- **Appliquée**: Dans `Program.cs` avec `app.UseCors("AllowReactApp")`

### 5. **Pages intégrées**

#### Dashboard
- Charge le nombre de salles disponibles
- Charge le nombre de classes
- Affiche les statistiques en temps réel

#### Rooms (Salles)
- **GET**: Charge toutes les salles au montage
- **POST**: Ajoute une nouvelle salle
- **DELETE**: Supprime une salle
- États de chargement et d'erreur gérés

## Instructions de démarrage

### 1. Backend (.NET)
```bash
cd Backend
dotnet restore
dotnet build
dotnet run
```
Le backend démarre sur `http://localhost:5000` (ou le port configuré)

### 2. Frontend (React)
```bash
cd frontend-react
npm install
npm start
```
Le frontend démarre sur `http://localhost:3000`

## Vérification

### Test des endpoints API
- **GET Salles**: `http://localhost:5000/api/salles`
- **GET Classes**: `http://localhost:5000/api/classes`
- **Swagger**: `http://localhost:5000/swagger` (si disponible)

### Vérification des logs
1. Ouvrez la console du navigateur (F12)
2. Allez dans l'onglet "Console"
3. Vous devriez voir les requêtes API
4. En cas d'erreur, vérifiez les messages d'erreur

## Champs de données

### Salles
```javascript
{
  id: number,
  nom: string,
  batiment: string,
  etage: number,
  capacite: number,
  equipements: string,
  estDisponible: boolean,
  creeLe: datetime,
  misAJourLe: datetime
}
```

### Classes
```javascript
{
  id: number,
  nom: string,
  nombreEtudiants: number,
  // ... autres champs
}
```

## Prochaines étapes

1. **Intégrer les classes** dans la page "Parcours"
2. **Intégrer les professeurs** dans la page "Professors"
3. **Intégrer l'emploi du temps** dans la page "Schedule"
4. **Authentification**: Ajouter login/logout avec tokens JWT
5. **Erreurs**: Ajouter une meilleure gestion des erreurs globales

## Troubleshooting

### Erreur "Cannot reach backend"
- Vérifiez que le backend tourne sur `http://localhost:5000`
- Vérifiez l'URL dans `frontend-react/.env`

### Erreur CORS
- Vérifiez que `app.UseCors("AllowReactApp")` est appelé dans `Program.cs`
- Vérifiez que l'URL du frontend est correcte dans CORS policy

### Erreur 404
- Vérifiez que le contrôleur existe (ex: `SallesController`)
- Vérifiez la route API (ex: `/api/salles`)

---

**Dernière mise à jour**: May 19, 2026
