using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.Enums;

namespace backend.Models
{
  public class Booking
  {
    [Key]
    public int Id { get; set; }
    public int CustomerId { get; set; }

    [JsonIgnore]
    [ForeignKey(nameof(CustomerId))]
    public Profile? Customer { get; set; }
    public int CatererId { get; set; }

    [JsonIgnore]
    [ForeignKey(nameof(CatererId))]
    public Caterer? Caterer { get; set; }

    public DateTime EventDate { get; set; }

    [StringLength(50)]
    public string Venue { get; set; } = string.Empty;

    public PaymentMethod PaymentMethod { get; set; }

    [StringLength(50)]
    public string Occasion { get; set; } = string.Empty;

    public int NumberOfPeople { get; set; }
    public BookingStatus BookingStatus { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    [JsonIgnore]
    public virtual ICollection<BookingItem> BookingItems { get; set; } = [];
  }
}
