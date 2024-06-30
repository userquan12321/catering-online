using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using backend.Models.DTO;
using System.Security.Claims;
using System.Drawing.Text;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin, Customer, Caterer")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ApplicationDbContext context) : ControllerBase
    {
        // GET: api/User/profile
        [HttpGet("profile")]
        public async Task<ActionResult> GetUserProfile()
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            // Get user detail for current user
            var profile = await context.Profiles
                .Where(x => x.UserId == uid.Value)
                .Join(context.Users, profile => profile.UserId, user => user.Id, (profile, user) => new
                {
                    profile.FirstName,
                    profile.LastName,
                    profile.Address,
                    profile.PhoneNumber,
                    profile.Image,
                    user.Email
                })
                .FirstOrDefaultAsync();
            if (profile == null) 
            { 
                return NotFound("User not found"); 
            }

            return Ok(profile);
        }

        // PUT: api/User/update-profile
        [HttpPut("update-profile")]
        public async Task<ActionResult> UserUpdateProfile(UpdateProfileDTO request)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            var profile = await context.Profiles.Where(x => x.UserId == uid.Value).FirstOrDefaultAsync();
            var user = await context.Users.FindAsync(uid);
            if (profile == null || user == null) 
            { 
                return NotFound("User not found."); 
            }
            if (ModelState.IsValid == false) 
            { 
                return BadRequest("Invalid input"); 
            }
            // Update profile
            profile.FirstName = request.FirstName;
            profile.LastName = request.LastName;
            profile.PhoneNumber = request.PhoneNumber;
            profile.Address = request.Address;
            profile.Image = request.Image;
            user.UpdatedAt = DateTime.UtcNow;
            await context.SaveChangesAsync();
            return Ok("Profile updated successfully.");
        }

        // PUT: api/User/change-password
        [HttpPut("change-password")]
        public async Task<ActionResult> UserChangePassword(ChangePasswordDTO request)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            var user = await context.Users.FindAsync(uid.Value);
            if (user == null) 
            { 
                return NotFound("User not found."); 
            }
            if (BCrypt.Net.BCrypt.Verify(request.OldPassword, user.Password) == false) 
            { 
                return BadRequest("Wrong password"); 
            }
            if (ModelState.IsValid == false) 
            { 
                return BadRequest("Invalid input"); 
            }
            // Change password
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await context.SaveChangesAsync();

            return Ok("Password changed successfully.");
        }
    }
}
