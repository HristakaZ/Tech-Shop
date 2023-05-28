using System.ComponentModel.DataAnnotations;

namespace DataStructure.Models
{
    public class Review : BaseEntity
    {
        public string? Comment { get; set; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; set; }

        [Required]
        public virtual Product Product { get; set; } = new Product();

        [Required]
        public virtual User User { get; set; } = new User();
    }
}
