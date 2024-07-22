using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
	public class CuisineDTO
	{
		[Required]
		public string CuisineName { get; set; } = string.Empty;
		[Required]
		public string Description { get; set; } = string.Empty;
		[Required]
		public string CuisineImage { get; set; } = string.Empty;
	}
}