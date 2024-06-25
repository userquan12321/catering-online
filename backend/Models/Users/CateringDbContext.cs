using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class CateringDbContext : DbContext
    {
        public CateringDbContext(DbContextOptions<CateringDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<Caterer> Caterers { get; set; }
        public DbSet<CuisineType> CuisineTypes { get; set; }
    }
}
