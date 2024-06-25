using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public decimal Serves_count { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int CatererId { get; set; }

        public Caterer Caterer { get; set; }

        [Required]
        public int CuisineId { get; set; }

        public CuisineType CuisineType { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
