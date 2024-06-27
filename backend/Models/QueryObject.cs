using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class QueryObject
    {
        public string Cuisine { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int Page { get; set; }
        public QueryObject()
        {
            Cuisine = "";
            Page = 1;
        }
    }
}
