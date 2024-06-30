using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.DTO
{
    public class ItemDTO
    {
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Image { get; set; } = string.Empty;

        public int ServesCount { get; set; }

        public decimal Price { get; set; }

        public int CatererId { get; set; }
        
        public int CuisineId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}