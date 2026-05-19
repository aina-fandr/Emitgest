using Microsoft.EntityFrameworkCore;
using emigest_back.Models; // ⚠️ Ajustez selon votre namespace réel (vérifiez dans Program.cs ou .csproj)

namespace emigest_back.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Vos modèles
        public DbSet<Classe> Classes { get; set; }
        public DbSet<Salle> Salles { get; set; }
        public DbSet<EmploiDuTemps> EmploisDuTemps { get; set; }
        public DbSet<Admin> Admins { get; set; }
    }
}