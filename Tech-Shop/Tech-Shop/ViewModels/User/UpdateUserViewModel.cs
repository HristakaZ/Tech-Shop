using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.User
{
    public class UpdateUserViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [MaxLength(10)]
        public string PhoneNumber { get; set; }
    }
}
