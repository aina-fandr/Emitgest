using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using emigest_back.Models;
using emigest_back.Services;

namespace emigest_back.Controllers
{
    [ApiController]
    [Route("api/prof")]
    public class ProfController : ControllerBase
    {
        private readonly ProfService _profService;

        public ProfController(ProfService profService)
        {
            _profService = profService;
        }

        // POST /api/prof/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginProfDto dto)
        {
            try
            {
                var prof = _profService.Login(dto);
                if (prof == null)
                    return Unauthorized(new { message = "Email ou mot de passe incorrect" });

                return Ok(new
                {
                    success = true,
                    message = "Connexion réussie",
                    data = prof
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // POST /api/prof/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterProfDto dto)
        {
            try
            {
                if (dto.Password != dto.ConfirmPassword)
                    return BadRequest(new { message = "Les mots de passe ne correspondent pas" });

                var prof = _profService.Register(dto, null); // null pour pieceIdentite
                return Ok(new
                {
                    success = true,
                    message = "Compte créé avec succès. En attente de vérification.",
                    data = prof
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // GET /api/prof/check?email=...
        [HttpGet("check")]
        public IActionResult CheckStatus([FromQuery] string email)
        {
            // Vérifier si l'email existe et retourner le statut
            return Ok(new { exists = true, statut = "en_attente" });
        }
        // GET /api/prof/list
        [HttpGet("list")]
        public IActionResult List()
        {
            try
            {
                var profs = _profService.GetAll();
                return Ok(new { success = true, data = profs });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // PUT /api/prof/{id}/approve
        [HttpPut("{id}/approve")]
        public IActionResult Approve(int id)
        {
            try
            {
                _profService.UpdateStatus(id, "approuve");
                return Ok(new { success = true, message = "Professeur approuvé" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // PUT /api/prof/{id}/reject
        [HttpPut("{id}/reject")]
        public IActionResult Reject(int id)
        {
            try
            {
                _profService.UpdateStatus(id, "rejete");
                return Ok(new { success = true, message = "Professeur rejeté" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }

        // GET /api/prof/{id}/piece
        [HttpGet("{id}/piece")]
        public IActionResult GetPiece(int id)
        {
            try
            {
                var path = _profService.GetPiecePath(id);
                if (path == null || !System.IO.File.Exists(path))
                    return NotFound(new { message = "Fichier non trouvé" });
                return PhysicalFile(path, "application/octet-stream");
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }
    }
}