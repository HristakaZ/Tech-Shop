using DataStructure.Models;

namespace Tech_Shop.ViewModels.User
{
    public class UserViewModel : BaseEntity
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Role { get; set; }

        public virtual List<Order> Orders { get; set; } = new List<Order>();

        public virtual List<Review> Reviews { get; set; } = new List<Review>();
    }
}
