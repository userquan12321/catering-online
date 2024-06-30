using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //[Authorize(Roles = "Admin, Customer, Caterer")]
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController(ApplicationDbContext context) : ControllerBase
    {
        // Get messages for the authenticated user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            return await context.Messages
                .Where(m => m.SenderId == uid.Value || m.ReceiverId == uid.Value)
                .ToListAsync();
        }

        // Get message details
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            var message = await context.Messages
                .Where(m => m.Id == id && (m.SenderId == uid.Value || m.ReceiverId == uid.Value))
                .FirstOrDefaultAsync();

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        // Reply to a message
        [HttpPost("reply")]
        public async Task<ActionResult<Message>> ReplyMessage(int originalMessageId, [FromBody] Message replyMessage)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            var originalMessage = await context.Messages.FindAsync(originalMessageId);

            if (originalMessage == null || (originalMessage.SenderId != uid.Value && originalMessage.ReceiverId != uid.Value))
            {
                return NotFound();
            }

            replyMessage.SenderId = uid.Value;
            replyMessage.ReceiverId = originalMessage.SenderId == uid.Value ? originalMessage.ReceiverId : originalMessage.SenderId;
            replyMessage.CreatedAt = DateTime.UtcNow;
            replyMessage.UpdatedAt = DateTime.UtcNow;

            context.Messages.Add(replyMessage);
            await context.SaveChangesAsync();

            return Ok();
        }

        // Delete a message
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var uid = HttpContext.Session.GetInt32("uid");
            if (uid == null)
            {
                return NotFound("User id not found");
            }
            var message = await context.Messages
                .Where(m => m.Id == id && (m.SenderId == uid || m.ReceiverId == uid))
                .FirstOrDefaultAsync();

            if (message == null)
            {
                return NotFound();
            }

            context.Messages.Remove(message);
            await context.SaveChangesAsync();

            return Ok();
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
