using DataStructure.Models;
using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.Category
{
    public class UpdateCategoryViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
