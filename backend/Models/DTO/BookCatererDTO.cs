using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.DTO
{
    public class BookCatererDTO
    {
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
        public DateTime BookingDate { get; set; }

        [Required]
        public DateTime EventDate { get; set; }

        [Required]
        [StringLength(255)]
        public string Venue { get; set; }

        [Required]
        [Precision(18, 2)]
        public decimal TotalAmount { get; set; }

        [Required]
        [StringLength(255)]
        public string Note { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [Required]
        [StringLength(20)]
        public string PaymentMethod { get; set; }

        public BookCatererDTO()
        {
            CustomerId = 0;
            CatererId = 0;
            BookingDate = new DateTime();
            EventDate = new DateTime();
            Venue = "";
            TotalAmount = 0;
            Note = "";
            Status = "Pending";
            PaymentMethod = "";
        }
    }
}

