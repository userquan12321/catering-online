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

                entity.HasKey(e => e.Id).HasName("PK__Bookings__5DE3A5B191D2667E");

                entity.Property(e => e.Id).HasColumnName("booking_id");
                entity.Property(e => e.BookingDate).HasColumnName("booking_date");
                entity.Property(e => e.CatererId).HasColumnName("caterer_id");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");
                entity.Property(e => e.CustomerId).HasColumnName("customer_id");
                entity.Property(e => e.EventDate).HasColumnName("event_date");
                entity.Property(e => e.PaymentMethod).HasColumnName("PaymentMethod");
                entity.Property(e => e.BookingStatus)
                    .HasMaxLength(50)
                    .HasDefaultValue("Pending")
                    .HasColumnName("status");
                entity.Property(e => e.TotalAmount)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("total_amount");
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
                entity.Property(e => e.Venue)
                    .HasMaxLength(255)
                    .HasColumnName("venue");

                entity.HasOne(d => d.Caterer).WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.CatererId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bookings__catere__4BAC3F29");

                entity.HasOne(d => d.Customer).WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bookings__custom__4AB81AF0");
            });

            modelBuilder.Entity<Caterer>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Caterers__BFFD0FA745D96B07");

                entity.Property(e => e.Id).HasColumnName("caterer_id");
                entity.Property(e => e.ProfileId).HasColumnName("profile_id");
                // entity.Property(e => e.CuisineId).HasColumnName("cuisine_id");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasMany(d => d.CuisineTypes)
             .WithOne(p => p.Caterer)
             .HasForeignKey(p => p.CatererId)
             .OnDelete(DeleteBehavior.ClientSetNull)
             .HasConstraintName("FK_CuisineType_Caterer");


                entity.HasOne(d => d.Profile).WithMany(p => p.Caterers)
                   .HasForeignKey(d => d.ProfileId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK__Profiles__ca_i__3F46685645454644");

            });

            modelBuilder.Entity<CuisineType>(entity =>
            {
                entity.HasIndex(e => e.CuisineName, "UQ__CuisineT__2C77DCC834D2F401").IsUnique();
                entity.Property(e => e.CatererId).HasColumnName("CatererID");
                entity.Property(e => e.ItemId).HasColumnName("ItemID");
                entity.Property(e => e.Id).HasColumnName("ID");
                entity.Property(e => e.CuisineName).HasMaxLength(255);

                entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");


            });

            modelBuilder.Entity<FavoriteList>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Favorite__46ACF4CBA515F89B");

                entity.ToTable("FavoriteList");

                entity.Property(e => e.Id).HasColumnName("favorite_id");
                entity.Property(e => e.CatererId).HasColumnName("caterer_id");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");
                entity.Property(e => e.Id).HasColumnName("customer_id");
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.Caterer).WithMany(p => p.FavoriteLists)
                    .HasForeignKey(d => d.CatererId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FavoriteL__cater__5BE2A6F2");

                entity.HasOne(d => d.User).WithMany(p => p.FavoriteLists)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__FavoriteL__custo__5AE41545B9");
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Items__52020FDD67FBD1D6");

                entity.Property(e => e.Id).HasColumnName("item_id");

                entity.Property(e => e.CatererId).HasColumnName("caterer_id");
                entity.Property(e => e.CuisineId).HasColumnName("cuisine_id");
                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");
                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.ServesCount)
                    .HasColumnName("serves_count");
                entity.Property(e => e.Price)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("price");

                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");


                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.Caterer).WithMany(p => p.Items)
                    .HasForeignKey(d => d.CatererId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Items__caterer_i__5629CD9C");
                entity.HasOne(d => d.CuisineType).WithMany(p => p.Items)
                    .HasForeignKey(d => d.CatererId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Items__caterer_i__562955565CD9C");
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Messages__0BBF6EE6E11D6A45");

                entity.Property(e => e.Id).HasColumnName("message_id");
                entity.Property(e => e.Content).HasColumnName("content");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");
                entity.Property(e => e.ReceiverId).HasColumnName("receiver_id");
                entity.Property(e => e.SenderId).HasColumnName("sender_id");
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.Receiver).WithMany(p => p.MessageReceivers)
                    .HasForeignKey(d => d.ReceiverId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Messages__receiv__5165187F");

                entity.HasOne(d => d.Sender).WithMany(p => p.MessageSenders)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Messages__sender__5070F446");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Users__B9BE370F5DC6DC6F");

                entity.HasIndex(e => e.Email, "UQ__Users__AB6E61648AE41E8C").IsUnique();

                entity.Property(e => e.Id).HasColumnName("user_id");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");
                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");
                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .HasColumnName("user_type");
            });


            modelBuilder.Entity<UserProfile>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Profiles__AEBB701FD3D6338F");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.Id).HasColumnName("profile_id");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .HasColumnName("first_name");
                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .HasColumnName("last_name");
                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(20)
                    .HasColumnName("phone_number");
                entity.Property(e => e.Address).HasMaxLength(1000);
                entity.Property(e => e.Image).HasMaxLength(1000);


                entity.HasOne(d => d.User).WithMany(p => p.UserProfiles)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Profiles__user_i__3F466844");

            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

