using System.ComponentModel.DataAnnotations;
using static backend.Models.User;

namespace backend.Models.DTO
{
    public class RegisterDTO
    {
        [Required]
        [Range(0, 2)]
        public UserType Type { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 4)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(255, MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;

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
    }
}
