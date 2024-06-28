using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ItemDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Image { get; set; }
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
        public ItemDTO()
        {
            Name = "";
            Image = "";
            ServesCount = 0;
            Price = 0M;
            CatererId = 0;
            CuisineId = 0;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}