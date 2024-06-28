using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MessageController(ApplicationDbContext context)
        {
            _context = context;
        }

        // a. Caterer should be able to check the messages
        [HttpGet("caterer/{catererId}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesForCaterer(int catererId)
        {
            return await _context.Messages
                .Where(m => m.ReceiverId == catererId)
                .Include(m => m.Sender)
                .ToListAsync();
        }

        // b. Caterer should be able to see the details of a message and reply
        [HttpGet("caterer/{catererId}/{messageId}")]
        public async Task<ActionResult<Message>> GetMessageForCaterer(int catererId, int messageId)
        {
            var message = await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .FirstOrDefaultAsync(m => m.MessageId == messageId && m.ReceiverId == catererId);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        [HttpPost("caterer/reply")]
        public async Task<ActionResult<Message>> ReplyMessageForCaterer(int senderId, int receiverId, string content)
        {
            var message = new Message
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Content = content
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessageForCaterer), new { catererId = receiverId, messageId = message.MessageId }, message);
        }

        // c. Caterer should be able to delete the messages
        [HttpDelete("caterer/{messageId}")]
        public async Task<IActionResult> DeleteMessageForCaterer(int messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // a. Customer should be able to check the messages
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesForCustomer(int customerId)
        {
            return await _context.Messages
                .Where(m => m.ReceiverId == customerId)
                .Include(m => m.Sender)
                .ToListAsync();
        }

        // b. Customer should be able to see the details of a message and reply
        [HttpGet("customer/{customerId}/{messageId}")]
        public async Task<ActionResult<Message>> GetMessageForCustomer(int customerId, int messageId)
        {
            var message = await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .FirstOrDefaultAsync(m => m.MessageId == messageId && m.ReceiverId == customerId);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        [HttpPost("customer/reply")]
        public async Task<ActionResult<Message>> ReplyMessageForCustomer(int senderId, int receiverId, string content)
        {
            var message = new Message
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Content = content
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessageForCustomer), new { customerId = receiverId, messageId = message.MessageId }, message);
        }

        // c. Customer should be able to delete the messages
        [HttpDelete("customer/{messageId}")]
        public async Task<IActionResult> DeleteMessageForCustomer(int messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}