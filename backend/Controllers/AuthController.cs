using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using backend.Models.DTO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(ApplicationDbContext context) : ControllerBase
    {
        private User _user = new();
        private Profile _profile = new();
        private Caterer _caterer = new();

        // POST: api/Auth/register
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO request)
        {
            if (context.Users.Any(x => x.Email == request.Email))
            { 
                return BadRequest("Email already exist"); 
            }
            if (ModelState.IsValid == false) 
            { 
                return BadRequest("Invalid input"); 
            }
            // Add _user to Users table
            _user.Type = request.Type;
            _user.Email = request.Email;
            _user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            _user.CreatedAt = DateTime.UtcNow;
            _user.UpdatedAt = DateTime.UtcNow;
            context.Users.Add(_user);
            await context.SaveChangesAsync();

            // Add _user _profile to Profiles table
            _profile.UserId = _user.Id;
            _profile.FirstName = request.FirstName;
            _profile.LastName = request.LastName;
            _profile.Address = request.Address;
            _profile.PhoneNumber = request.PhoneNumber;
            context.Profiles.Add(_profile);
            await context.SaveChangesAsync();

            // Add _caterer to Caterers table
            if (request.Type == Models.User.UserType.Caterer)
            {
                _caterer.ProfileId = _profile.Id;
                context.Caterers.Add(_caterer);
                await context.SaveChangesAsync();
            }

            return Ok("User registered successfully");
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO request)
        {
            var getUser = await context.Users.Where(x => x.Email == request.Email).FirstOrDefaultAsync();
            if (getUser == null)
            { 
                return NotFound("Email not found"); 
            }
            var getProfile = await context.Profiles.Where(x => x.UserId == getUser.Id).FirstOrDefaultAsync();
            if (getProfile == null)
            {
                return NotFound("Profile not found");
            }
            if (BCrypt.Net.BCrypt.Verify(request.Password, getUser.Password) == false) 
            { 
                return BadRequest("Wrong password"); 
            }
            if (ModelState.IsValid == false)
            { 
                return BadRequest("Invalid input"); 
            }
            // Create session
            HttpContext.Session.SetString("sid", HttpContext.Session.Id);
            HttpContext.Session.SetInt32("uid", getUser.Id);
            HttpContext.Session.SetInt32("pid", getProfile.Id);
            if (getUser.Type == Models.User.UserType.Caterer)
            {
                var getCaterer = await context.Caterers.Where(x => x.ProfileId == getProfile.Id).FirstOrDefaultAsync();
                if (getCaterer == null)
                {
                    return NotFound("Caterer not found");
                }
                HttpContext.Session.SetInt32("cid", getCaterer.Id);
            }
            await HttpContext.Session.CommitAsync();

            // Create authentication cookie
            var claims = new List<Claim> {
                    new("userId", getUser.Id.ToString()),
                    new(ClaimTypes.Role, getUser.Type.ToString()),
                };
            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = false
            };
            // Create encrypted cookie and adds it to the current response.
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return Ok(new { UserType = getUser.Type, FirstName = getProfile.FirstName });
        }

        // POST: api/Auth/logout
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            // Clear authentication cookie
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            // Clear session
            HttpContext.Session.Remove("sid");
            HttpContext.Session.Remove("uid");
            HttpContext.Session.Remove("pid");
            HttpContext.Session.Remove("cid");
            HttpContext.Session.Clear();
            await HttpContext.Session.CommitAsync();

            return Ok("Logged out successfully");
        }
    }
}
