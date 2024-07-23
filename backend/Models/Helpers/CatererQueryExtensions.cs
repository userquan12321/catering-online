using Microsoft.EntityFrameworkCore;

namespace backend.Models.Helpers
{
  public static class CatererQueryExtensions
  {
    public static IQueryable<Caterer> BuildCaterersQuery(this IQueryable<Caterer> caterers)
    {
      return caterers
          .Include(c => c.Items)
          .ThenInclude(i => i.CuisineType)
          .Include(c => c.Profile)
          .OrderBy(c => c.Profile!.User!.UpdatedAt);
    }
  }
}