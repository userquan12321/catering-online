using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTO
{
    public class CuisineDTO
    {
        [StringLength(255)]
        public string CuisineName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string CuisineImage { get; set; } = string.Empty;
    }
}