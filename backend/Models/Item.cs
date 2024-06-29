using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Item
    {
        [Key]
        public int Id { get; set; }

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
    }
}