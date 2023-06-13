using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.User
{
    public class ForgottenPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
