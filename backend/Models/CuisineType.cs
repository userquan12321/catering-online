using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Index(nameof(CuisineName), IsUnique = true)]
    public class CuisineType
    {
        [Key]
        public int Id { get; set; }

        [StringLength(255)]
        public string CuisineName { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [StringLength(2000)]
        public string CuisineImage { get; set; } = string.Empty;


        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        [JsonIgnore]
        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}