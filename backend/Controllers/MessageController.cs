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

        // User send message
        [HttpPost("{userId}/send/{receiverId}")]
        public async Task<ActionResult> SendMessage(int userId, int receiverId, Message sendMessage)
        {
            sendMessage.SenderId = userId;
            sendMessage.ReceiverId = receiverId;
            sendMessage.CreatedAt = DateTime.UtcNow;
            sendMessage.UpdatedAt = DateTime.UtcNow;
            context.Messages.Add(sendMessage);
            await context.SaveChangesAsync();
            return Ok("Message sent.");
        }

        // User reply message
        [HttpPost("{userId}/reply")]
        public async Task<ActionResult> ReplyMessage(int userId, int originalMessageId, Message replyMessage)
        {
            var originalMessage = await context.Messages.FindAsync(originalMessageId);
            if (originalMessage == null || (originalMessage.SenderId != userId && originalMessage.ReceiverId != userId))
            {
                return NotFound("Message not found.");
            }
            replyMessage.SenderId = userId;
            replyMessage.ReceiverId = originalMessage.SenderId == userId ? originalMessage.ReceiverId : originalMessage.SenderId;
            replyMessage.Content = replyMessage.Content;
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
    }
}
