using System.ComponentModel.DataAnnotations;

namespace DataStructure.Models
{
    public class Order : BaseEntity
    {
        [Required]
        public string Address { get; set; }

        [Required]
        public virtual List<Product> Products { get; set; } = new List<Product>();

        [Required]
        public virtual User User { get; set; } = new User();
    }
}
