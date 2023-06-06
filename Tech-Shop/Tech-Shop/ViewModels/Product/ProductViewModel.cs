using DataStructure.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Tech_Shop.ViewModels.Category;
using Tech_Shop.ViewModels.Review;

namespace Tech_Shop.ViewModels.Product
{
    public class ProductViewModel : BaseEntity
    {
        public string Name { get; set; }

        public int Quantity { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }

        public IFormFile? Photo { get; set; }

        public string? ImagePath { get; set; }

        public CategoryViewModel Category { get; set; } = new CategoryViewModel();

        public List<ReviewViewModel> Reviews { get; set; } = new List<ReviewViewModel>();
    }
}
