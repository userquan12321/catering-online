using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Item
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(1000)]
        public string Image { get; set; }
        [Required]
        public int ServesCount { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int CatererID { get; set; }
        [ForeignKey(nameof(CatererID))]
        public Caterer? Caterer { get; set; }
        [Required]
        public int CuisineID { get; set; }
        [ForeignKey(nameof(CuisineID))]
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