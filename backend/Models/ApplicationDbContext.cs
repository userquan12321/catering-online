using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Booking> Bookings { get; set; }

        public virtual DbSet<Caterer> Caterers { get; set; }

        public virtual DbSet<CuisineType> CuisineTypes { get; set; }

        public virtual DbSet<FavoriteList> FavoriteLists { get; set; }

        public virtual DbSet<Item> Items { get; set; }

        public virtual DbSet<Message> Messages { get; set; }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<UserProfile> UserProfiles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.BookingStatus)
                    .HasMaxLength(20)
                    .HasDefaultValue("Pending");
                entity.Property(e => e.CatererId).HasColumnName("CatererID");
                entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");
                entity.Property(e => e.Venue).HasMaxLength(255);

                entity.HasOne(d => d.Caterer).WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.CatererId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Customer).WithMany(p => p.Bookings).HasForeignKey(d => d.CustomerId);
            });

            modelBuilder.Entity<Caterer>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.ProfileId).HasColumnName("ProfileID");

                entity.HasOne(d => d.Profile).WithMany(p => p.Caterers).HasForeignKey(d => d.ProfileId);
            });

            modelBuilder.Entity<CuisineType>(entity =>
            {
                entity.HasIndex(e => e.CuisineName, "UQ__CuisineT__2C77DCC834D2F401").IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.CuisineName).HasMaxLength(255);
            });

            modelBuilder.Entity<FavoriteList>(entity =>
            {
                entity.ToTable("FavoriteList");

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.CatererId).HasColumnName("CatererID");
                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Caterer).WithMany(p => p.FavoriteLists)
                    .HasForeignKey(d => d.CatererId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User).WithMany(p => p.FavoriteLists).HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasIndex(e => e.Name, "UQ__Items__737584F6D7CE17D9").IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.CatererId).HasColumnName("CatererID");
                entity.Property(e => e.CuisineId).HasColumnName("CuisineID");
                entity.Property(e => e.Image).HasMaxLength(1000);
                entity.Property(e => e.Name).HasMaxLength(255);
                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Caterer).WithMany(p => p.Items).HasForeignKey(d => d.CatererId);

                entity.HasOne(d => d.CuisineType).WithMany(p => p.Items).HasForeignKey(d => d.CuisineId);
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Content).HasColumnType("text");
                entity.Property(e => e.ReceiverId).HasColumnName("ReceiverID");
                entity.Property(e => e.SenderId).HasColumnName("SenderID");

                entity.HasOne(d => d.Receiver).WithMany(p => p.MessageReceivers)
                    .HasForeignKey(d => d.ReceiverId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Sender).WithMany(p => p.MessageSenders).HasForeignKey(d => d.SenderId);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email, "UQ__Users__A9D10534E6104E05").IsUnique();

                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Email).HasMaxLength(255);
                entity.Property(e => e.Password).HasMaxLength(255);
            });

            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.Address).HasMaxLength(255);
                entity.Property(e => e.FirstName).HasMaxLength(255);
                entity.Property(e => e.Image).HasMaxLength(1000);
                entity.Property(e => e.LastName).HasMaxLength(255);
                entity.Property(e => e.PhoneNumber).HasMaxLength(16);
                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User).WithMany(p => p.UserProfiles).HasForeignKey(d => d.UserId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

