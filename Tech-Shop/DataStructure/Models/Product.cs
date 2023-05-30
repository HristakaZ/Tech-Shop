using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace DataStructure.Models
{
    public class Product : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Precision(18, 2)]
        [Required]
        public decimal Price { get; set; }

        public string? ImagePath { get; set; }

        public virtual List<Order> Orders { get; set; } = new List<Order>();

        [Required]
        public virtual Category Category { get; set; } = new Category();

        public virtual List<Review> Reviews { get; set; } = new List<Review>();
    }
}
