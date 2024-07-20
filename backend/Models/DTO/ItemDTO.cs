using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
    public class ItemDTO
    {
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Image { get; set; } = string.Empty;

        public int ServesCount { get; set; }

        public decimal Price { get; set; }

        public int CuisineId { get; set; }
    }
}