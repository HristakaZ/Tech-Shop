using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.Order
{
    public class PlaceOrderViewModel
    {
        [Required]
        public string Address { get; set; }

        [Required]
        public List<int> ProductIDs { get; set; } = new List<int>();
    }
}
