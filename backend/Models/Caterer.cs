using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
  public class Caterer
  {
    [Key]
    public int Id { get; set; }

    public int ProfileId { get; set; }

    [JsonIgnore]
    [ForeignKey(nameof(ProfileId))]
    public Profile? Profile { get; set; }

    [JsonIgnore]
    public virtual ICollection<Item> Items { get; set; } = [];

    [JsonIgnore]
    public virtual ICollection<Booking> Bookings { get; set; } = [];
  }
}