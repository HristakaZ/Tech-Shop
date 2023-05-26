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

        public virtual List<Order> Orders { get; set; } = new List<Order>(); //TO DO: if you are going to display the orders(we probably won't need them except for the OrderCount of the given Product), you might want to change to OrderViewModel not to get the circular dependency loop 

        public CategoryViewModel Category { get; set; } = new CategoryViewModel();

        public virtual List<Review> Reviews { get; set; } = new List<Review>(); //TO DO: might want to change to ReviewViewModel not to get the circular dependency loop
    }
}
