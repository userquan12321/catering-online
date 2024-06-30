using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class BookingItem
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public int ItemId { get; set; }
        public virtual Booking Booking { get; set; } = null!;
        public virtual Item Item { get; set; } = null!;
    }
}