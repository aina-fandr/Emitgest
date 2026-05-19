using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using emigest_back.Data;
using emigest_back.Models;

namespace emigest_back.Controllers
{
    /// <summary>
    /// Contrôleur pour la gestion des salles de l'EMIT
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class SallesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SallesController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère la liste de toutes les salles
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Salle>>> GetSalles()
        {
            return await _context.Salles
                .OrderBy(s => s.Batiment)
                .ThenBy(s => s.Etage)
                .ThenBy(s => s.Nom)
                .ToListAsync();
        }

        /// <summary>
        /// Récupère une salle par son identifiant
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Salle>> GetSalle(int id)
        {
            var salle = await _context.Salles.FindAsync(id);

            if (salle == null)
            {
                return NotFound(new { message = $"Salle avec l'ID {id} introuvable." });
            }

            return salle;
        }

        /// <summary>
        /// Crée une nouvelle salle
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Salle>> PostSalle(Salle salle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Initialisation des timestamps
            salle.CreeLe = DateTime.UtcNow;
            salle.MisAJourLe = DateTime.UtcNow;

            // EstDisponible par défaut à true si non spécifié
            if (!salle.EstDisponible.HasValue)
            {
                salle.EstDisponible = true;
            }

            _context.Salles.Add(salle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetSalle),
                new { id = salle.Id },
                salle
            );
        }

        /// <summary>
        /// Met à jour une salle existante
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutSalle(int id, Salle salle)
        {
            if (id != salle.Id)
            {
                return BadRequest(new { message = "L'ID dans l'URL ne correspond pas à celui du corps." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Mise à jour du timestamp
            salle.MisAJourLe = DateTime.UtcNow;

            _context.Entry(salle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalleExists(id))
                {
                    return NotFound(new { message = $"Salle avec l'ID {id} introuvable." });
                }
                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Supprime une salle par son identifiant
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteSalle(int id)
        {
            var salle = await _context.Salles.FindAsync(id);

            if (salle == null)
            {
                return NotFound(new { message = $"Salle avec l'ID {id} introuvable." });
            }

            // 🔐 Optionnel : vérifier si la salle est utilisée dans un emploi du temps avant suppression
            // var estUtilisee = await _context.EmploisDuTemps.AnyAsync(e => e.SalleId == id);
            // if (estUtilisee)
            // {
            //     return BadRequest(new { message = "Impossible de supprimer : la salle est utilisée dans un emploi du temps." });
            // }

            _context.Salles.Remove(salle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Recherche de salles par critères (bâtiment, étage, capacité, disponibilité)
        /// </summary>
        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Salle>>> SearchSalles(
            [FromQuery] string? batiment,
            [FromQuery] int? etage,
            [FromQuery] int? capaciteMin,
            [FromQuery] int? capaciteMax,
            [FromQuery] bool? disponible,
            [FromQuery] string? equipement)
        {
            var query = _context.Salles.AsQueryable();

            if (!string.IsNullOrWhiteSpace(batiment))
            {
                query = query.Where(s => s.Batiment.Contains(batiment));
            }

            if (etage.HasValue)
            {
                query = query.Where(s => s.Etage == etage.Value);
            }

            if (capaciteMin.HasValue)
            {
                query = query.Where(s => s.Capacite >= capaciteMin.Value);
            }

            if (capaciteMax.HasValue)
            {
                query = query.Where(s => s.Capacite <= capaciteMax.Value);
            }

            if (disponible.HasValue)
            {
                query = query.Where(s => s.EstDisponible == disponible.Value);
            }

            if (!string.IsNullOrWhiteSpace(equipement))
            {
                query = query.Where(s => s.Equipement != null && s.Equipement.Contains(equipement));
            }

            return await query.OrderBy(s => s.Batiment).ThenBy(s => s.Nom).ToListAsync();
        }

        /// <summary>
        /// Liste des salles disponibles à une capacité donnée
        /// </summary>
        [HttpGet("disponibles")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Salle>>> GetSallesDisponibles(
            [FromQuery] int capaciteRequise = 1)
        {
            return await _context.Salles
                .Where(s => s.EstDisponible == true && s.Capacite >= capaciteRequise)
                .OrderBy(s => s.Capacite)
                .ToListAsync();
        }

        /// <summary>
        /// Statistiques rapides sur les salles
        /// </summary>
        [HttpGet("stats")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<object>> GetSallesStats()
        {
            var total = await _context.Salles.CountAsync();
            var disponibles = await _context.Salles.CountAsync(s => s.EstDisponible == true);
            var capaciteTotale = await _context.Salles.SumAsync(s => (long)s.Capacite);
            var batiments = await _context.Salles.Select(s => s.Batiment).Distinct().ToListAsync();

            return Ok(new
            {
                totalSalles = total,
                sallesDisponibles = disponibles,
                capaciteTotale = capaciteTotale,
                batiments = batiments,
                tauxOccupation = total > 0 ? $"{(total - disponibles) * 100.0 / total:F1}%" : "0%"
            });
        }

        #region Helpers
        private bool SalleExists(int id)
        {
            return _context.Salles.Any(e => e.Id == id);
        }
        #endregion
    }
}