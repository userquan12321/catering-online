using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class UserDbContext : DbContext {
        public UserDbContext(DbContextOptions options) : base(options) {
        }
        public virtual DbSet<User> tblUsers { get; set; }
    }
}
