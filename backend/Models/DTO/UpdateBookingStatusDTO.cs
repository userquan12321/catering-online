using System.ComponentModel.DataAnnotations;
using backend.Enums;

namespace backend.Models.DTO
{
  public class UpdateBookingStatusDTO
  {
    [Required]
    public BookingStatus BookingStatus { get; set; }
  }
}