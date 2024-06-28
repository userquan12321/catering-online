using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
   
    public class User
    {
        
        
        public int Id { get; set; }
        public enum UserType
        {
            Customer = 0, Caterer = 1, Admin = 2
        }
        public UserType Type { get; set; }

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        public virtual ICollection<FavoriteList> FavoriteLists { get; set; } = new List<FavoriteList>();

        public virtual ICollection<Message> MessageReceivers { get; set; } = new List<Message>();

        public virtual ICollection<Message> MessageSenders { get; set; } = new List<Message>();

        public virtual ICollection<UserProfile> UserProfiles { get; set; } = new List<UserProfile>();
    

    public User()
    {
        Id = 0;
        Type = 0;
        Email = "";
        Password = "";
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }
}
}
