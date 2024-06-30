using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin, Customer, Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteListController(ApplicationDbContext context) : ControllerBase
    {
        // a. Customer can view the list of their favourite caterers
        [HttpGet("customer")]
        public async Task<ActionResult<IEnumerable<FavoriteList>>> GetFavoritesForCustomer()
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            return await context.FavoriteLists
                .Where(f => f.UserId == uid.Value)
                .Include(f => f.Caterer)
                .ToListAsync();
        }

        // b. Customer should be able to delete from the list
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavorite(int id)
        {
            var favorite = await context.FavoriteLists.FindAsync(id);
            if (favorite == null)
            {
                return NotFound();
            }

            context.FavoriteLists.Remove(favorite);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}