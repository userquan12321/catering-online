using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Linq;
using System;
using backend.Models.DTO;

namespace backend.Controllers
{
    //[Authorize(Roles = "Caterer")]
    [Route("api/[controller]")]
    [ApiController]
    public class CatererController(ApplicationDbContext context) : ControllerBase
    {
        private Item _item = new();

        // GET: api/Caterer/items
        [HttpGet("items")]
        public async Task<ActionResult> GetItems()
        {
            var cid = HttpContext.Session.GetInt32("cid");
            if (cid == null)
            {
                return NotFound("Caterer id not found");
            }
            // Get _item for current caterer
            var items = await context.Items
                .Where(i => i.CatererId == cid.Value)
                .Select(i => new {
                    i.Id,
                    i.Name,
                    i.Image,
                    i.ServesCount,
                    i.Price,
                    i.CuisineId,
                    i.CreatedAt,
                    i.UpdatedAt
                })
                .ToListAsync();

            return Ok(items);
        }

        // POST: api/Caterer/items
        [HttpPost("items")]
        public async Task<ActionResult> AddItem(ItemDTO request)
        {
            var cid = HttpContext.Session.GetInt32("cid");
            if (cid == null)
            {
                return NotFound("Caterer id not found");
            }
            // Add _item
            request.CatererId = cid.Value;
            _item.CatererId = request.CatererId;
            _item.CuisineId = request.CuisineId;
            _item.Name =  request.Name;
            _item.Price = request.Price;
            _item.ServesCount = request.ServesCount;
            _item.Image = request.Image;
            _item.CreatedAt = DateTime.UtcNow;
            _item.UpdatedAt = DateTime.UtcNow;
            context.Items.Add(_item);
            await context.SaveChangesAsync();

            return Ok("Item created successfully");
        }

        // PUT: api/Caterer/items/{id}
        [HttpPut("items/{id}")]
        public async Task<ActionResult> UpdateItem(int id, ItemDTO request)
        {
            var cid = HttpContext.Session.GetInt32("cid");
            if (cid == null)
            {
                return NotFound("Caterer id not found");
            }
            // Get _item from caterer id and _item id
            var existingItem = await context.Items.Where(x => x.CatererId == cid.Value && x.Id == id).FirstOrDefaultAsync();
            if (existingItem == null)
            {
                return NotFound("Item not found.");
            }
            // Update _item
            existingItem.Name = request.Name;
            existingItem.Image = request.Image;
            existingItem.CuisineId = request.CuisineId;
            existingItem.ServesCount = request.ServesCount;
            existingItem.Price = request.Price;
            existingItem.UpdatedAt = DateTime.UtcNow;
            await context.SaveChangesAsync();

            return Ok("Item updated successfully.");
        }

        // DELETE: api/Caterer/items/{id}
        [HttpDelete("items/{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            var cid = HttpContext.Session.GetInt32("cid");
            if (cid == null)
            {
                return NotFound("Caterer id not found");
            }
            // Get _item from caterer id and _item id
            var _item = await context.Items.Where(x => x.CatererId == cid.Value && x.Id == id).FirstOrDefaultAsync();
            if (_item == null)
            {
                return NotFound("Item not found.");
            }
            // Delete _item
            context.Items.Remove(_item);
            await context.SaveChangesAsync();

            return Ok("Item deleted successfully.");
        }

        // GET: api/Caterer/cuisines
        [HttpGet("cuisines")]
        public async Task<ActionResult> GetCuisines()
        {
            var cuisines = await context.CuisineTypes
                .Select(ct => new {
                    ct.Id,
                    ct.CuisineName
                })
                .ToListAsync();

            return Ok(cuisines);
        }
    }
}
