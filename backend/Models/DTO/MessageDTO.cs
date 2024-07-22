using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
  public class MessageDTO
  {
    [Required]
    public int ReceiverId { get; set; }

    [Required]
    public string Content { get; set; } = string.Empty;
  }
}