using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Item
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public int ServesCount { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int CatererID { get; set; }
        [ForeignKey("CatererID")]
        public Caterer? Caterer { get; set; }
        [Required]
        public int CuisineID { get; set; }
        [ForeignKey("CuisineID")]
        public CuisineType? CuisineType { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Item()
        {
            ID = 0;
            Name = "";
            Image = "";
            ServesCount = 0;
            Price = 0M;
            CatererID = 0;
            Caterer = null;
            CuisineID = 0;
            CuisineType = null;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
