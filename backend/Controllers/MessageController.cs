using backend.Helpers;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	[Authorize(Roles = "Admin, Customer, Caterer")]
	[ApiController]
	[Route("api/[controller]")]
	public class MessageController(ApplicationDbContext context) : ControllerBase
	{
		[HttpGet("contacts")]
		public async Task<ActionResult> GetContacts()
		{
			try
			{
				int userId = UserHelper.GetValidUserId(HttpContext.User);

				var recipientIds = await context.Messages
						.Where(m => m.SenderId == userId)
						.Select(m => m.ReceiverId)
						.Distinct()
						.ToListAsync();

				var recipients = await context.Profiles
						.Where(u => recipientIds.Contains(u.Id))
						.ToListAsync();

				return Ok(recipients.Select(u => new
				{
					u.UserId,
					u.FirstName,
					u.LastName,
					u.Image,
				}));
			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(ex.Message);
			}
		}

		[HttpGet("{receiverId}")]
		public async Task<ActionResult<IEnumerable<Message>>> GetMessages(int receiverId)
		{
			int TAKE_LIMIT = 20;
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				int userId = UserHelper.GetValidUserId(HttpContext.User);

				if (userId == receiverId)
				{
					return BadRequest("Cannot view messages with yourself.");
				}

				var messages = await context.Messages
					.Where(m => (m.SenderId == userId && m.ReceiverId == receiverId) ||
								(m.SenderId == receiverId && m.ReceiverId == userId))
					.Include(m => m.Sender)
					.Include(m => m.Receiver)
					.OrderByDescending(m => m.CreatedAt)
					.Take(TAKE_LIMIT)
					.Select(m => new
					{
						m.Id,
						IsSender = m.SenderId == userId,
						m.Content,
						m.CreatedAt,
					})
					.ToListAsync();

				if (messages == null)
				{
					return NotFound();
				}

				return Ok(new
				{
					Sender = context.Profiles.Where(p => p.UserId == userId).Select(p => new { p.FirstName, p.LastName, p.Image }).FirstOrDefault(),
					Receiver = context.Profiles.Where(p => p.UserId == receiverId).Select(p => new { p.FirstName, p.LastName, p.Image }).FirstOrDefault(),
					Message = messages
				});
			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(ex.Message);
			}
		}

		[HttpPost]
		public async Task<ActionResult> SendMessage(MessageDTO request)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				int userId = UserHelper.GetValidUserId(HttpContext.User);

				if (userId == request.ReceiverId)
				{
					return BadRequest("Cannot send message to yourself.");
				}

				var sendMessage = new Message
				{
					SenderId = userId,
					ReceiverId = request.ReceiverId,
					Content = request.Content,
					CreatedAt = DateTime.UtcNow,
					UpdatedAt = DateTime.UtcNow
				};

				context.Messages.Add(sendMessage);
				await context.SaveChangesAsync();
				return Ok("Message sent.");
			}
			catch (UnauthorizedAccessException ex)
			{
				return Unauthorized(ex.Message);
			}
		}

		// [HttpDelete("{messageId}")]
		// public async Task<IActionResult> DeleteMessage(int messageId)
		// {
		// 	if (!ModelState.IsValid)
		// 	{
		// 		return BadRequest(ModelState);
		// 	}

		// 	try
		// 	{
		// 		int userId = UserHelper.GetValidUserId(HttpContext.User);
		// 		var message = await context.Messages
		// 			.Where(m => m.Id == messageId && (m.SenderId == userId))
		// 			.FirstOrDefaultAsync();
		// 		if (message == null)
		// 		{
		// 			return NotFound("Message not found.");
		// 		}
		// 		context.Messages.Remove(message);
		// 		await context.SaveChangesAsync();
		// 		return Ok("Message deleted.");
		// 	}
		// 	catch (UnauthorizedAccessException ex)
		// 	{
		// 		return Unauthorized(ex.Message);
		// 	}
		// }
	}
}
