using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    [Index(nameof(User.Email), IsUnique = true)]
    public class User {
        [Key]
        public int ID { get; set; }
        public enum UserType {
            Customer = 0, Caterer = 1, Admin = 2
        }
        [Required]
        [Range(0, 2)]
        public UserType Type { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 4)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 8)]
        [RegularExpression(@"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$")] // 1 digit, 1 uppercase, 1 lowercase, 1 special character
        [PasswordPropertyText]
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
