using backend.Models.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CuisinesController(ApplicationDbContext context) : ControllerBase
	{
		[HttpGet]
		public async Task<ActionResult> GetCuisines([FromQuery] int? numberOfCuisines)
		{
			var cuisinesQuery = context.CuisineTypes
					.OrderByDescending(c => c.UpdatedAt)
					.Select(c =>
							new
							{
								c.Id,
								c.CuisineName,
								c.CuisineImage,
								c.Description
							})
					.AsQueryable();

			if (numberOfCuisines.HasValue)
			{
				cuisinesQuery = cuisinesQuery.Take(numberOfCuisines.Value);
			}

			var cuisines = await cuisinesQuery.ToListAsync();

			return Ok(cuisines);
		}


		[Authorize(Roles = "Admin")]
		[HttpPost]
		public async Task<ActionResult> AddCuisine(CuisineDTO request)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest("Invalid data.");
			}

			var checkCuisine = await context.CuisineTypes
					.FirstOrDefaultAsync(c => c.CuisineName == request.CuisineName);

			if (checkCuisine != null)
			{
				return BadRequest("Cuisine already exists.");
			}

			CuisineType cuisine = new()
			{
				CuisineName = request.CuisineName,
				Description = request.Description,
				CuisineImage = request.CuisineImage,
				CreatedAt = DateTime.UtcNow,
				UpdatedAt = DateTime.UtcNow
			};
			context.CuisineTypes.Add(cuisine);
			await context.SaveChangesAsync();
			return Ok("Cuisine added.");
		}

		[Authorize(Roles = "Admin")]
		[HttpPut("{cuisineId}")]
		public async Task<ActionResult> UpdateCuisine(int cuisineId, CuisineDTO request)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest("Invalid data.");
			}
			var cuisine = await context.CuisineTypes.FindAsync(cuisineId);
			if (cuisine == null)
			{
				return NotFound("Cuisine not found.");
			}
			cuisine.CuisineName = request.CuisineName;
			cuisine.Description = request.Description;
			cuisine.CuisineImage = request.CuisineImage;
			cuisine.UpdatedAt = DateTime.UtcNow;
			await context.SaveChangesAsync();
			return Ok("Cuisine updated.");
		}

		[Authorize(Roles = "Admin")]
		[HttpDelete("{cuisineId}")]
		public async Task<ActionResult> DeleteCuisine(int cuisineId)
		{
			var cuisine = await context.CuisineTypes.FindAsync(cuisineId);
			if (cuisine == null)
			{
				return NotFound("Cuisine not found.");
			}
			context.CuisineTypes.Remove(cuisine);
			await context.SaveChangesAsync();
			return Ok("Cuisine deleted");
		}
	}
}