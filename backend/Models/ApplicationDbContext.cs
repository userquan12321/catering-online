using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Caterer> Caterers { get; set; }
        public virtual DbSet<CuisineType> CuisineTypes { get; set; }
        public virtual DbSet<FavoriteList> FavoriteList { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Message> Messages { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }

}

