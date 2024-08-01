using backend.Enums;
using backend.Helpers;
using backend.Models;
using backend.Models.DTO;
using backend.Models.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Authorize(Roles = "Admin, Customer, Caterer")]
  [ApiController]
  [Route("api/[controller]")]
  public class BookingController(ApplicationDbContext context) : ControllerBase
  {

    [HttpPost]
    public async Task<ActionResult> AddBooking(BookingDTO request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var caterer = await context.Caterers.FindAsync(request.CatererId);

      if (caterer == null)
      {
        return NotFound("Caterer not found.");
      }

      try
      {
        int userId = UserHelper.GetValidUserId(HttpContext.User);

        Booking booking = new()
        {
          CustomerId = userId,
          CatererId = request.CatererId,
          EventDate = request.EventDate,
          Venue = request.Venue,
          Occasion = request.Occasion,
          NumberOfPeople = request.NumberOfPeople,
          BookingStatus = BookingStatus.Pending,
          PaymentMethod = request.PaymentMethod,
          CreatedAt = DateTime.UtcNow,
          UpdatedAt = DateTime.UtcNow
        };
        context.Bookings.Add(booking);
        await context.SaveChangesAsync();

        foreach (var item in request.MenuItems)
        {
          var bookingItem = new BookingItem
          {
            Quantity = item.Quantity,
            ItemId = item.ItemId,
            BookingId = booking.Id,
          };

          context.BookingItems.Add(bookingItem);
        }
        await context.SaveChangesAsync();
        return Ok("Booking successfully.");

      }
      catch (UnauthorizedAccessException ex)
      {
        return Unauthorized(ex.Message);
      }
    }

    // Customer view all bookings
    [HttpGet("customer-bookings")]
    public async Task<ActionResult> GetCustomerBookings()
    {
      try
      {
        int customerId = UserHelper.GetValidUserId(HttpContext.User);
        var booking = await context.Bookings
            .Where(b => b.CustomerId == customerId)
            .Select(b => new
            {
              b.Id,
              Caterer = new
              {
                b.CatererId,
                b.Caterer!.Profile!.FirstName,
                b.Caterer.Profile.LastName,
              },
              b.EventDate,
              b.Venue,
              b.Occasion,
              b.NumberOfPeople,
              b.PaymentMethod,
              b.BookingStatus,
              b.CreatedAt,
              b.UpdatedAt,
              MenuItems = b.BookingItems
              .Where(bi => bi.BookingId == b.Id)
              .Select(bi => new
              {
                bi.Quantity,
                Item = new
                {
                  bi.ItemId,
                  bi.Item!.Name,
                  bi.Item.Price,
                }
              }),
              TotalPrice = b.BookingItems
                .Where(bi => bi.BookingId == b.Id)
                .Sum(bi => bi.Quantity * bi.Item!.Price)
            })
            .ToListAsync();
        return Ok(booking);
      }
      catch (UnauthorizedAccessException ex)
      {
        return Unauthorized(ex.Message);
      }

    }

    [HttpPut("cancel-booking/{bookingId}")]
    public async Task<ActionResult> CancelBooking(int bookingId)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      try
      {
        int userId = UserHelper.GetValidUserId(HttpContext.User);
        var booking = await context.Bookings
          .Where(b => b.CustomerId == userId && b.Id == bookingId)
          .FirstOrDefaultAsync();

        if (booking == null)
        {
          return NotFound("Booking not found.");
        }

        booking.BookingStatus = BookingStatus.Cancelling;

        await context.SaveChangesAsync();
        return Ok("Booking canceled");
      }
      catch (UnauthorizedAccessException ex)
      {
        return Unauthorized(ex.Message);
      }
    }

    [Authorize(Roles = "Admin, Caterer")]
    [HttpPut("change-booking-status/{bookingId}")]
    public async Task<ActionResult> ChangeBookingStatus(int bookingId, UpdateBookingStatusDTO request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      try
      {
        var booking = await context.Bookings
          .Where(b => b.Id == bookingId)
          .FirstOrDefaultAsync();

        if (booking == null)
        {
          return NotFound("Booking not found.");
        }

        booking.BookingStatus = request.BookingStatus;

        await context.SaveChangesAsync();
        return Ok("Booking status updated");
      }
      catch (UnauthorizedAccessException ex)
      {
        return Unauthorized(ex.Message);
      }
    }

    // Caterer view all bookings
    [Authorize(Roles = "Admin, Caterer")]
    [HttpGet("bookings-management")]
    public async Task<ActionResult> GetBookingsManagement()
    {
      TokenData tokenData = UserHelper.GetRoleAndCatererId(HttpContext.User);

      try
      {
        if (tokenData.UserType == "Caterer" && tokenData.CatererId != 0 && tokenData.CatererId != null)
        {
          var bookings = await context.Bookings
          .Where(b => b.CatererId == tokenData.CatererId)
          .Select(b => new
          {
            b.Id,
            Customer = new
            {
              b.CustomerId,
              b.Customer!.FirstName,
              b.Customer.LastName,
            },
            b.EventDate,
            b.Venue,
            b.Occasion,
            b.NumberOfPeople,
            b.PaymentMethod,
            b.BookingStatus,
            b.CreatedAt,
            b.UpdatedAt,
            MenuItems = b.BookingItems
              .Where(bi => bi.BookingId == b.Id)
              .Select(bi => new
              {
                bi.Quantity,
                bi.ItemId,
                bi.Item!.Name,
                bi.Item.Price,
              }),
            TotalPrice = b.BookingItems
              .Where(bi => bi.BookingId == b.Id)
              .Sum(bi => bi.Quantity * bi.Item!.Price)
          })
            .ToListAsync();
          return Ok(new
          {
            Bookings = bookings,
            NeedActionCount = bookings
                          .Where(
                            b => b.BookingStatus == BookingStatus.Pending ||
                            b.BookingStatus == BookingStatus.Cancelling
                          )
                          .Count()
          });
        }

        return Unauthorized();

        // var itemsAdmin = await context.Items
        //   .OrderByDescending(i => i.UpdatedAt)
        //   .Select(i => new
        //   {
        //     i.Id,
        //     Caterer = new
        //     {
        //       i.CatererId,
        //       i.Caterer!.Profile!.FirstName,
        //       i.Caterer.Profile.LastName,
        //     },
        //     i.CuisineId,
        //     i.Name,
        //     i.Description,
        //     i.Price,
        //     i.ServesCount,
        //     i.Image,
        //     i.ItemType,
        //     i.CuisineType!.CuisineName
        //   })
        //   .ToListAsync();

        // return Ok(itemsAdmin);
      }
      catch (UnauthorizedAccessException ex)
      {
        return Unauthorized(ex.Message);
      }
    }
  }
}