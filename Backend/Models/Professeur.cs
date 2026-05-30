using System;
using System.ComponentModel.DataAnnotations;

namespace emigest_back.Models
{
    public class Professeur
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nom { get; set; }

        [Required]
        public string Prenom { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        public string Telephone { get; set; }

        [Required]
        public string Specialite { get; set; }

        [Required]
        public string Departement { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string PieceIdentitePath { get; set; }

        public string Statut { get; set; } = "en_attente";

        public DateTime DateInscription { get; set; } = DateTime.Now;
    }
}