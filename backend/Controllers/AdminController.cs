using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController(ApplicationDbContext context) : ControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<ActionResult> GetUsers()
        {
            var users = await context.Profiles
                .Join(context.Users, profile => profile.UserId, user => user.Id, (profile, user) => new
                {
                    user.Id,
                    user.Type,
                    user.Email,
                    user.CreatedAt,
                    user.UpdatedAt,
                    profile.FirstName,
                    profile.LastName,
                    profile.Address,
                    profile.PhoneNumber
                })
                .OrderBy(user => user.Id)
                .ToListAsync();
            return Ok(users);
        }

        // Admin view user
        [HttpGet("users/{userId}")]
        public async Task<ActionResult> GetUser(int userId)
        {
            var user = await context.Profiles
                .Where(x => x.UserId == userId)
                .Join(context.Users, profile => profile.UserId, user => user.Id, (profile, user) => new
                {
                    user.Id,
                    user.Type,
                    user.Email,
                    user.CreatedAt,
                    user.UpdatedAt,
                    profile.FirstName,
                    profile.LastName,
                    profile.Address,
                    profile.PhoneNumber,
                })
                .FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }

        // Admin delete user by user id
        [HttpDelete("users/{userId}")]
        public async Task<ActionResult> DeleteUser(int userId)
        {
            var user = await context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return Ok("User deleted.");
        }

        // Admin view all items
        [HttpGet("items")]
        public async Task<ActionResult> GetItems()
        {
            var items = await context.Items.ToListAsync();
            return Ok(items);
        }

        // Admin delete item
        [HttpDelete("items/{itemId}")]
        public async Task<ActionResult> DeleteItem(int itemId)
        {
            var item = await context.Items.FindAsync(itemId);
            if (item == null)
            {
                return NotFound("Item not found.");
            }
            context.Items.Remove(item);
            await context.SaveChangesAsync();
            return Ok("Item deleted.");
        }
    }
}
