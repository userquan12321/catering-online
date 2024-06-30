using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class BookingItem
    {
        [Key]
        public int Id { get; set; }

        public int BookingId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(BookingId))]
        public Booking? Booking { get; set; }

        public int ItemId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ItemId))]
        public Item? Item { get; set; }
    }
}