using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Caterer
    {
        [Key]
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        public virtual ICollection<FavoriteList> FavoriteLists { get; set; } = new List<FavoriteList>();

        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
        public virtual ICollection<CuisineType> CuisineTypes { get; set; } = new List<CuisineType>(); // Add this line

        public virtual UserProfile? UserProfile { get; set; } = null!;
        public Caterer()
        {
            Id = 0;
            UserProfileId = 0;
            UserProfile = null;
            Items = [];
        }
    }
}