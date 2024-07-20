using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController(ApplicationDbContext context) : ControllerBase
    {
        [HttpGet("caterers")]
        public async Task<ActionResult> SearchCaterers([FromQuery] int page = 1)
        {
            int pageSize = 10;
            var caterers = await context.Caterers
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Include(c => c.Profile)
                    .Select(c => new
                    {
                        c.Id,
                        c.Profile!.FirstName,
                        c.Profile.LastName,
                        c.Profile.Image,
                        c.Profile.PhoneNumber,
                        c.Profile.User!.Email,
                        c.Profile.UserId,
                        c.Profile.Address,
                    })
                    .ToListAsync();

            if (caterers == null)
            {
                return NotFound();
            }

            return Ok(caterers);
        }

        // Get caterer items
        [HttpGet("caterers/{id}")]
        public async Task<ActionResult> GetCatererItems(int id)
        {
            if (context.Caterers.Any(x => x.Id == id) == false)
            {
                return NotFound("Caterer not found");
            }
            var query = from c in context.Caterers
                        where c.Id == id
                        join p in context.Profiles on c.ProfileId equals p.Id
                        join i in context.Items on c.Id equals i.CatererId into itemGroup
                        select (new
                        {
                            c.Id,
                            p.FirstName,
                            p.LastName,
                            p.Image,
                            itemList = itemGroup.Select(i => new
                            {
                                i.Id,
                                i.Name,
                                i.Image,
                                i.CatererId,
                                i.CuisineId,
                                i.ServesCount,
                                i.Price
                            })
                        });
            query = query.OrderBy(a => a.Id);
            var result = await query.ToListAsync();
            return Ok(result);
        }
    }
}
