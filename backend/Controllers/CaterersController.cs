using System.Security.Claims;
using backend.Models;
using backend.Models.Helpers;
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
      string? userId = HttpContext.User.FindFirstValue("UserId");
      var caterersQuery = context.Caterers.BuildCaterersQuery();

      string? catererId = HttpContext.User.FindFirstValue("CatererId");

      if (!string.IsNullOrEmpty(catererId) && catererId != "0")
      {
        caterersQuery = caterersQuery.Where(c => c.Id != int.Parse(catererId));
      }

      var total = await context.Caterers.CountAsync();

      var caterers = await caterersQuery
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .Select(c => new
          {
            c.Id,
            c.Profile!.FirstName,
            c.Profile.LastName,
            c.Profile.Image,
            c.Profile.Address,
            CuisineTypes = c.Items.Select(i => i.CuisineType!.CuisineName).Distinct().ToList(),
            FavoriteId = string.IsNullOrEmpty(userId) ? 0 :
      context.FavoriteList.Any(f => f.UserId == int.Parse(userId) && f.CatererId == c.Id)
          ? context.FavoriteList.Where(f => f.UserId == int.Parse(userId) && f.CatererId == c.Id).Select(f => f.Id).FirstOrDefault()
          : 0
          })
          .ToListAsync();

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

    [HttpGet("{id}")]
    public async Task<ActionResult> GetCatererDetail(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (!context.Caterers.Any(c => c.Id == id))
      {
        return NotFound("Caterer not found");
      }

      var query = context.Caterers
        .Where(c => c.Id == id)
        .Join(
          context.Profiles,
          c => c.ProfileId,
          p => p.Id,
          (c, p) => new
          {
            Caterer = new
            {
              UserId = c.ProfileId,
              p.FirstName,
              p.LastName,
              p.Image,
              p.Address,
              p.PhoneNumber,
              p.User!.Email,
              CuisineTypes = c.Items.Select(i => i.CuisineType!.CuisineName).Distinct().ToList(),
            },
            Caterings = c.Items.GroupBy(i => i.ItemType)
                  .Select(group => new
                  {
                    ItemType = group.Key,
                    Items = group.Select(item => new
                    {
                      item.Id,
                      item.Name,
                      item.Image,
                      item.Description,
                      item.ServesCount,
                      item.Price,
                    })
                  })
          }
        );
      var result = await query.FirstOrDefaultAsync();
      return Ok(result);
    }
  }
}
