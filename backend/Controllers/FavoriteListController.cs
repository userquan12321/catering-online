using backend.Helpers;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize(Roles = "Admin, Customer, Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteListController(ApplicationDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetCustomerFavoriteCaterers()
        {
            try
            {
                int userId = UserHelper.GetValidUserId(HttpContext.User);

                var favorites = await context.FavoriteList
                  .Where(f => f.UserId == userId)
                  .ToListAsync();
                return Ok(favorites);

            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }

        }

        [HttpPost]
        public async Task<ActionResult> AddFavoriteCaterer(FavoriteDTO request)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                int userId = UserHelper.GetValidUserId(HttpContext.User);

                var checkFavorite = await context.FavoriteList
                    .Where(x => x.UserId == userId && x.CatererId == request.CatererId)
                    .FirstOrDefaultAsync();

                if (checkFavorite != null)
                {
                    return BadRequest("Caterer already added to favorite.");
                }

                Favorite favorite = new()
                {
                    UserId = userId,
                    CatererId = request.CatererId,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };
                context.FavoriteList.Add(favorite);
                await context.SaveChangesAsync();
                return Ok("Caterer added to favorite.");

            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpDelete("{favoriteId}")]
        public async Task<IActionResult> DeleteFavorite(int favoriteId)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                int userId = UserHelper.GetValidUserId(HttpContext.User);

                var favorite = await context.FavoriteList
                    .Where(x => x.UserId == userId && x.Id == favoriteId)
                    .FirstOrDefaultAsync();

                if (favorite == null)
                {
                    return NotFound("Favorite caterer not found.");
                }
                context.FavoriteList.Remove(favorite);
                await context.SaveChangesAsync();
                return Ok("Favorite caterer deleted.");

            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }

        }
    }
}