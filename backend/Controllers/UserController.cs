using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using backend.Models.Users;

namespace backend.Controllers {
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(UserDbContext context) : ControllerBase {
        private readonly UserDbContext _context = context;

        // GET: api/User/profile
        [HttpGet("profile")]
        public async Task<ActionResult> GetUserProfile() {
            var userID = HttpContext.Session.GetInt32("uid");
            // Validate
            if (userID == null) {
                return Unauthorized("You must log in");
            }
            var userProfile = await _context.UserProfiles
                                            .Where(x => x.UserID == userID)
                                            .Select(x => new { 
                                                x.FirstName,
                                                x.LastName, 
                                                x.PhoneNumber, 
                                                x.Address
                                            })
                                            .FirstOrDefaultAsync();
            // Validate
            if (userProfile == null) {
                return NotFound("User not found");
            }
            return Ok(userProfile);
        }

        // PUT: api/User/profile
        [HttpPut("profile")]
        public async Task<ActionResult> PutUserProfile(UserUpdateProfile request) {
            var userID = HttpContext.Session.GetInt32("uid");
            // Validate
            if (userID == null) {
                return Unauthorized("You must log in");
            }
            var userProfile = await _context.UserProfiles.FindAsync(userID);
            var user = await _context.Users.FindAsync(userID);
            // Validate
            if (userProfile == null || user == null) {
                return NotFound("User not found.");
            }
            if (ModelState.IsValid == false) {
                return BadRequest("Invalid profile detail");
            }
            // Update detail
            userProfile.FirstName = request.FirstName;
            userProfile.LastName = request.LastName;
            userProfile.PhoneNumber = request.PhoneNumber;
            userProfile.Address = request.Address;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok("Profile updated successfully.");
        }

        // GET: api/User/loginDetail
        [HttpGet("loginDetail")]
        public async Task<ActionResult> GetUserLoginDetail() {
            var userID = HttpContext.Session.GetInt32("uid");
            if (userID == null) {
                return Unauthorized("You must log in");
            }
            var userLoginDetail = await _context.Users
                                            .Where(x => x.ID == userID)
                                            .Select(x => new {
                                                x.Email
                                            })
                                            .FirstOrDefaultAsync();
            if (userLoginDetail == null) {
                return NotFound("User not found");
            }
            return Ok(userLoginDetail);
        }

        // PUT: api/User/loginDetail
        [HttpPut("loginDetail")]
        public async Task<ActionResult> PutUserLoginDetail(UserUpdateLoginDetail request) {
            var userID = HttpContext.Session.GetInt32("uid");
            // Validate
            if (userID == null) {
                return Unauthorized("You must log in");
            }
            var user = await _context.Users.FindAsync(userID);
            // Validate
            if (user == null) {
                return NotFound("User not found.");
            }
            if (BCrypt.Net.BCrypt.Verify(request.OldPassword, user.Password) == false) {
                return BadRequest("Wrong password");
            }
            if (ModelState.IsValid == false) {
                return BadRequest("Invalid login detail");
            }
            // Update detail
            user.Email = request.Email;
            user.Password = request.NewPassword;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok("Login detail updated successfully.");
        }
    }
}
