using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.Review
{
    public class CreateReviewViewModel
    {
        public string? Comment { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [Required]
        public int ProductID { get; set; }
    }
}
