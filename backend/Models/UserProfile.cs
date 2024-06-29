using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string Address { get; set; } = null!;

        public string Image { get; set; } = null!;

        public virtual ICollection<Caterer> Caterers { get; set; } = new List<Caterer>();

        public virtual User? User { get; set; } = null!;
        public UserProfile()
        {
            Id = 0;
            User = null;
            UserId = 0;
            FirstName = "";
            LastName = "";
            PhoneNumber = "";
            Address = "";
            Image = "";
        }
    }
}
