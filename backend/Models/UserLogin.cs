using System.ComponentModel.DataAnnotations;

namespace backend.Models {
    public class UserLogin {
        [Required]
        [StringLength(255, MinimumLength = 8)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$")]
        public string Password { get; set; }
    }
}
