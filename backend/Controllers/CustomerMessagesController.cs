// using backend.Models;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;

// namespace backend.Controllers
// {
//     [Authorize(Roles = "Admin,Customer")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class CustomerMessagesController : ControllerBase
//     {
//         private readonly ApplicationDbContext _context;

//         public CustomerMessagesController(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // GET: api/CatererMessages
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
//         {
//             var catererId = GetCatererId();
//             return await _context.Messages
//                 .Where(m => m.CatererId == catererId)
//                 .ToListAsync();
//         }

//         // GET: api/CatererMessages/5
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Message>> GetMessage(int id)
//         {
//             var catererId = GetCatererId();
//             var message = await _context.Messages
//                 .Where(m => m.CatererId == catererId && m.Id == id)
//                 .FirstOrDefaultAsync();

//             if (message == null)
//             {
//                 return NotFound();
//             }

//             return message;
//         }

//         // POST: api/CatererMessages/5/reply
//         [HttpPost("{id}/reply")]
//         public async Task<IActionResult> ReplyMessage(int id, [FromBody] Message replyMessage)
//         {
//             var catererId = GetCatererId();
//             var message = await _context.Messages
//                 .Where(m => m.CatererId == catererId && m.Id == id)
//                 .FirstOrDefaultAsync();

//             if (message == null)
//             {
//                 return NotFound();
//             }

//             // Implement logic to save reply message here
//             // ...

//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         // DELETE: api/CatererMessages/5
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteMessage(int id)
//         {
//             var catererId = GetCatererId();
//             var message = await _context.Messages
//                 .Where(m => m.CatererId == catererId && m.Id == id)
//                 .FirstOrDefaultAsync();

//             if (message == null)
//             {
//                 return NotFound();
//             }

//             _context.Messages.Remove(message);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         private bool MessageExists(int id)
//         {
//             return _context.Messages.Any(e => e.Id == id);
//         }

//         private int GetCatererId()
//         {
//             return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
//         }
//     }
// }