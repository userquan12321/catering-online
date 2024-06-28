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

    public DateTime UpdatedAt { get; set; }

    public virtual Caterer Caterer { get; set; } = null!;

    public virtual User Customer { get; set; } = null!;
    }
}