using backend.Helpers;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	[Authorize(Roles = "Admin, Customer, Caterer")]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController(ApplicationDbContext context) : ControllerBase
	{
		[HttpGet("profile")]
		public async Task<ActionResult> GetProfile()
		{
			try
			{
				int userId = UserHelper.GetValidUserId(HttpContext.User);

				var profile = await context.Profiles
					.Where(x => x.UserId == userId)
					.Join(context.Users, profile => profile.UserId, user => user.Id, (profile, user) => new
					{
						profile.FirstName,
						profile.LastName,
						profile.Address,
						profile.PhoneNumber,
						profile.Image,
						user.Email,
						user.Type
					})
					.FirstOrDefaultAsync();
				if (profile == null)
				{
					return NotFound("User not found.");
				}
				return Ok(profile);
			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(ex.Message);
			}

		}

		[HttpPut("update-profile")]
		public async Task<ActionResult> UpdateProfile(UpdateProfileDTO request)
		{
			try
			{
				int userId = UserHelper.GetValidUserId(HttpContext.User);

				var profile = await context.Profiles
					.Where(x => x.UserId == userId)
					.FirstOrDefaultAsync();
				var user = await context.Users.FindAsync(userId);
				if (profile == null || user == null)
				{
					return NotFound("User not found.");
				}
				if (ModelState.IsValid == false)
				{
					return BadRequest("Invalid input.");
				}
				profile.FirstName = request.FirstName;
				profile.LastName = request.LastName;
				profile.PhoneNumber = request.PhoneNumber;
				profile.Address = request.Address;
				profile.Image = request.Image;
				user.UpdatedAt = DateTime.UtcNow;
				await context.SaveChangesAsync();
				return Ok("Profile updated.");

			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(ex.Message);
			}
		}

		[HttpPut("change-password")]
		public async Task<ActionResult> ChangePassword(ChangePasswordDTO request)
		{
			try
			{
				int userId = UserHelper.GetValidUserId(HttpContext.User);

				var user = await context.Users.FindAsync(userId);
				if (user == null)
				{
					return NotFound("User not found.");
				}
				if (BCrypt.Net.BCrypt.Verify(request.OldPassword, user.Password) == false)
				{
					return BadRequest("Wrong password.");
				}
				if (ModelState.IsValid == false)
				{
					return BadRequest("Invalid input.");
				}
				user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
				user.UpdatedAt = DateTime.UtcNow;
				await context.SaveChangesAsync();
				return Ok("Password changed.");
			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(ex.Message);
			}
		}
	}
}
