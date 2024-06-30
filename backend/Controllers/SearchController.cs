using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController(ApplicationDbContext context) : ControllerBase
    {
        // User search caterer with cuisine
        [HttpGet("caterers")]
        public async Task<ActionResult> SearchCaterers(string? cuisine)
        {
            var query = from c in context.Caterers
                        join p in context.Profiles on c.ProfileId equals p.Id
                        join i in context.Items on c.Id equals i.CatererId
                        join ct in context.CuisineTypes on i.CuisineId equals ct.Id
                        select (new
                        {
                            c.Id,
                            p.FirstName,
                            p.LastName,
                            p.Image,
                            ct.CuisineName
                        });
            if (!string.IsNullOrEmpty(cuisine))
            {
                query = query.Where(a => a.CuisineName == cuisine);
            }
            query = query.OrderBy(a => a.Id);
            var result = await query.ToListAsync();
            return Ok(result);
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
