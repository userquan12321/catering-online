using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
	public class ChangePasswordDTO
	{
		[StringLength(255)]
		public string OldPassword { get; set; } = string.Empty;

		[StringLength(255)]
		public string NewPassword { get; set; } = string.Empty;
	}
}
