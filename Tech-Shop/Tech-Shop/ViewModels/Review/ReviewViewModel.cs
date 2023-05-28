using DataStructure.Models;
using System.ComponentModel.DataAnnotations;
using Tech_Shop.ViewModels.Product;
using Tech_Shop.ViewModels.User;

namespace Tech_Shop.ViewModels.Review
{
    public class ReviewViewModel : BaseEntity
    {
        public string? Comment { get; set; }

        public int Rating { get; set; }

        public string Product { get; set; }

        public UserViewModel User { get; set; } = new UserViewModel();
    }
}
