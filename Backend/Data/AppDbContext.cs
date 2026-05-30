using Microsoft.EntityFrameworkCore;
using emigest_back.Models;

namespace emigest_back.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Classe> Classes { get; set; }
        public DbSet<Salle> Salles { get; set; }
        public DbSet<EmploiDuTemps> EmploisDuTemps { get; set; }
        public DbSet<Professeur> Professeurs { get; set; }
    }
}