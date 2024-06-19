using System.ComponentModel.DataAnnotations;

namespace backend.Models.Users {
    public class UserUpdateProfile {
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
