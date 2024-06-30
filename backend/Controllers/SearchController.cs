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

        // GET: api/Search/caterers
        [HttpGet("caterers")]
        public async Task<ActionResult> SearchCaterers(string? cuisine)
        {
            // Get caterer cuisine
            var query = from c in _context.Caterers
<<<<<<< HEAD
                        join p in _context.UserProfiles on c.UserProfileId equals p.Id
=======
                        join p in _context.Profiles on c.ProfileId equals p.Id
>>>>>>> 0d3a11e7efffb2bec340f057f117c13e70a2a64e
                        join i in _context.Items on c.Id equals i.CatererId
                        join ct in _context.CuisineTypes on i.CuisineId equals ct.Id
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
            query = query.OrderBy(a => a.Id).Take(100);
            var result = await query.ToListAsync();

            return Ok(result);
        }

        // GET: api/Search/caterers/id
        [HttpGet("caterers/{id}")]
        public async Task<ActionResult> GetCatererItems(int id)
        {
            if (_context.Caterers.Any(x => x.Id == id) == false) 
            { 
                return NotFound("Caterer not found"); 
            }
            // Get caterer item list
            var query = from c in _context.Caterers
                        where c.Id == id
<<<<<<< HEAD
                        join p in _context.UserProfiles on c.UserProfileId equals p.Id
=======
                        join p in _context.Profiles on c.ProfileId equals p.Id
>>>>>>> 0d3a11e7efffb2bec340f057f117c13e70a2a64e
                        join i in _context.Items on c.Id equals i.CatererId into itemGroup
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
            query = query.OrderBy(a => a.Id).Take(100);
            var result = await query.ToListAsync();

            return Ok(result);
        }
    }
}
