using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly int pageSize = 20;

        // GET: api/Search
        [HttpGet]
        public ActionResult SearchCaterers([FromQuery] QueryObject request)
        {
            // Create query
            var query = _context.Caterers
                .Join(_context.Items, caterer => caterer.ID, item => item.CatererID, (caterer, item) => new
                {
                   caterer.ID,
                   item.CuisineID
                })
                .Join(_context.CuisineTypes, a => a.CuisineID, cuisine => cuisine.ID, (a, cuisine) => new
                {
                    a.ID,
                    cuisine.CuisineName
                })
                .Join(_context.UserProfiles, a => a.ID, profile => profile.ID, (a, profile) => new
                {
                    a.ID,
                    a.CuisineName,
                    profile.FirstName,
                    profile.LastName
                })
                .AsQueryable();
            // Filtering
            query = query.Where(a => a.CuisineName == (request.Cuisine));
            // Sorting
            query = query.OrderBy(a => a.ID);
            // Paging
            query = query.Skip((request.Page - 1) * pageSize).Take(pageSize);
            var result = query.Select(a => new { });
            return Ok(result);
        }
    }
}
