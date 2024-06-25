using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Caterer
    {
        public int Id { get; set; }

        [Required]
        public int ProfileId { get; set; }

        [Required]
        public int CuisineId { get; set; }

        public CuisineType CuisineType { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Item> Items { get; set; }
    }
}
