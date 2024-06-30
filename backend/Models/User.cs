using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        public enum UserType
        {
            Customer = 0, Caterer = 1, Admin = 2
        }

        [Range(0, 2)]
        public UserType Type { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [StringLength(255)]
        public string Password { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        [JsonIgnore]
        public virtual ICollection<FavoriteList> FavoriteLists { get; set; } = new List<FavoriteList>();

        [JsonIgnore]
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
