using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly int pageSize = 20;

        // GET: api/Admin/user
        [HttpGet("user")]
        public async Task<ActionResult> GetUsers(int page)
        {
            if (page < 1)
            {
                return BadRequest("Page number must equal or greater than 1");
            }
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return Unauthorized("You must log in");
            }
            // Get all user
            var user = await _context.UserProfiles
                .Join(_context.Users, profile => profile.UserID, user => user.ID, (profile, user) => new
                {
                    user.ID,
                    user.Type,
                    user.Email,
                    user.CreatedAt,
                    user.UpdatedAt,
                    profile.FirstName,
                    profile.LastName,
                    profile.Address,
                    profile.PhoneNumber
                })
                .OrderBy(user => user.ID)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

        // GET: api/Admin/user/id
        [HttpGet("user/{id}")]
        public async Task<ActionResult> GetUser(int id)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return Unauthorized("You must log in");
            }
            // Get a user
            var user = await _context.UserProfiles
                .Where(x => x.UserID == id)
                .Join(_context.Users, profile => profile.UserID, user => user.ID, (profile, user) => new
                {
                    profile.ID,
                    profile.FirstName,
                    profile.LastName,
                    profile.Address,
                    profile.PhoneNumber,
                    user.Email,
                    user.Type,
                    user.CreatedAt,
                    user.UpdatedAt
                })
                                     .FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

        // DELETE: api/Admin/user/id
        [HttpDelete("user/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return Unauthorized("You must log in");
            }
            if (uid == id)
            {
                return BadRequest("Can't delete current admin account");
            }
            var userProfile = await _context.UserProfiles.FindAsync(id);
            if (userProfile == null)
            {
                return NotFound("User not found");
            }
            // Delete a user profile
            _context.UserProfiles.Remove(userProfile);
            await _context.SaveChangesAsync();
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            // Delete a user
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok("User deleted successfully");
        }
    }
}
