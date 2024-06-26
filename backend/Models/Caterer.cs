using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Caterer
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int ProfileID { get; set; }
        [ForeignKey("ProfileID")]
        public UserProfile? Profile { get; set; }
        public ICollection<Item> Items { get; set; }
        public Caterer()
        {
            ID = 0;
            ProfileID = 0;
            Profile = null;
            Items = [];
        }
    }
}
