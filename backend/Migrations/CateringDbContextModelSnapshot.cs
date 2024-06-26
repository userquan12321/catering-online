using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<CuisineType> CuisineTypes { get; set; }
        public DbSet<Caterer> Caterers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity<backend.Models.Item>(b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<string>("Name")
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnType("nvarchar(255)");

                b.Property<string>("Image")
                    .IsRequired()
                    .HasColumnType("nvarchar(max)");

                b.Property<decimal>("Serves_count")
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                b.Property<decimal>("Price")
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                b.Property<int>("CatererId")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<int>("CuisineId")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("datetime2");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("datetime2");

                b.HasKey("Id");

                b.HasIndex("CatererId");

                b.HasIndex("CuisineId");

                b.ToTable("Items");
            });

            modelBuilder.Entity<backend.Models.CuisineType>(b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<string>("CuisineName")
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnType("nvarchar(255)");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("datetime2");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("datetime2");

                b.HasKey("Id");

                b.ToTable("CuisineTypes");
            });

            modelBuilder.Entity<backend.Models.Caterer>(b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                b.Property<int>("ProfileId")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<int>("CuisineId")
                    .IsRequired()
                    .HasColumnType("int");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("datetime2");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("datetime2");

                b.HasKey("Id");

                b.HasIndex("CuisineId");

                b.ToTable("Caterers");
            });

            modelBuilder.Entity<backend.Models.Item>(b =>
            {
                b.HasOne(i => i.Caterer)
                    .WithMany(c => c.Items)
                    .HasForeignKey(i => i.CatererId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(i => i.CuisineType)
                    .WithMany(ct => ct.Items)
                    .HasForeignKey(i => i.CuisineId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<backend.Models.Caterer>(b =>
            {
                b.HasOne(c => c.CuisineType)
                    .WithMany(ct => ct.Caterers)
                    .HasForeignKey(c => c.CuisineId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            #pragma warning restore 612, 618
        }
    }
}
