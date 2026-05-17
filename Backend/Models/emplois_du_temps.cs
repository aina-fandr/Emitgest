using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace emigest_back.Models // S'adapte à l'espace de noms de ton projet
{
    [Table("emplois_du_temps")]
    public class EmploiDuTemps
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("salle_id")]
        public int SalleId { get; set; }

        [Required]
        [Column("nom_professeur")]
        public string NomProfesseur { get; set; } = string.Empty;

        [Required]
        [Column("matiere")]
        public string Matiere { get; set; } = string.Empty;

        [Required]
        [Column("jour_semaine")]
        public string JourSemaine { get; set; } = string.Empty;

        [Required]
        [Column("heure_debut")]
        public string HeureDebut { get; set; } = string.Empty;

        [Required]
        [Column("heure_fin")]
        public string HeureFin { get; set; } = string.Empty;

        [Column("nom_groupe")]
        public string? NomGroupe { get; set; } // Chaîne de caractères nullable

        [Column("semestre")]
        public string? Semestre { get; set; } // Chaîne de caractères nullable

        [Column("cree_le")]
        public DateTime CreeLe { get; set; } = DateTime.UtcNow;

        [Column("mis_a_jour_le")]
        public DateTime MisAJourLe { get; set; } = DateTime.UtcNow;

        // Relation optionnelle : Si tu as créé la classe "Salle" précédemment,
        // tu peux l'ajouter ici pour lier l'emploi du temps à sa salle.
        [ForeignKey("SalleId")]
        public virtual Salle? Salle { get; set; }
    }
}