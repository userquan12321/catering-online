using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaterersController(ApplicationDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> SearchCaterers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var caterers = await context.Caterers
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Include(c => c.Items)
                    .ThenInclude(c => c.CuisineType)
                    .Include(c => c.Profile)
                    .Select(c => new
                    {
                        c.Id,
                        c.Profile!.FirstName,
                        c.Profile.LastName,
                        c.Profile.Image,
                        c.Profile.Address,
                        CuisineTypes = c.Items.Select(i => i.CuisineType!.CuisineName).Distinct().ToList()
                    })
                    .ToListAsync();

            var total = await context.Caterers.CountAsync();

            if (caterers == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                caterers,
                total
            });
        }

        // Get caterer items
        [HttpGet("{id}")]
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
