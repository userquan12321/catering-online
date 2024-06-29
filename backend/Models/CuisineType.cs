using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Index(nameof(CuisineName), IsUnique = true)]
    public class CuisineType
    {
        [Key]
        public int Id { get; set; }
        public int CatererId { get; set; }
        public int ItemId { get; set; }

        public string CuisineName { get; set; } = null!;


        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}