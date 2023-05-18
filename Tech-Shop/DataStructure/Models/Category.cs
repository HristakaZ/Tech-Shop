using System.ComponentModel.DataAnnotations;

namespace DataStructure.Models
{
    public class Category : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        public virtual List<Product> Products { get; set; } = new List<Product>();
    }
}
