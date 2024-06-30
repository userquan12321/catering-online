using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin, Customer, Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController(ApplicationDbContext context) : ControllerBase
    {
        // User view all messages
        [HttpGet("{userId}")]
        public async Task<ActionResult> GetMessages(int userId)
        {
            var messages = await context.Messages
                .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                .ToListAsync();
            return Ok(messages);
        }

        // User view message details
        [HttpGet("{userId}/{messageId}")]
        public async Task<ActionResult> GetMessage(int userId, int messageId)
        {
            var message = await context.Messages
                .Where(m => m.Id == messageId && (m.SenderId == userId || m.ReceiverId == userId))
                .FirstOrDefaultAsync();
            if (message == null)
            {
                return NotFound("Message not found.");
            }
            return Ok(message);
        }

        // User reply message
        [HttpPost("{userId}/reply")]
        public async Task<ActionResult> ReplyMessage(int userId, int originalMessageId, [FromBody] Message replyMessage)
        {
            var originalMessage = await context.Messages.FindAsync(originalMessageId);
            if (originalMessage == null || (originalMessage.SenderId != userId && originalMessage.ReceiverId != userId))
            {
                return NotFound("Message not found.");
            }
            replyMessage.SenderId = userId;
            replyMessage.ReceiverId = originalMessage.SenderId == userId ? originalMessage.ReceiverId : originalMessage.SenderId;
            replyMessage.CreatedAt = DateTime.UtcNow;
            replyMessage.UpdatedAt = DateTime.UtcNow;
            context.Messages.Add(replyMessage);
            await context.SaveChangesAsync();
            return Ok("Message sent.");
        }

        // User delete message
        [HttpDelete("{userId}/{messageId}")]
        public async Task<IActionResult> DeleteMessage(int userId, int messageId)
        {
            var message = await context.Messages
                .Where(m => m.Id == messageId && (m.SenderId == userId || m.ReceiverId == userId))
                .FirstOrDefaultAsync();
            if (message == null)
            {
                return NotFound("Message not found.");
            }
            context.Messages.Remove(message);
            await context.SaveChangesAsync();
            return Ok("Message deleted.");
        }

        // // a. Caterer should be able to check the messages
        // [HttpGet("caterer/{catererId}")]
        // public async Task<ActionResult<IEnumerable<Message>>> GetMessagesForCaterer(int catererId)
        // {
        //     return await context.Messages
        //         .Where(m => m.ReceiverId == catererId)
        //         .Include(m => m.Sender)
        //         .ToListAsync();
        // }

        // // b. Caterer should be able to see the details of a message and reply
        // [HttpGet("caterer/{catererId}/{messageId}")]
        // public async Task<ActionResult<Message>> GetMessageForCaterer(int catererId, int messageId)
        // {
        //     var message = await context.Messages
        //         .Include(m => m.Sender)
        //         .Include(m => m.Receiver)
        //         .FirstOrDefaultAsync(m => m.Id == messageId && m.ReceiverId == catererId);

        //     if (message == null)
        //     {
        //         return NotFound();
        //     }

        //     return message;
        // }

        // [HttpPost("caterer/reply")]
        // public async Task<ActionResult<Message>> ReplyMessageForCaterer(int senderId, int receiverId, string content)
        // {
        //     var message = new Message
        //     {
        //         SenderId = senderId,
        //         ReceiverId = receiverId,
        //         Content = content
        //     };

        //     context.Messages.Add(message);
        //     await context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetMessageForCaterer), new { catererId = receiverId, messageId = message.Id }, message);
        // }

        // // c. Caterer should be able to delete the messages
        // [HttpDelete("caterer/{messageId}")]
        // public async Task<IActionResult> DeleteMessageForCaterer(int messageId)
        // {
        //     var message = await context.Messages.FindAsync(messageId);
        //     if (message == null)
        //     {
        //         return NotFound();
        //     }

        //     context.Messages.Remove(message);
        //     await context.SaveChangesAsync();

        //     return NoContent();
        // }

        // // a. Customer should be able to check the messages
        // [HttpGet("customer/{customerId}")]
        // public async Task<ActionResult<IEnumerable<Message>>> GetMessagesForCustomer(int customerId)
        // {
        //     return await context.Messages
        //         .Where(m => m.ReceiverId == customerId)
        //         .Include(m => m.Sender)
        //         .ToListAsync();
        // }

        // // b. Customer should be able to see the details of a message and reply
        // [HttpGet("customer/{customerId}/{messageId}")]
        // public async Task<ActionResult<Message>> GetMessageForCustomer(int customerId, int messageId)
        // {
        //     var message = await context.Messages
        //         .Include(m => m.Sender)
        //         .Include(m => m.Receiver)
        //         .FirstOrDefaultAsync(m => m.Id == messageId && m.ReceiverId == customerId);

        //     if (message == null)
        //     {
        //         return NotFound();
        //     }

        //     return message;
        // }


        // [HttpPost("customer/reply")]
        // public async Task<ActionResult<Message>> ReplyMessageForCustomer(int senderId, int receiverId, string content)
        // {
        //     var message = new Message
        //     {
        //         SenderId = senderId,
        //         ReceiverId = receiverId,
        //         Content = content
        //     };

        //     context.Messages.Add(message);
        //     await context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetMessageForCustomer), new { customerId = receiverId, messageId = message.Id }, message);
        // }

        // // c. Customer should be able to delete the messages
        // [HttpDelete("customer/{messageId}")]
        // public async Task<IActionResult> DeleteMessageForCustomer(int messageId)
        // {
        //     var message = await context.Messages.FindAsync(messageId);
        //     if (message == null)
        //     {
        //         return NotFound();
        //     }

        //     context.Messages.Remove(message);
        //     await context.SaveChangesAsync();

        //     return NoContent();
    }
}
