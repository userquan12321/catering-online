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
//     [Authorize(Roles = "Admin,Caterer")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class CatererBookingsController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;

//         public CatererBookingsController(ApplicationDbContext context)
//         {
//             _context = context;
//         }
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
//         {
//             var catererId = GetCatererId(); // Implement method to get current caterer ID
//             return await _context.Bookings
//                 .Where(b => b.CatererId == catererId)
//                 .ToListAsync();
//         }

//         // GET: api/CatererBookings/5
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Booking>> GetBooking(int id)
//         {
//             var catererId = GetCatererId(); // Implement method to get current caterer ID
//             var booking = await _context.Bookings
//                 .Where(b => b.CatererId == catererId && b.Id == id)
//                 .FirstOrDefaultAsync();

//             if (booking == null)
//             {
//                 return NotFound();
//             }

//             return booking;
//         }

//         // PUT: api/CatererBookings/5
//         [HttpPut("{id}")]
//         public async Task<IActionResult> UpdateBookingStatus(int id, Booking booking)
//         {
//             if (id != booking.Id)
//             {
//                 return BadRequest();
//             }

//             var catererId = GetCatererId(); // Implement method to get current caterer ID
//             var existingBooking = await _context.Bookings
//                 .Where(b => b.CatererId == catererId && b.Id == id)
//                 .FirstOrDefaultAsync();

//             if (existingBooking == null)
//             {
//                 return NotFound();
//             }

//             existingBooking.BookingStatus = booking.BookingStatus;
//             _context.Entry(existingBooking).State = EntityState.Modified;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!BookingExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }

//             return NoContent();
//         }

//         private bool BookingExists(int id)
//         {
//             return _context.Bookings.Any(e => e.Id == id);
//         }

//         private int GetCatererId()
//         {
//             return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
//         }
//     }
// }