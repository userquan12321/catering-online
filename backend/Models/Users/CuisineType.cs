using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CuisineType
    {
        public int Id { get; set; }

        [Required]
        public string CuisineName { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Item> Items { get; set; }
        public ICollection<Caterer> Caterers { get; set; }
    }
}
