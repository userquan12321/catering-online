using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.DTO
{
	public class BookingDTO
	{
		public int CustomerId { get; set; }

		[JsonIgnore]
		[ForeignKey(nameof(CustomerId))]
		public User? Customer { get; set; }

		public int CatererId { get; set; }

		[JsonIgnore]
		[ForeignKey(nameof(CatererId))]
		public Caterer? Caterer { get; set; }

		public DateOnly BookingDate { get; set; }

		public DateOnly EventDate { get; set; }

		[StringLength(255)]
		public string Venue { get; set; } = string.Empty;

		[Precision(18, 2)]
		public decimal TotalAmount { get; set; }

		[StringLength(20)]
		public string BookingStatus { get; set; } = "Pending";

		[StringLength(20)]
		public string PaymentMethod { get; set; } = string.Empty;

		public List<int> MenuItemIds { get; set; } = new List<int>();
	}
}

