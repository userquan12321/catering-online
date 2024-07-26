using System.ComponentModel.DataAnnotations;
using backend.Enums;

namespace backend.Models.DTO
{
	public class BookingDTO
	{
		public int CatererId { get; set; }

		[Required]
		public DateTime EventDate { get; set; }

		[Required]
		public string Venue { get; set; } = string.Empty;
		[Required]
		public string Occasion { get; set; } = string.Empty;

		[Range(50, int.MaxValue, ErrorMessage = "The number of people must be at least 50.")]
		public int NumberOfPeople { get; set; }

		public PaymentMethod PaymentMethod { get; set; }

		public List<MenuItemDTO> MenuItems { get; set; } = [];
	}
}

