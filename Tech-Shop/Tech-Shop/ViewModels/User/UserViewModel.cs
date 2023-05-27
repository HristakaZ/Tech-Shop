using DataStructure.Models;
using Tech_Shop.ViewModels.Order;

namespace Tech_Shop.ViewModels.User
{
    public class UserViewModel
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Role { get; set; }

        public virtual List<OrderViewModel> Orders { get; set; } = new List<OrderViewModel>();

        public virtual List<Review> Reviews { get; set; } = new List<Review>();
    }
}
