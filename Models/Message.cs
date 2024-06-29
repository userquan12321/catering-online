using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Message
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        public int ReceiverId { get; set; }

        public string Content { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual User Receiver { get; set; } = null!;

        public virtual User Sender { get; set; } = null!;
    }
}