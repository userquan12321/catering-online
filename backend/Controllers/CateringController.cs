using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using System;
using backend.Data;

namespace backend.Controllers
{
    [Authorize(Roles = "Admin,Caterer")]
    [Route("api/[controller]")]
    [ApiController]
    public class CateringController(CateringDbContext context) : ControllerBase
    {
<<<<<<< Updated upstream
        private readonly CateringDbContext _context = context;
=======
        private readonly ApplicationDbContext _context = context;
        private Item item = new();
        private CuisineType cuisine = new();
>>>>>>> Stashed changes

        // GET: api/Caterer/items
        [HttpGet("items")]
        public async Task<ActionResult> GetItems()
        {
            var userId = HttpContext.Session.GetInt32("uid");
            if (userId == null)
            {
                return Unauthorized("You must log in");
            }

            var items = await _context.Items
                .Where(i => i.Caterer.Id == userId)
                .Select(i => new {
                    i.Id,
                    i.Name,
                    i.Image,
                    i.Serves_count,
                    i.Price,
                    i.CuisineType.CuisineName,
                    i.CreatedAt,
                    i.UpdatedAt
                })
                .ToListAsync();

            return Ok(items);
        }

        // POST: api/Caterer/items
        [HttpPost("items")]
        public async Task<ActionResult> AddItem(Item item)
        {
            var userId = HttpContext.Session.GetInt32("uid");
            if (userId == null)
            {
                return Unauthorized("You must log in");
            }

            var caterer = await _context.Caterers.FirstOrDefaultAsync(c => c.Id == userId);
            if (caterer == null)
            {
                return NotFound("Caterer not found.");
            }

            item.CatererId = caterer.Id;
            item.CreatedAt = DateTime.UtcNow;
            item.UpdatedAt = DateTime.UtcNow;

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItems), new { id = item.Id }, item);
        }

        // PUT: api/Caterer/items/{id}
        [HttpPut("items/{id}")]
        public async Task<ActionResult> UpdateItem(int id, Item item)
        {
            var userId = HttpContext.Session.GetInt32("uid");
            if (userId == null)
            {
                return Unauthorized("You must log in");
            }

            var existingItem = await _context.Items
                .Include(i => i.Caterer)
                .FirstOrDefaultAsync(i => i.Id == id && i.Caterer.Id == userId);

            if (existingItem == null)
            {
                return NotFound("Item not found.");
            }

            existingItem.Name = item.Name;
            existingItem.Image = item.Image;
            existingItem.Serves_count = item.Serves_count;
            existingItem.Price = item.Price;
            existingItem.CuisineId = item.CuisineId;
            existingItem.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok("Item updated successfully.");
        }

        // DELETE: api/Caterer/items/{id}
        [HttpDelete("items/{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            var userId = HttpContext.Session.GetInt32("uid");
            if (userId == null)
            {
                return Unauthorized("You must log in");
            }

            var item = await _context.Items
                .Include(i => i.Caterer)
                .FirstOrDefaultAsync(i => i.Id == id && i.Caterer.Id == userId);

            if (item == null)
            {
                return NotFound("Item not found.");
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Item deleted successfully.");
        }

        // GET: api/Caterer/cuisines
        [HttpGet("cuisines")]
        public async Task<ActionResult> GetCuisines()
        {
            var cuisines = await _context.CuisineTypes
                .Select(ct => new {
                    ct.Id,
                    ct.CuisineName
                })
                .ToListAsync();

            return Ok(cuisines);
        }

        // POST: api/Caterer/cuisines
        //[Authorize(Roles = "Admin")]
        [HttpPost("cuisines")]
        public async Task<ActionResult> AddCuisine(CuisineDTO req)
        {
            cuisine.CuisineName = req.CuisineName;
            cuisine.CreatedAt = DateTime.UtcNow;
            cuisine.UpdatedAt = DateTime.UtcNow;

            _context.CuisineTypes.Add(cuisine);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCuisines), new { id = cuisine.Id }, cuisine);
        }

        // PUT: api/Caterer/cuisines/{id}
        [Authorize(Roles = "Admin")]
        [HttpPut("cuisines/{id}")]
        public async Task<ActionResult> UpdateCuisine(int id, CuisineDTO req)
        {
            var existingCuisine = await _context.CuisineTypes.FindAsync(id);
            if (existingCuisine == null)
            {
                return NotFound("Cuisine type not found.");
            }

            existingCuisine.CuisineName = req.CuisineName;
            existingCuisine.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok("Cuisine type updated successfully.");
        }

        // DELETE: api/Caterer/cuisines/{id}
        [Authorize(Roles = "Admin")]
        [HttpDelete("cuisines/{id}")]
        public async Task<ActionResult> DeleteCuisine(int id)
        {
            var cuisine = await _context.CuisineTypes.FindAsync(id);
            if (cuisine == null)
            {
                return NotFound("Cuisine type not found.");
            }

            _context.CuisineTypes.Remove(cuisine);
            await _context.SaveChangesAsync();

            return Ok("Cuisine type deleted successfully.");
        }
    }
}
