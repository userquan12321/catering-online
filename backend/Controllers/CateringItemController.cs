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

        [HttpPost]
        public async Task<ActionResult> AddItem(ItemDTO request)
        {
            TokenData tokenData = UserHelper.GetRoleAndCatererId(HttpContext.User);
            try
            {
                if (tokenData.UserType == "Caterer" && tokenData.CatererId != 0 && tokenData.CatererId != null)
                {
                    Item item = new()
                    {
                        CatererId = (int)tokenData.CatererId,
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

                return Unauthorized();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }

        }

        [HttpPut("{itemId}")]
        public async Task<ActionResult> UpdateItem(int itemId, ItemDTO request)
        {
            TokenData tokenData = UserHelper.GetRoleAndCatererId(HttpContext.User);
            try
            {
                if (tokenData.UserType == "Caterer" && tokenData.CatererId != 0 && tokenData.CatererId != null)
                {
                    var item = await context.Items
                        .Where(x => x.CatererId == tokenData.CatererId && x.Id == itemId)
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

                return Unauthorized();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpDelete("{itemId}")]
        public async Task<ActionResult> DeleteItem(int itemId)
        {
            TokenData tokenData = UserHelper.GetRoleAndCatererId(HttpContext.User);
            try
            {
                if (tokenData.UserType == "Caterer" && tokenData.CatererId != 0 && tokenData.CatererId != null)
                {
                    var item = await context.Items
                        .Where(x => x.CatererId == tokenData.CatererId && x.Id == itemId)
                        .FirstOrDefaultAsync();
                    if (item == null)
                    {
                        return NotFound("Item not found.");
                    }
                    context.Items.Remove(item);
                    await context.SaveChangesAsync();
                    return Ok("Item deleted.");
                }

                return Unauthorized();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }

        }
    }
}
