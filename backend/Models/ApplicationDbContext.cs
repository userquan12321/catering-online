using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Profile> Profiles { get; set; }

        public DbSet<Caterer> Caterers { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<Favorite> FavoriteList { get; set; }

        public DbSet<Item> Items { get; set; }

        public DbSet<CuisineType> CuisineTypes { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<BookingItem> BookingItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Receiver)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId);
        }
    }
}
