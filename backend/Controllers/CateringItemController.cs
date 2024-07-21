using backend.Helpers;
using backend.Models;
using backend.Models.DTO;
using backend.Models.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize(Roles = "Caterer, Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CateringItemController(ApplicationDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetItems()
        {
            TokenData tokenData = UserHelper.GetRoleAndCatererId(HttpContext.User);

            try
            {
                if (tokenData.UserType == "Caterer" && tokenData.CatererId != 0 && tokenData.CatererId != null)
                {
                    var items = await context.Items
                        .Where(i => i.CatererId == tokenData.CatererId)
                        .Select(i => new
                        {
                            i.Id,
                            i.CuisineId,
                            i.Name,
                            i.Price,
                            i.ServesCount,
                            i.Image,
                            i.CuisineType!.CuisineName
                        })
                        .ToListAsync();
                    return Ok(items);
                }

                return Unauthorized();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }


        }

        [HttpPost("{catererId}")]
        public async Task<ActionResult> AddItem(int catererId, ItemDTO request)
        {
            Item item = new()
            {
                CatererId = catererId,
                CuisineId = request.CuisineId,
                Name = request.Name,
                Price = request.Price,
                ServesCount = request.ServesCount,
                Image = request.Image,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            context.Items.Add(item);
            await context.SaveChangesAsync();
            return Ok("Item added.");
        }

        // Caterer update item
        [HttpPut("{catererId}/{itemId}")]
        public async Task<ActionResult> UpdateItem(int catererId, int itemId, ItemDTO request)
        {
            var item = await context.Items
                .Where(x => x.CatererId == catererId && x.Id == itemId)
                .FirstOrDefaultAsync();
            if (item == null)
            {
                return NotFound("Item not found.");
            }
            item.Name = request.Name;
            item.Image = request.Image;
            item.CuisineId = request.CuisineId;
            item.ServesCount = request.ServesCount;
            item.Price = request.Price;
            item.UpdatedAt = DateTime.UtcNow;
            await context.SaveChangesAsync();
            return Ok("Item updated");
        }

        // Caterer delete item
        [HttpDelete("{catererId}/{itemId}")]
        public async Task<ActionResult> DeleteItem(int catererId, int itemId)
        {
            var item = await context.Items
                .Where(x => x.CatererId == catererId && x.Id == itemId)
                .FirstOrDefaultAsync();
            if (item == null)
            {
                return NotFound("Item not found.");
            }
            context.Items.Remove(item);
            await context.SaveChangesAsync();
            return Ok("Item deleted.");
        }
    }
}
