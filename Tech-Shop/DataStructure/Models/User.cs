using System.ComponentModel.DataAnnotations;

namespace DataStructure.Models
{
    public class User : BaseEntity
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$", ErrorMessage = "The password must contain 1 number, 1 lowercase letter, 1 uppercase letter and 1 special character and must be at least 8 characters long.")]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        public virtual List<Order> Orders { get; set; } = new List<Order>();

        public virtual List<Review> Reviews { get; set; } = new List<Review>();
    }
}
