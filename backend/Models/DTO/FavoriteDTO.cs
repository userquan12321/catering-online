using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
  public class FavoriteDTO
  {
    [Required]
    public int CatererId { get; set; }
  }
}