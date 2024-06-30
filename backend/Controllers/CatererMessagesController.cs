// using backend.Models;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;

// namespace backend.Controllers
// {
//     [Authorize(Roles = "Admin,Caterer")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class CatererMessagesController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;

//     public CatererMessagesController(ApplicationDbContext context)
//     {
//         _context = context;
//     }

//     // GET: api/CustomerMessages
//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
//     {
//         var customerId = GetCustomerId();
//         return await _context.Messages
//             .Where(m => m.CustomerId == customerId)
//             .ToListAsync();
//     }

//     // GET: api/CustomerMessages/5
//     [HttpGet("{id}")]
//     public async Task<ActionResult<Message>> GetMessage(int id)
//     {
//         var customerId = GetCustomerId();
//         var message = await _context.Messages
//             .Where(m => m.CustomerId == customerId && m.Id == id)
//             .FirstOrDefaultAsync();

//         if (message == null)
//         {
//             return NotFound();
//         }

//         return message;
//     }

//     // POST: api/CustomerMessages/5/reply
//     [HttpPost("{id}/reply")]
//     public async Task<IActionResult> ReplyMessage(int id, [FromBody] Message replyMessage)
//     {
//         var customerId = GetCustomerId();
//         var message = await _context.Messages
//             .Where(m => m.CustomerId == customerId && m.Id == id)
//             .FirstOrDefaultAsync();

//         if (message == null)
//         {
//             return NotFound();
//         }

//         // Implement logic to save reply message here
//         // ...

//         await _context.SaveChangesAsync();

//         return NoContent();
//     }

//     // DELETE: api/CustomerMessages/5
//     [HttpDelete("{id}")]
//     public async Task<IActionResult> DeleteMessage(int id)
//     {
//         var customerId = GetCustomerId();
//         var message = await _context.Messages
//             .Where(m => m.CustomerId == customerId && m.Id == id)
//             .FirstOrDefaultAsync();

//         if (message == null)
//         {
//             return NotFound();
//         }

//         _context.Messages.Remove(message);
//         await _context.SaveChangesAsync();

//         return NoContent();
//     }

//     private bool MessageExists(int id)
//     {
//         return _context.Messages.Any(e => e.Id == id);
//     }

//     private int GetCustomerId()
//     {
//         return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
//     }
//     }
// }