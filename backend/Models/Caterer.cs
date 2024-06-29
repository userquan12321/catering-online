using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Caterer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProfileId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(ProfileId))]
        public Profile? Profile { get; set; }
    }
}