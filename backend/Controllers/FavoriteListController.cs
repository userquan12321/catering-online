using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteListController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FavoriteListController(ApplicationDbContext context)
        {
            _context = context;
        }

        // a. Customer can view the list of their favourite caterers
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<IEnumerable<FavoriteList>>> GetFavoritesForCustomer(int customerId)
        {
            return await _context.FavoriteList
                .Where(f => f.UserId == customerId)
                .Include(f => f.Caterer)
                .ToListAsync();
        }

        // b. Customer should be able to delete from the list
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavorite(int id)
        {
            var favorite = await _context.FavoriteList.FindAsync(id);
            if (favorite == null)
            {
                return NotFound();
            }

            _context.FavoriteList.Remove(favorite);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}