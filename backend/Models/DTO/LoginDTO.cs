using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
    public class LoginDTO
    {
        [StringLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [StringLength(255)]
        public string Password { get; set; } = string.Empty;
    }
}
