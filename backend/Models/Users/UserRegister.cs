using System.ComponentModel.DataAnnotations;

namespace backend.Models {
    public class UserRegister {
        public enum UserTypeRegister {
            Customer = 0, Caterer = 1, Admin = 2
        }
        [Required]
        [Range(0, 2)]
        public UserTypeRegister Type { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 4)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$")] // 1 digit, 1 uppercase, 1 lowercase, 1 special character
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        [StringLength(255, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$")] // 1 digit, 1 uppercase, 1 lowercase, 1 special character
        public string ConfirmPassword { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s,.'\-\p{L}\p{M}]+$")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s,.'\-\p{L}\p{M}]+$")]
        public string LastName { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 8)]
        [RegularExpression(@"^\d+$")]
        public string PhoneNumber { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 8)]
        public string Address { get; set; }
    }
}
