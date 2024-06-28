using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int CatererId { get; set; }

        [Required]
        public DateTime BookingDate { get; set; }

        [Required]
        public DateTime EventDate { get; set; }

        [MaxLength(255)]
        public string? Venue { get; set; }

        public string? MenuDetails { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }

        [Required]
        public string Status { get; set; } = "Pending";

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey(nameof(CustomerId))]
        public User? Customer { get; set; }

        [ForeignKey(nameof(CatererId))]
        public Caterer? Caterer { get; set; }
    }
}