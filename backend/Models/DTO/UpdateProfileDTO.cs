using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
  public class UpdateProfileDTO
  {
    [StringLength(255)]
    public string FirstName { get; set; } = string.Empty;

    [StringLength(255)]
    public string LastName { get; set; } = string.Empty;

    [StringLength(20)]
    [Phone]
    public string PhoneNumber { get; set; } = string.Empty;

    [StringLength(255)]
    public string Address { get; set; } = string.Empty;

    [StringLength(2000)]
    public string Image { get; set; } = string.Empty;
  }
}
