using System.ComponentModel.DataAnnotations;

namespace backend.Models {
    public class UserLogin {
        [Required]
        [StringLength(255, MinimumLength = 4)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$")] // 1 digit, 1 uppercase, 1 lowercase, 1 special character
        public string Password { get; set; }
    }
}
