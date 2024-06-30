using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
<<<<<<< HEAD

=======
>>>>>>> 0d3a11e7efffb2bec340f057f117c13e70a2a64e
    [Index(nameof(Name), IsUnique = true)]
    public class Item
    {
        [Key]
        public int Id { get; set; }

<<<<<<< HEAD
        public string Name { get; set; } = null!;

        public string Image { get; set; } = null!;

        public int ServesCount { get; set; }

        public decimal Price { get; set; }

        public int CatererId { get; set; }

        public int CuisineId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual Caterer Caterer { get; set; } = null!;
        public virtual ICollection<BookingItem> BookingItems { get; set; }

        public virtual CuisineType CuisineType { get; set; } = null!;
        public Item()
        {
            Id = 0;
            Name = "";
            Image = "";
            ServesCount = 0;
            Price = 0M;
            CatererId = 0;
            Caterer = null;
            CuisineId = 0;
            CuisineType = null;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
=======
        [Required]
        public int CatererId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(CatererId))]
        public Caterer? Caterer { get; set; }

        [Required]
        public int CuisineId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(CuisineId))]
        public CuisineType? CuisineType { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string Image { get; set; } = string.Empty;

        [Required]
        public int ServesCount { get; set; }

        [Required]
        [Precision(18, 2)]
        public decimal Price { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
>>>>>>> 0d3a11e7efffb2bec340f057f117c13e70a2a64e
    }
}