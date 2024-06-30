using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Caterer
    {
        [Key]
        public int Id { get; set; }

        public int ProfileId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ProfileId))]
        public Profile? Profile { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
    }
}