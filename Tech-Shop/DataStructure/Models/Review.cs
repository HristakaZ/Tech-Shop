using System.ComponentModel.DataAnnotations;

namespace DataStructure.Models
{
    public class Review : BaseEntity
    {
        public string? Comment { get; set; }

        [MinLength(0)]
        [MaxLength(5)]
        public int Rating { get; set; }

        public virtual Product Product { get; set; } = new Product();

        public virtual User User { get; set; } = new User();
    }
}
