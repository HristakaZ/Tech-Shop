using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.Product
{
    public class CreateProductViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Precision(18, 2)]
        [Required]
        public decimal Price { get; set; }

        [Required]
        public int CategoryID { get; set; }
    }
}
