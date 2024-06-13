using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserDbContext context, IConfiguration configuration) : ControllerBase {
        private readonly UserDbContext _context = context;
        private readonly IConfiguration _configuration = configuration;
        private readonly User user = new User();
        private readonly UserProfile userProfile = new UserProfile();

        // GET: api/[controller]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser() {
            return await _context.Users.ToListAsync();
        }

        // POST: api/[controller]/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegister request) {
            // Validate
            if (_context.Users.Any(x => x.Email == request.Email)) {
                return BadRequest("Email already exist");
            }
            if (ModelState.IsValid) {
                user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
                user.CreatedAt = DateTime.UtcNow;
                user.UpdatedAt = DateTime.UtcNow;
                user.Email = request.Email;
                userProfile.FirstName = request.FirstName; 
                userProfile.LastName = request.LastName;
                userProfile.Address = request.Address;
                userProfile.PhoneNumber = request.PhoneNumber;
                await _context.Users.AddAsync(user);
                await _context.UserProfiles.AddAsync(userProfile);
                await _context.SaveChangesAsync();
            }
            return Ok("User created successfully");
        }
        // POST: api/[controller]/login
        [HttpPost("login")]
        public async Task<ActionResult> Login(UserLogin request) {
            var getUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);
            // Validate
            if (getUser == null) {
                return BadRequest("Email not found");
            }
            if (!BCrypt.Net.BCrypt.Verify(request.Password, getUser.Password)) {
                return BadRequest("Wrong password");
            }
            string token = GenerateToken(request.Email);
            return Ok(token);
        }
        // JWT
        private string GenerateToken(string email) {
            var getID = _context.Users.Where(x => x.Email == email).Select(x => x.ID).FirstOrDefault();
            var getType = _context.Users.Where(x => x.Email == email).Select(x => x.Type).FirstOrDefault();
            // JWT Key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            // JWT Claim
            var claims = new List<Claim> {
                new (JwtRegisteredClaimNames.Sub, getID.ToString()),
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new (JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
                new (JwtRegisteredClaimNames.Exp, DateTimeOffset.UtcNow.AddSeconds(600).ToUnixTimeSeconds().ToString())
            };
            if (getType == Models.User.UserType.Customer) {
                claims.Add(new Claim(ClaimTypes.Role, "0"));
            }
            if (getType == Models.User.UserType.Caterer) {
                claims.Add(new Claim(ClaimTypes.Role, "1"));
            }
            if (getType == Models.User.UserType.Admin) {
                claims.Add(new Claim(ClaimTypes.Role, "2"));
            }
            // JWT Token
            var token = new JwtSecurityToken(
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                claims,
                null,
                DateTime.UtcNow.AddSeconds(3600), //Jwt expire time
                credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
