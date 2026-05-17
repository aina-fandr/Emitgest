using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace emigest_back.Models // Modifie selon l'espace de noms de ton projet
{
    [Table("salles")]
    public class Salle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("nom")]
        public string Nom { get; set; } = string.Empty;

        [Required]
        [Column("batiment")]
        public string Batiment { get; set; } = string.Empty;

        [Required]
        [Column("etage")]
        public int Etage { get; set; }

        [Required]
        [Column("capacite")]
        public int Capacite { get; set; }

        [Column("equipement")]
        public string? Equipement { get; set; } // Le '?' permet la valeur nulle (Nullable)

        [Column("est_disponible")]
        public bool? EstDisponible { get; set; } // Booléen nullable

        [Column("cree_le")]
        public DateTime CreeLe { get; set; } = DateTime.UtcNow;

        [Column("mis_a_jour_le")]
        public DateTime MisAJourLe { get; set; } = DateTime.UtcNow;
    }
}