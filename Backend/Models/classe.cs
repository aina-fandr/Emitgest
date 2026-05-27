using System.ComponentModel.DataAnnotations;

namespace emigest_back.Models
{
    public class Classe
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Parcours { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string Mention { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string Niveau { get; set; } = string.Empty;

        [Required, StringLength(100)]
        public string NomDelegue { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string NumDelegue { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string SalleClasse { get; set; } = string.Empty;
    }
}