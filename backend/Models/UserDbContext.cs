using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class UserDbContext(DbContextOptions options) : DbContext(options) {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }
    }
}
