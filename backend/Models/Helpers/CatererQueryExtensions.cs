using Microsoft.EntityFrameworkCore;

namespace backend.Models.Helpers
{
    public static class CatererQueryExtensions
    {
        public static IQueryable<Caterer> BuildCaterersQuery(this IQueryable<Caterer> caterers, int page, int pageSize)
        {
            return caterers
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(c => c.Items)
                .ThenInclude(i => i.CuisineType)
                .Include(c => c.Profile);
        }
    }
}