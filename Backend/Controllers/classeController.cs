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
    /// Contrôleur pour la gestion des classes académiques de l'EMIT
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ClassesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClassesController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère la liste de toutes les classes
        /// </summary>
        /// <returns>Liste des classes</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Classe>>> GetClasses()
        {
            return await _context.Classes.ToListAsync();
        }

        /// <summary>
        /// Récupère une classe par son identifiant
        /// </summary>
        /// <param name="id">ID de la classe</param>
        /// <returns>La classe trouvée ou 404</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Classe>> GetClasse(int id)
        {
            var classe = await _context.Classes.FindAsync(id);

            if (classe == null)
            {
                return NotFound(new { message = $"Classe avec l'ID {id} introuvable." });
            }

            return classe;
        }

        /// <summary>
        /// Crée une nouvelle classe
        /// </summary>
        /// <param name="classe">Données de la classe</param>
        /// <returns>La classe créée avec son ID</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Classe>> PostClasse(Classe classe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Classes.Add(classe);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetClasse),
                new { id = classe.Id },
                classe
            );
        }

        /// <summary>
        /// Met à jour une classe existante
        /// </summary>
        /// <param name="id">ID de la classe</param>
        /// <param name="classe">Nouvelles données</param>
        /// <returns>Statut de l'opération</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutClasse(int id, Classe classe)
        {
            if (id != classe.Id)
            {
                return BadRequest(new { message = "L'ID dans l'URL ne correspond pas à celui du corps." });
            }

            _context.Entry(classe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClasseExists(id))
                {
                    return NotFound(new { message = $"Classe avec l'ID {id} introuvable." });
                }
                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Supprime une classe par son identifiant
        /// </summary>
        /// <param name="id">ID de la classe</param>
        /// <returns>Statut de l'opération</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteClasse(int id)
        {
            var classe = await _context.Classes.FindAsync(id);

            if (classe == null)
            {
                return NotFound(new { message = $"Classe avec l'ID {id} introuvable." });
            }

            _context.Classes.Remove(classe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Recherche des classes par niveau ou mention
        /// </summary>
        /// <param name="niveau">Filtre par niveau (optionnel)</param>
        /// <param name="mention">Filtre par mention (optionnel)</param>
        /// <returns>Liste filtrée des classes</returns>
        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Classe>>> SearchClasses(
            [FromQuery] string? niveau,
            [FromQuery] string? mention)
        {
            var query = _context.Classes.AsQueryable();

            if (!string.IsNullOrWhiteSpace(niveau))
            {
                query = query.Where(c => c.Niveau.Contains(niveau));
            }

            if (!string.IsNullOrWhiteSpace(mention))
            {
                query = query.Where(c => c.Mention.Contains(mention));
            }

            return await query.ToListAsync();
        }

        #region Helpers
        private bool ClasseExists(int id)
        {
            return _context.Classes.Any(e => e.Id == id);
        }
        #endregion
    }
}