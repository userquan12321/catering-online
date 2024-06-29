using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
    public class UpdateProfileDTO
    {
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(255, MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(16, MinimumLength = 8)]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(255, MinimumLength = 8)]
        public string Address { get; set; } = string.Empty;

        public string Image { get; set; } = string.Empty;
    }
}
