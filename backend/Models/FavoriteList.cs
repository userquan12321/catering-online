using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class FavoriteList
    {
        [Key]
        public int Id { get; set; }

<<<<<<< HEAD
        public int UserId { get; set; }

        public int CatererId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual Caterer Caterer { get; set; } = null!;

        public virtual User User { get; set; } = null!;
=======
        [Required]
        public int UserId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [Required]
        public int CatererId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(CatererId))]
        public Caterer? Caterer { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
>>>>>>> 0d3a11e7efffb2bec340f057f117c13e70a2a64e
    }
}
