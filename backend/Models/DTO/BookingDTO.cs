using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.Enums;
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

		public DateTime EventDate { get; set; }

		[StringLength(255)]
		public string Venue { get; set; } = string.Empty;

		public BookingStatus BookingStatus { get; set; }

		public PaymentMethod PaymentMethod { get; set; }

		public List<int> MenuItemIds { get; set; } = [];

		public BookingDTO()
		{
			BookingStatus = BookingStatus.Pending;
		}
	}
}

