using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    // [Index(nameof(CuisineName), IsUnique = true)]
    public class CuisineType
    {
        public int Id { get; set; }
        public int CatererId { get; set; }
        public int ItemId { get; set; }

        public string CuisineName { get; set; } = null!;


        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
        public virtual Caterer Caterer { get; set; } = null!; // Add this line
        public CuisineType()
        {
            Id = 0;
            CuisineName = "";
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
            Items = [];
        }
    }
}