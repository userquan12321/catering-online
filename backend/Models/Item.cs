using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    
    [Index(nameof(Name), IsUnique = true)]
    public class Item
    {
        public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Image { get; set; } = null!;

    public int ServesCount { get; set; }

    public decimal Price { get; set; }

    public int CatererId { get; set; }

    public int CuisineId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual Caterer Caterer { get; set; } = null!;

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
    }
}