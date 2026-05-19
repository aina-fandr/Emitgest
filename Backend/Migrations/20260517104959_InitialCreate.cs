using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace emigest_back.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admins",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    email = table.Column<string>(type: "text", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admins", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Parcours = table.Column<string>(type: "text", nullable: false),
                    Mention = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Niveau = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    NomDelegue = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    NumDelegue = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    SalleClasse = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "salles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nom = table.Column<string>(type: "text", nullable: false),
                    batiment = table.Column<string>(type: "text", nullable: false),
                    etage = table.Column<int>(type: "integer", nullable: false),
                    capacite = table.Column<int>(type: "integer", nullable: false),
                    equipement = table.Column<string>(type: "text", nullable: true),
                    est_disponible = table.Column<bool>(type: "boolean", nullable: true),
                    cree_le = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    mis_a_jour_le = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_salles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "emplois_du_temps",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    salle_id = table.Column<int>(type: "integer", nullable: false),
                    nom_professeur = table.Column<string>(type: "text", nullable: false),
                    matiere = table.Column<string>(type: "text", nullable: false),
                    jour_semaine = table.Column<string>(type: "text", nullable: false),
                    heure_debut = table.Column<string>(type: "text", nullable: false),
                    heure_fin = table.Column<string>(type: "text", nullable: false),
                    nom_groupe = table.Column<string>(type: "text", nullable: true),
                    semestre = table.Column<string>(type: "text", nullable: true),
                    cree_le = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    mis_a_jour_le = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_emplois_du_temps", x => x.id);
                    table.ForeignKey(
                        name: "FK_emplois_du_temps_salles_salle_id",
                        column: x => x.salle_id,
                        principalTable: "salles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_emplois_du_temps_salle_id",
                table: "emplois_du_temps",
                column: "salle_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admins");

            migrationBuilder.DropTable(
                name: "Classes");

            migrationBuilder.DropTable(
                name: "emplois_du_temps");

            migrationBuilder.DropTable(
                name: "salles");
        }
    }
}
