using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using backend.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
  [Index(nameof(Name), IsUnique = true)]
  public class Item
  {
    [Key]
    public int Id { get; set; }

    public int CatererId { get; set; }

    [JsonIgnore]
    [ForeignKey(nameof(CatererId))]
    public Caterer? Caterer { get; set; }

    public int CuisineId { get; set; }

    [JsonIgnore]
    [ForeignKey(nameof(CuisineId))]
    public CuisineType? CuisineType { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = string.Empty;

    [StringLength(2000)]
    public string? Image { get; set; }

    [StringLength(2000)]
    public string? Description { get; set; }

    public int ServesCount { get; set; }

    public ItemType ItemType { get; set; }

    [Precision(18, 2)]
    public decimal Price { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    [JsonIgnore]
    public ICollection<BookingItem> BookingItems { get; set; } = [];
  }
}