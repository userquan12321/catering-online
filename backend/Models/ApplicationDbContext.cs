using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Caterer> Caterers { get; set; }
        // public DbSet<Message> Messages { get; set; }
        // public DbSet<FavoriteList> FavoriteLists { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<CuisineType> CuisineTypes { get; set; }
        // public DbSet<Booking> Bookings { get; set; }
    }
}