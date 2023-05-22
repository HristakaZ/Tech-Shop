using DataStructure.Models;
using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.Category
{
    public class CreateCategoryViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
