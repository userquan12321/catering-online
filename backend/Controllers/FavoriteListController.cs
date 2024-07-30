using backend.Helpers;
using backend.Models;
using backend.Models.DTO;
using backend.Models.Helpers;
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
		public async Task<ActionResult> GetCustomerFavoriteCaterers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
		{
			try
			{
				int userId = UserHelper.GetValidUserId(HttpContext.User);
				var caterers = await context.FavoriteList
						.Where(f => f.UserId == userId)
					 	.Join(context.Caterers, f => f.CatererId, c => c.Id, (favorite, caterer) => new
						 {
							 caterer.Id,
							 caterer.Profile!.FirstName,
							 caterer.Profile.LastName,
							 caterer.Profile.Image,
							 caterer.Profile.Address,
							 CuisineTypes = caterer.Items.Select(i => i.CuisineType!.CuisineName).Distinct().ToList(),
							 FavoriteId = context.FavoriteList.Where(f => f.UserId == userId && f.CatererId == caterer.Id).Select(f => f.Id).FirstOrDefault()
						 })
						.Skip((page - 1) * pageSize)
						.Take(pageSize)
						.Select(result => result)
						.ToListAsync();

				int total = await context.FavoriteList
					.Where(f => f.UserId == userId)
					.CountAsync();

				if (caterers == null)
				{
					return NotFound();
				}

				return Ok(new
				{
					caterers,
					total
				});

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