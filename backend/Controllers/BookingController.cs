using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin, Customer, Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController(ApplicationDbContext context) : ControllerBase
    {
        // Customer books a caterer
        [HttpPost]
        public async Task<IActionResult> BookCaterer([FromBody] BookingDTO request)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            request.CustomerId = uid.Value;
            var booking = new Booking
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

            return Ok("Book successfully");
        }

        // Get booking details by ID
        [HttpGet("{id}")]
        public async Task<ActionResult> GetBookingById(int id)
        {
            var booking = await context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        // Customer views their bookings
        [HttpGet("customer/bookings")]
        public async Task<ActionResult> GetCustomerBookings()
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            var booking = await context.Bookings.Where(b => b.CustomerId == uid.Value).ToListAsync();

            return Ok(booking);
        }

        // Customer cancels a booking
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var booking = await context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            context.Bookings.Remove(booking);
            await context.SaveChangesAsync();

            return Ok();
        }

        // Caterer views bookings
        [HttpGet("caterer/bookings")]
        public async Task<ActionResult> GetCatererBookings()
        {
            var cid = HttpContext.Session.GetInt32("cid");
            if (cid == null)
            {
                return NotFound("Caterer id not found");
            }
            var booking = await context.Bookings.Where(b => b.CatererId == cid.Value).ToListAsync();
            return Ok(booking);
        }

        // Caterer updates booking status
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBookingStatus(int id, [FromBody] string status)
        {
            var booking = await context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            booking.BookingStatus = status;
            booking.UpdatedAt = DateTime.UtcNow;

            await context.SaveChangesAsync();

            return Ok();
        }
    }
}