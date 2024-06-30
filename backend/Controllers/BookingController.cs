using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin, Customer, Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController(ApplicationDbContext context) : ControllerBase
    {
        // Customer add booking
        [HttpPost("{customerId}/customer-bookings")]
        public async Task<ActionResult> AddBooking(int customerId, BookingDTO request)
        {
            request.CustomerId = customerId;
            Booking booking = new()
            {
                CustomerId = request.CustomerId,
                CatererId = request.CatererId,
                BookingDate = request.BookingDate,
                EventDate = request.EventDate,
                Venue = request.Venue,
                TotalAmount = request.TotalAmount,
                BookingStatus = request.BookingStatus,
                PaymentMethod = request.PaymentMethod,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            context.Bookings.Add(booking);
            await context.SaveChangesAsync();
            foreach (var itemId in request.MenuItemIds)
            {
                var bookingItem = new BookingItem
                {
                    BookingId = booking.Id,
                    ItemId = itemId
                };

                context.BookingItems.Add(bookingItem);
            }
            await context.SaveChangesAsync();
            return Ok("Booking successfully.");
        }

        // Customer view all bookings
        [HttpGet("{customerId}/customer-bookings")]
        public async Task<ActionResult> GetCustomerBookings(int customerId)
        {
            var booking = await context.Bookings
                .Where(b => b.CustomerId == customerId)
                .ToListAsync();
            return Ok(booking);
        }

        // Customer view booking details
        [HttpGet("{customerId}/customer-bookings/{bookingId}")]
        public async Task<ActionResult> GetCustomerBooking(int customerId, int bookingId)
        {
            var booking = await context.Bookings
                .Where(x => x.Id == bookingId && x.CustomerId == customerId)
                .FirstOrDefaultAsync();
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }
            return Ok(booking);
        }

        // Customer cancel booking
        [HttpPut("{customerId}/customer-bookings/{bookingId}")]
        public async Task<ActionResult> CancelBooking(int customerId, int bookingId)
        {
            var booking = await context.Bookings
                .Where(b => b.CustomerId == customerId && b.Id == bookingId)
                .FirstOrDefaultAsync();
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }
            booking.BookingStatus = "Canceled";
            await context.SaveChangesAsync();
            return Ok("Booking canceled");
        }

        // Caterer view all bookings
        [HttpGet("{catererId}/caterer-bookings")]
        public async Task<ActionResult> GetCatererBookings(int catererId)
        {
            var booking = await context.Bookings
                .Where(b => b.CatererId == catererId)
                .ToListAsync();
            return Ok(booking);
        }

        // Caterer view booking details
        [HttpGet("{catererId}/caterer-bookings/{bookingId}")]
        public async Task<ActionResult> GetCatererBooking(int catererId, int bookingId)
        {
            var booking = await context.Bookings
                .Where(b => b.Id == bookingId && b.CatererId == catererId)
                .FirstOrDefaultAsync();
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }
            return Ok(booking);
        }

        // Caterer update booking status
        [HttpPut("{catererId}/caterer-bookings/{bookingId}")]
        public async Task<ActionResult> UpdateBookingStatus(int catererId, int bookingId, [FromBody] string status)
        {
            var booking = await context.Bookings
                .Where(b => b.CatererId == catererId && b.Id == bookingId)
                .FirstOrDefaultAsync();
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }
            booking.BookingStatus = status;
            booking.UpdatedAt = DateTime.UtcNow;
            await context.SaveChangesAsync();
            return Ok("Booking updated.");
        }
    }
}