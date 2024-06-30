using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Index(nameof(CuisineName), IsUnique = true)]
    public class CuisineType
    {
        [Key]
        public int Id { get; set; }

<<<<<<< HEAD
        public string CuisineName { get; set; } = null!;

=======
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string CuisineName { get; set; } = string.Empty;
>>>>>>> 0d3a11e7efffb2bec340f057f117c13e70a2a64e

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}