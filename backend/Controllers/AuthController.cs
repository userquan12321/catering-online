using System.Security.Claims;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(ApplicationDbContext context) : ControllerBase
    {
        // Register user
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO request)
        {
            if (context.Users.Any(x => x.Email == request.Email))
            {
                return BadRequest("Email already exist.");
            }
            if (ModelState.IsValid == false)
            {
                return BadRequest("Invalid input.");
            }
            User user = new()
            {
                Type = request.Type,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            Profile profile = new()
            {
                UserId = user.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber
            };
            context.Profiles.Add(profile);
            await context.SaveChangesAsync();
            if (request.Type == Models.User.UserType.Caterer)
            {
                Caterer caterer = new()
                {
                    ProfileId = profile.Id
                };
                context.Caterers.Add(caterer);
                await context.SaveChangesAsync();
            }
            return Ok("User registered.");
        }

        // Login user
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO request)
        {
            var getUser = await context.Users
                .Where(x => x.Email == request.Email)
                .FirstOrDefaultAsync();
            if (getUser == null)
            {
                return NotFound("Email not found.");
            }
            var getProfile = await context.Profiles
                .Where(x => x.UserId == getUser.Id)
                .FirstOrDefaultAsync();
            if (getProfile == null)
            {
                return NotFound("Profile not found.");
            }
            var getCaterer = await context.Caterers
                .Where(x => x.ProfileId == getProfile.Id)
                .FirstOrDefaultAsync();
            int catererId = 0;
            if (getCaterer != null)
            {
                catererId = getCaterer.Id;
            }
            if (BCrypt.Net.BCrypt.Verify(request.Password, getUser.Password) == false)
            {
                return BadRequest("Wrong password.");
            }
            if (ModelState.IsValid == false)
            {
                return BadRequest("Invalid input.");
            }
            // Create session
            HttpContext.Session.SetString("sid", HttpContext.Session.Id);
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
            // Create encrypted cookie and add it to the current response
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);
            return Ok(new { UID = getUser.Id, PID = getProfile.Id, CID = catererId, UserType = getUser.Type, FirstName = getProfile.FirstName });
        }

        // Logout user
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            // Clear authentication cookie
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            // Clear session
            HttpContext.Session.Remove("sid");
            HttpContext.Session.Clear();
            await HttpContext.Session.CommitAsync();
            return Ok("Logged out.");
        }
    }
}
