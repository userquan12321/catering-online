using System.ComponentModel.DataAnnotations;
using static backend.Models.User;

namespace backend.Models.DTO
{
    public class RegisterDTO
    {
        [Range(0, 2)]
        public UserType Type { get; set; }

        [StringLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [StringLength(255)]
        public string Password { get; set; } = string.Empty;

        [StringLength(255)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(255)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(20)]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        [StringLength(255)]
        public string Address { get; set; } = string.Empty;
    }
}
