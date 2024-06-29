using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class FavoriteList
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int CatererId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual Caterer Caterer { get; set; } = null!;

        public virtual User User { get; set; } = null!;
    }
}