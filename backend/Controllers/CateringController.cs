using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CateringController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private Item item = new();
        private CuisineType cuisine = new();

        // GET: api/Caterer/items
        [Authorize(Roles = "Admin,Caterer")]
        [HttpGet("items")]
        public async Task<ActionResult> GetItems()
        {
            var userId = HttpContext.Session.GetInt32("uid");
            if (userId == null)
            {
                return Unauthorized("You must log in");
            }

            var items = await _context.Items
                .Where(i => i.Caterer.ID == userId)
                .Select(i => new {
                    i.ID,
                    i.Name,
                    i.Image,
                    i.ServesCount,
                    i.Price,
                    i.CuisineType.CuisineName,
                    i.CreatedAt,
                    i.UpdatedAt
                })
                .ToListAsync();

            return Ok(items);
        }

        // POST: api/Caterer/items
        [Authorize(Roles = "Admin,Caterer")]
        [HttpPost("items")]
        public async Task<ActionResult> AddItem(ItemDTO req)
        {
            var userId = HttpContext.Session.GetInt32("uid");
            if (userId == null)
            {
                return Unauthorized("You must log in");
            }

            var caterer = await _context.Caterers.FirstOrDefaultAsync(c => c.ID == userId);
            if (caterer == null)
            {
                return NotFound("Caterer not found.");
            }

            item.CatererID = caterer.ID;
            item.Name =  req.Name;
            item.Price = req.Price;
            item.ServesCount = req.ServesCount;
            item.Image = req.Image;
            item.CreatedAt = DateTime.UtcNow;
            item.UpdatedAt = DateTime.UtcNow;

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItems), new { id = item.ID }, item);
        }

        // PUT: api/Caterer/items/{id}
        [Authorize(Roles = "Admin,Caterer")]
        [HttpPut("items/{id}")]
        public async Task<ActionResult> UpdateItem(int id, ItemDTO item)
        {
            var userId = HttpContext.Session.GetInt32("uid");
            if (userId == null)
            {
                return Unauthorized("You must log in");
            }

            var existingItem = await _context.Items
                .Include(i => i.Caterer)
                .FirstOrDefaultAsync(i => i.ID == id && i.Caterer.ID == userId);

            if (existingItem == null)
            {
                return NotFound("Item not found.");
            }

            existingItem.Name = item.Name;
            existingItem.Image = item.Image;
            existingItem.ServesCount = item.ServesCount;
            existingItem.Price = item.Price;
            existingItem.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok("Item updated successfully.");
        }

        // DELETE: api/Caterer/items/{id}
        [Authorize(Roles = "Admin,Caterer")]
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
                .FirstOrDefaultAsync(i => i.ID == id && i.Caterer.ID == userId);

            if (item == null)
            {
                return NotFound("Item not found.");
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok("Item deleted successfully.");
        }

        // GET: api/Caterer/cuisines
        [Authorize(Roles = "Admin,Caterer")]
        [HttpGet("cuisines")]
        public async Task<ActionResult> GetCuisines()
        {
            var cuisines = await _context.CuisineTypes
                .Select(ct => new {
                    ct.ID,
                    ct.CuisineName
                })
                .ToListAsync();

            return Ok(cuisines);
        }

        // POST: api/Caterer/cuisines
        [Authorize(Roles = "Admin")]
        [HttpPost("cuisines")]
        public async Task<ActionResult> AddCuisine(CuisineDTO req)
        {
            cuisine.CuisineName = req.CuisineName;
            cuisine.CreatedAt = DateTime.UtcNow;
            cuisine.UpdatedAt = DateTime.UtcNow;

            _context.CuisineTypes.Add(cuisine);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCuisines), new { id = cuisine.ID }, cuisine);
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
