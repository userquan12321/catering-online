using System.ComponentModel.DataAnnotations;
using backend.Enums;

namespace backend.Models.DTO
{
  public class ItemDTO
  {
    [Required]
    [StringLength(255)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(2000)]
    public string Image { get; set; } = string.Empty;

    [Required]
    public int ServesCount { get; set; }

    [Required]
    public decimal Price { get; set; }

    [Required]
    public int CuisineId { get; set; }

    public ItemType ItemType { get; set; }
  }
}