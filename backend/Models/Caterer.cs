using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Caterer
    {
        public int Id { get; set; }

        public int ProfileId { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        public virtual ICollection<FavoriteList> FavoriteLists { get; set; } = new List<FavoriteList>();

        public virtual ICollection<Item> Items { get; set; } = new List<Item>();

        public virtual UserProfile? Profile { get; set; } = null!;
        public Caterer()
        {
            Id = 0;
            ProfileId = 0;
            Profile = null;
            Items = [];
        }
    }
}