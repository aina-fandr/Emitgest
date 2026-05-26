# Configuração de Integração Frontend-Backend

## ✅ Conclusão da Integração

O frontend React foi integrado com sucesso ao backend .NET Core. Todos os serviços CRUD para **Salles (Rooms)** e **Classes** estão funcionando.

## 📋 Requisitos

- **Backend**: .NET 8 e PostgreSQL
- **Frontend**: Node.js 16+ e npm

## 🚀 Como Executar

### 1. **Backend (.NET Core)**

```bash
cd Backend
dotnet restore
dotnet build
dotnet run
```

O backend será iniciado em `http://localhost:5000`

### 2. **Frontend (React)**

```bash
cd frontend-react
npm install
npm start
```

O frontend será iniciado em `http://localhost:3000`

---

## 🔗 Integração Frontend-Backend

### Endpoints Disponíveis

**Salles (Rooms):**
- `GET /api/salles` - Listar todas as salles
- `GET /api/salles/{id}` - Obter uma salle específica
- `POST /api/salles` - Criar uma nova salle
- `PUT /api/salles/{id}` - Atualizar uma salle
- `DELETE /api/salles/{id}` - Deletar uma salle

**Classes:**
- `GET /api/classes` - Listar todas as classes
- `GET /api/classes/{id}` - Obter uma classe específica
- `POST /api/classes` - Criar uma nova classe
- `PUT /api/classes/{id}` - Atualizar uma classe
- `DELETE /api/classes/{id}` - Deletar uma classe

### Configuração de Ambiente

**Frontend** (`.env.local` already configured):
```
REACT_APP_API_URL=http://localhost:5000
```

**Backend** (`Program.cs` already configured):
```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
```

---

## 📍 Páginas do Frontend Integradas

### 1. **Gestion des Salles** (`/scolarite/Rooms`)
- ✅ Carregar salles do backend
- ✅ Criar nova salle
- ✅ Editar salle existente
- ✅ Deletar salle
- ✅ Indicador de disponibilidade

### 2. **Gestion des Classes** (`/scolarite/Parcours`)
- ✅ Carregar classes do backend
- ✅ Criar nova classe
- ✅ Editar classe existente
- ✅ Deletar classe
- ✅ Buscar/filtrar classes

---

## 🛠️ Serviço API (`apiService.js`)

Métodos disponíveis para usar no frontend:

```javascript
// Salles
ApiService.getAllRooms()
ApiService.getRoomById(id)
ApiService.createRoom(roomData)
ApiService.updateRoom(id, roomData)
ApiService.deleteRoom(id)

// Classes
ApiService.getAllClasses()
ApiService.getClassById(id)
ApiService.createClass(classData)
ApiService.updateClass(id, classData)
ApiService.deleteClass(id)
```

---

## 📝 Estrutura do Modelo de Dados

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

---

## 🔍 Teste Rápido

1. Acesse http://localhost:3000
2. Navegue até **Scolarité** → **Gestion des Salles**
3. Clique em "Ajouter une salle"
4. Preencha o formulário e salve
5. Verifique se a salle aparece na lista

---

## ⚠️ Troubleshooting

### Erro "Erreur lors du chargement des salles"
- Verifique se o backend está rodando em `http://localhost:5000`
- Confirme a configuração do CORS no `Program.cs`
- Verifique a variável `REACT_APP_API_URL` no `.env.local`

### Erro de conexão ao banco de dados
- Verifique a conexão PostgreSQL
- Execute as migrations: `dotnet ef database update`
- Confirme `appsettings.json` com credenciais corretas

### Port 5000 já em uso
- Mude a porta no `Properties/launchSettings.json`
- Atualize `REACT_APP_API_URL` no frontend

---

## ✨ Próximas Funcionalidades

- [ ] Integração de autenticação (JWT)
- [ ] Página de Professores com backend
- [ ] Gerenciamento de Emploi du Temps
- [ ] Dashboard analytics
- [ ] Exportação de dados (PDF/Excel)

---

**Status**: ✅ Pronto para desenvolvimento  
**Última atualização**: 26/05/2026
