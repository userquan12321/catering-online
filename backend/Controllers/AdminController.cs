using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using backend.Models.Users;

namespace backend.Controllers {
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase {
        private readonly UserDbContext _context;

        public AdminController(UserDbContext context) {
            _context = context;
        }

        // GET: api/Admin/user
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers() {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Admin/userProfile
        [HttpGet("userProfile")]
        public async Task<ActionResult<IEnumerable<UserProfile>>> GetUserProfiles() {
            return await _context.UserProfiles.ToListAsync();
        }

        // GET: api/Admin/user/5
        [HttpGet("user/{id}")]
        public async Task<ActionResult> GetUser(int id) {
            var user = await _context.Users.FindAsync(id);
            if (user == null) {
                return NotFound("User not found");
            }
            return Ok(user);
        }

        // GET: api/Admin/user/5
        [HttpGet("userProfile/{id}")]
        public async Task<ActionResult> GetUserProfile(int id) {
            var userProfile = await _context.UserProfiles.FindAsync(id);
            if (userProfile == null) {
                return NotFound("User not found");
            }
            return Ok(userProfile);
        }

        // DELETE: api/Admin/user
        [HttpDelete("user/{id}")]
        public async Task<ActionResult> DeleteUser(int id) {
            var user = await _context.Users.FindAsync(id);
            if (user == null) {
                return NotFound("User not found");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok("User deleted successfully");
        }

        // DELETE: api/Admin/user
        [HttpDelete("user/{id}")]
        public async Task<ActionResult> DeleteUserProfile(int id) {
            var userProfile = await _context.UserProfiles.FindAsync(id);
            if (userProfile == null) {
                return NotFound("User not found");
            }
            _context.UserProfiles.Remove(userProfile);
            await _context.SaveChangesAsync();
            return Ok("User profile deleted successfully");
        }
    }
}
