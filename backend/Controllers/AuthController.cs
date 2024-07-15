using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
  
        // Register user
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO request)
        {
            if (_context.Users.Any(x => x.Email == request.Email))
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
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            Profile profile = new()
            {
                UserId = user.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber
            };
            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();
            if (request.Type == Models.User.UserType.Caterer)
            {
                Caterer caterer = new()
                {
                    ProfileId = profile.Id
                };
                _context.Caterers.Add(caterer);
                await _context.SaveChangesAsync();
            }
            return Ok("User registered.");
        }

        // Login user
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO request)
        {
            var getUser = await _context.Users
                .Where(x => x.Email == request.Email)
                .FirstOrDefaultAsync();
            if (getUser == null)
            {
                return NotFound("Email not found.");
            }
            var getProfile = await _context.Profiles
                .Where(x => x.UserId == getUser.Id)
                .FirstOrDefaultAsync();
            if (getProfile == null)
            {
                return NotFound("Profile not found.");
            }
            var getCaterer = await _context.Caterers
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

            string accessTokenSecret = _configuration["Secrets:AccessTokenSecret"] ?? "";
            string refreshTokenSecret = _configuration["Secrets:RefreshTokenSecret"] ?? "";
            
            if (accessTokenSecret == "" || refreshTokenSecret == "")
            {
                return StatusCode(500, "Server error.");
            }

            var accessTokenExpiry = TimeSpan.FromHours(24);
            var refreshTokenExpiry = TimeSpan.FromDays(7);

            // Create authentication cookie
            var claims = new List<Claim> {
                    new("userId", getUser.Id.ToString()),
                    new(ClaimTypes.Role, getUser.Type.ToString()),
                };

            var accessToken = GenerateToken(claims, accessTokenSecret, accessTokenExpiry);
            var refreshToken = GenerateToken(claims, refreshTokenSecret, refreshTokenExpiry);

              // Configure HttpOnly cookie for access token
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.Add(accessTokenExpiry)
            };

            Response.Cookies.Append("accessToken", accessToken, cookieOptions);
       
            // Create encrypted cookie and add it to the current response
     
            return Ok(new { 
                RefreshToken = refreshToken,
                UserId = getUser.Id, 
                PID = getProfile.Id, 
                CID = catererId, 
                UserType = getUser.Type, 
                FirstName = getProfile.FirstName 
            });
        }

        private static string GenerateToken(List<Claim> claims, string secret, TimeSpan expiry)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(expiry),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // Logout user
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            Response.Cookies.Delete("accessToken");
            return Ok("Logged out.");
        }
    }
}
