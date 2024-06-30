using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        public int SenderId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(SenderId))]
        public User? Sender { get; set; }

        public int ReceiverId { get; set; }

        [JsonIgnore]
        [ForeignKey(nameof(ReceiverId))]
        public User? Receiver { get; set; }

        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
