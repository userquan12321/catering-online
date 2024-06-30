using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin, Customer, Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteListController(ApplicationDbContext context) : ControllerBase
    {
        // Customer view the list of their favorite caterers
        [HttpGet("{userId}/favorite")]
        public async Task<ActionResult> GetCustomerFavoriteCaterers(int userId)
        {
            var favorite = await context.FavoriteLists
                .Where(f => f.UserId == userId)
                .ToListAsync();
            return Ok(favorite);
        }

        // Customer delete caterer from favorite
        [HttpDelete("{userId}/favorite/{favoriteId}")]
        public async Task<IActionResult> DeleteFavorite(int userId, int favoriteId)
        {
            var favorite = await context.FavoriteLists
                .Where(x => x.UserId == userId && x.Id == favoriteId)
                .FirstOrDefaultAsync();
            if (favorite == null)
            {
                return NotFound("Favorite caterer not found.");
            }
            context.FavoriteLists.Remove(favorite);
            await context.SaveChangesAsync();
            return Ok("Favorite caterer deleted.");
        }
    }
}