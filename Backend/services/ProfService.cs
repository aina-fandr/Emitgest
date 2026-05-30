using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using emigest_back.Data;      // ← corrigé
using emigest_back.Models;    // ← corrigé

namespace emigest_back.Services  // ← corrigé
{
    public class ProfService
    {
        private readonly AppDbContext _context;
        private readonly string _uploadPath;

        public ProfService(AppDbContext context)
        {
            _context = context;
            _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", "PiecesIdentite");
            if (!Directory.Exists(_uploadPath))
                Directory.CreateDirectory(_uploadPath);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        public ProfResponseDto Login(LoginProfDto dto)
        {
            var hash = HashPassword(dto.Password);
            var prof = _context.Professeurs.FirstOrDefault(p => p.Email == dto.Email && p.PasswordHash == hash);

            if (prof == null) return null;

            return new ProfResponseDto
            {
                Id = prof.Id,
                Nom = prof.Nom,
                Prenom = prof.Prenom,
                Email = prof.Email,
                Telephone = prof.Telephone,
                Specialite = prof.Specialite,
                Departement = prof.Departement,
                Statut = prof.Statut,
                DateInscription = prof.DateInscription,
                Token = GenerateToken(prof)
            };
        }

      public ProfResponseDto Register(RegisterProfDto dto, IFormFile pieceIdentite = null)
        {
            if (_context.Professeurs.Any(p => p.Email == dto.Email))
                throw new Exception("Cet email est déjà utilisé.");

            string filePath = null;
            if (pieceIdentite != null)
            {
                var fileName = $"{Guid.NewGuid()}_{pieceIdentite.FileName}";
                filePath = Path.Combine(_uploadPath, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                pieceIdentite.CopyTo(stream);
            }

            var prof = new Professeur
            {
                Nom = dto.Nom,
                Prenom = dto.Prenom,
                Email = dto.Email,
                Telephone = dto.Telephone,
                Specialite = dto.Specialite,
                Departement = dto.Departement,
                PasswordHash = HashPassword(dto.Password),
                PieceIdentitePath = filePath,
                Statut = "en_attente",
                DateInscription = DateTime.Now
            };

            _context.Professeurs.Add(prof);
            _context.SaveChanges();

            return new ProfResponseDto
            {
                Id = prof.Id,
                Nom = prof.Nom,
                Prenom = prof.Prenom,
                Email = prof.Email,
                Telephone = prof.Telephone,
                Specialite = prof.Specialite,
                Departement = prof.Departement,
                Statut = prof.Statut,
                DateInscription = prof.DateInscription
            };
        }

        private string GenerateToken(Professeur prof)
        {
            // Token simple (à remplacer par JWT en production)
            var raw = $"{prof.Id}:{prof.Email}:{DateTime.Now.Ticks}";
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(raw));
        }

        public List<ProfResponseDto> GetAll()
        {
            return _context.Professeurs.Select(p => new ProfResponseDto
            {
                Id = p.Id,
                Nom = p.Nom,
                Prenom = p.Prenom,
                Email = p.Email,
                Telephone = p.Telephone,
                Specialite = p.Specialite,
                Departement = p.Departement,
                Statut = p.Statut,
                DateInscription = p.DateInscription
            }).ToList();
        }

        public void UpdateStatus(int id, string statut)
        {
            var prof = _context.Professeurs.Find(id);
            if (prof == null) throw new Exception("Professeur non trouvé");
            prof.Statut = statut;
            _context.SaveChanges();
        }

        public string GetPiecePath(int id)
        {
            return _context.Professeurs.Find(id)?.PieceIdentitePath;
        }
    }
}