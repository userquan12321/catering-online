using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models {
    public class UserProfile {
        [Key]
        public int ID { get; set; }

        [ForeignKey("UserID")]
        public User? User { get; set; }
        public int UserID { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s,.'\-\p{L}\p{M}]+$")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z\s,.'\-\p{L}\p{M}]+$")]
        public string LastName { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 8)]
        [RegularExpression(@"^\d+$")]
        public string PhoneNumber { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 8)]
        public string Address { get; set; }
    }
}
