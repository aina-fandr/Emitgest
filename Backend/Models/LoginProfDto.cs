using System.ComponentModel.DataAnnotations;

namespace emigest_back.Models
{
    public class LoginProfDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class RegisterProfDto
    {
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

        [Required, MinLength(6)]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }

        public IFormFile PieceIdentite { get; set; }
    }

    public class ProfResponseDto
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Specialite { get; set; }
        public string Departement { get; set; }
        public string Statut { get; set; }
        public DateTime DateInscription { get; set; }
        public string Token { get; set; }
    }
}