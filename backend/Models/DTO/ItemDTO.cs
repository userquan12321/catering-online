using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.DTO
{
    public class ItemDTO
    {
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string Image { get; set; } = string.Empty;

        [Required]
        public int ServesCount { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int CatererId { get; set; }
        
        [Required]
        public int CuisineId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}