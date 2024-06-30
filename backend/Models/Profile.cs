using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [StringLength(255)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(255)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(20)]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [StringLength(255)]
        public string Address { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Image { get; set; } = string.Empty;
    }
}
