using DataStructure.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Tech_Shop.ViewModels.Category;

namespace Tech_Shop.ViewModels.Product
{
    public class ProductViewModel : BaseEntity
    {
        public string Name { get; set; }

        public int Quantity { get; set; }

        [Precision(18, 2)]
        public decimal Price { get; set; }

        public CategoryViewModel Category { get; set; } = new CategoryViewModel();

        public List<Review> Reviews { get; set; } = new List<Review>(); //TO DO: might want to change to ReviewViewModel not to get the circular dependency loop
    }
}
