using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.Order
{
    public class CreateOrderViewModel
    {
        [Required]
        public string Address { get; set; }

        [Required]
        public virtual List<int> ProductIDs { get; set; } = new List<int>();
    }
}
