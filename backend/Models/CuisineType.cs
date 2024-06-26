using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CuisineType
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string CuisineName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<Item> Items { get; set; }
        public CuisineType()
        {
            ID = 0;
            CuisineName = "";
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            Items = [];
        }
    }
}