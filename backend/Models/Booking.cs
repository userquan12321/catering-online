using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(CustomerId))]
        public User? Customer { get; set; }

        [Required]
        public int CatererId { get; set; }
        [JsonIgnore]
        [ForeignKey(nameof(CatererId))]
        public Caterer? Caterer { get; set; }

        [Required]
        public DateOnly BookingDate { get; set; }

        [Required]
        public DateOnly EventDate { get; set; }

        [Required]
        [StringLength(255)]
        public string Venue { get; set; } = string.Empty;

        [Required]
        [Precision(18, 2)]
        public decimal TotalAmount { get; set; }

        [Required]
        [StringLength(255)]
        public string Note { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string PaymentMethod { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
