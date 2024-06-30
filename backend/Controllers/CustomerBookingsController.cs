// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Security.Claims;
// using System.Threading.Tasks;
// using backend.Models;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace backend.Controllers
// {
//     [Authorize(Roles = "Admin,Customer")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class CustomerBookingsController(ApplicationDbContext context) : ControllerBase
//     {
//         private readonly ApplicationDbContext _context = context;


//         // GET: api/CustomerBookings
//         [HttpGet]
//     public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
//     {
//         var customerId = GetCustomerId(); // Implement method to get current customer ID
//         return await _context.Bookings
//             .Where(b => b.CustomerId == customerId)
//             .ToListAsync();
//     }

//     // GET: api/CustomerBookings/5
//     [HttpGet("{id}")]
//     public async Task<ActionResult<Booking>> GetBooking(int id)
//     {
//         var customerId = GetCustomerId(); // Implement method to get current customer ID
//         var booking = await _context.Bookings
//             .Where(b => b.CustomerId == customerId && b.Id == id)
//             .FirstOrDefaultAsync();

//         if (booking == null)
//         {
//             return NotFound();
//         }

//         return booking;
//     }

//     // DELETE: api/CustomerBookings/5
//     [HttpDelete("{id}")]
//     public async Task<IActionResult> CancelBooking(int id)
//     {
//         var customerId = GetCustomerId(); // Implement method to get current customer ID
//         var booking = await _context.Bookings
//             .Where(b => b.CustomerId == customerId && b.Id == id)
//             .FirstOrDefaultAsync();

//         if (booking == null)
//         {
//             return NotFound();
//         }

//         _context.Bookings.Remove(booking);
//         await _context.SaveChangesAsync();

//         return NoContent();
//     }

//     private bool BookingExists(int id)
//     {
//         return _context.Bookings.Any(e => e.Id == id);
//     }

//     private int GetCustomerId()
//     {
//         return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
//     }
//     }
// }