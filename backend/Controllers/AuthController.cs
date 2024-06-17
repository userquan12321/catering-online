﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserDbContext context) : ControllerBase {
        private readonly UserDbContext _context = context;
        private readonly User user = new();
        private readonly UserProfile userProfile = new();

        // POST api/Auth/register
        [HttpPost("register")]
        public async Task<ActionResult<UserRegister>> Register(UserRegister request) {
            // Validate
            if (_context.Users.Any(x => x.Email == request.Email)) {
                return BadRequest("Email already exist");
            }
            if (ModelState.IsValid == false) {
                return BadRequest("Invalid register detail");
            }
            // Add user
            user.Email = request.Email;
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            // Add user profile
            userProfile.UserID = user.ID;
            userProfile.FirstName = request.FirstName;
            userProfile.LastName = request.LastName;
            userProfile.Address = request.Address;
            userProfile.PhoneNumber = request.PhoneNumber;
            _context.UserProfiles.Add(userProfile);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        // POST api/Auth/login
        [HttpPost("login")]
        public async Task<ActionResult<UserLogin>> Login(UserLogin request) {
            var getUser = await _context.Users.Where(x => x.Email == request.Email).FirstOrDefaultAsync();
            // Validate
            if (getUser == null) {
                return NotFound("Email not found");
            }
            if (BCrypt.Net.BCrypt.Verify(request.Password, getUser.Password) == false) {
                return BadRequest("Wrong password");
            }
            if (ModelState.IsValid == false) {
                return BadRequest("Invalid login detail");
            }
            // Session
            HttpContext.Session.SetString("sid", HttpContext.Session.Id);
            HttpContext.Session.SetInt32("uid", getUser.ID);
            HttpContext.Session.SetString("role", getUser.Type.ToString());
            await HttpContext.Session.CommitAsync();

            // Auth cookie
            var claims = new List<Claim> {
                    new Claim("UID", getUser.ID.ToString()),
                    new Claim(ClaimTypes.Role, getUser.Type.ToString()),
                };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties {
                IsPersistent = false
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return Ok("Logged in successfully");
        }

        // POST api/Auth/logout
        [HttpPost("logout")]
        public async Task<ActionResult> Logout() {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Remove("sid");
            HttpContext.Session.Remove("uid");
            HttpContext.Session.Remove("role");
            await HttpContext.Session.CommitAsync();

            return Ok("Logged out successfully");
        }
    }
}
