using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        // GET: api/Search/caterer
        [HttpGet("caterer")]
        public async Task<ActionResult> SearchCaterers(string? cuisine)
        {
            // Get caterer with cuisine
            var query = from c in _context.Caterers
                        join p in _context.UserProfiles on c.ProfileID equals p.ID
                        join i in _context.Items on c.ID equals i.CatererID
                        join ct in _context.CuisineTypes on i.CuisineID equals ct.ID
                        select (new 
                        { 
                            c.ID, p.FirstName, p.LastName, ct.CuisineName
                        });
            if (!string.IsNullOrEmpty(cuisine))
            {
                query = query.Where(a => a.CuisineName == cuisine);
            }
            query = query.OrderBy(a => a.ID);
            var result = await query.ToListAsync();
            return Ok(result);
        }

        // GET: api/Search/caterer/id
        [HttpGet("caterer/{id}")]
        public async Task<ActionResult> GetCatererItems(int id)
        {
            if (_context.Caterers.Any(x => x.ID == id) == false)
            {
                return NotFound("Caterer not found");
            }
            // Get caterer item list
            var query = from c in _context.Caterers
                        where c.ID == id
                        join p in _context.UserProfiles on c.ProfileID equals p.ID
                        join i in _context.Items on c.ID equals i.CatererID into itemGroup
                        select (new
                        {
                            c.ID, p.FirstName, p.LastName,
                            itemList = itemGroup.Select(i => new 
                            {
                                i.ID, i.Name, i.Image, i.CatererID, i.CuisineID, i.ServesCount, i.Price
                            })
                        });
            query = query.OrderBy(a => a.ID);
            var result = await query.ToListAsync();
            return Ok(result);
        }
    }
}
