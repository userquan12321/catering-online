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

        public int CustomerId { get; set; }

        public int CatererId { get; set; }

        public DateOnly BookingDate { get; set; }

        public DateOnly EventDate { get; set; }

        public string Venue { get; set; } = null!;

        public decimal TotalAmount { get; set; }

        public string BookingStatus { get; set; } = null!;

        public int PaymentMethod { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual Caterer Caterer { get; set; } = null!;

        public virtual User Customer { get; set; } = null!;
        public virtual ICollection<BookingItem> BookingItems { get; set; }
    }
}
