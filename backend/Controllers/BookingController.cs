using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Authorize(Roles = "Admin,Customer,Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        // Customer books a caterer
        [HttpPost]
        public async Task<IActionResult> BookCaterer([FromBody] BookingDto bookingDto)
        {
            var booking = new Booking
            {
                CustomerId = bookingDto.CustomerId,
                CatererId = bookingDto.CatererId,
                BookingDate = bookingDto.BookingDate,
                EventDate = bookingDto.EventDate,
                Venue = bookingDto.Venue,
                TotalAmount = bookingDto.TotalAmount,
                BookingStatus = bookingDto.BookingStatus,
                PaymentMethod = bookingDto.PaymentMethod,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            foreach (var itemId in bookingDto.MenuItemIds)
            {
                var bookingItem = new BookingItem
                {
                    BookingId = booking.Id,
                    ItemId = itemId
                };

                _context.BookingItems.Add(bookingItem);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookingById), new { id = booking.Id }, booking);
        }

        // Get booking details by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBookingById(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // Customer views their bookings
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetCustomerBookings(int customerId)
        {
            return await _context.Bookings.Where(b => b.CustomerId == customerId).ToListAsync();
        }

        // Customer cancels a booking
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Caterer views bookings
        [HttpGet("caterer/{catererId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetCatererBookings(int catererId)
        {
            return await _context.Bookings.Where(b => b.CatererId == catererId).ToListAsync();
        }

        // Caterer updates booking status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateBookingStatus(int id, [FromBody] string status)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            booking.BookingStatus = status;
            booking.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
    public class BookingDto
    {
        public int CustomerId { get; set; }
        public int CatererId { get; set; }
        public DateOnly BookingDate { get; set; }
        public DateOnly EventDate { get; set; }
        public string? Venue { get; set; }
        public List<int> MenuItemIds { get; set; }
        public decimal TotalAmount { get; set; }
        public string BookingStatus { get; set; }
        public int PaymentMethod { get; set; }
    }
}