using System.ComponentModel.DataAnnotations;

namespace DataStructure.Models
{
    public class Order : BaseEntity
    {
        [Required]
        public string Address { get; set; }

        public virtual List<Product> Products { get; set; } = new List<Product>();

        public virtual User User { get; set; } = new User();
    }
}
