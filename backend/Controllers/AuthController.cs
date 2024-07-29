using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Enums;
using backend.Models;
using backend.Models.DTO;
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
      if (request.Type == UserType.Caterer)
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

      if (ModelState.IsValid == false)
      {
        return BadRequest("Invalid input.");
      }

      var claims = new List<Claim> {
                new (JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]!),
                new (JwtRegisteredClaimNames.Jti, _configuration["Jwt:Subject"]!),
                new ("UserId", getUser.Id.ToString()),
                new ("CatererId", catererId.ToString()),
                new (ClaimTypes.Role, getUser.Type.ToString()),
            };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
      var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var accessToken = new JwtSecurityToken(
          _configuration["Jwt:Issuer"],
          _configuration["Jwt:Audience"],
          claims,
          expires: DateTime.UtcNow.AddDays(1),
          signingCredentials: signIn
      );
      string accessTokenValue = new JwtSecurityTokenHandler().WriteToken(accessToken);
      return Ok(new
      {
        AccessToken = accessTokenValue,
        UserType = getUser.Type,
        getProfile.FirstName,
        Avatar = getProfile.Image,
      });
    }
  }
}
