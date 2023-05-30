using System.Collections.ObjectModel;
using Tech_Shop.Services.Shared.Contracts;

namespace Tech_Shop.Services.Shared
{
    public class ImageUploadService : IImageUploadService
    {
        private readonly IReadOnlyCollection<string> validFileExtensions = new ReadOnlyCollection<string>(new List<string>()
        {
            ".jpg",
            ".jpeg",
            ".png"
        });

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            string relativeImagePath = Path.Combine("wwwroot/images/", file.FileName);
            string absoluteImagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/", file.FileName);
            using (FileStream fileStream = new FileStream(absoluteImagePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return relativeImagePath;
        }

        public bool IsFileExtensionValid(IFormFile file)
        {
            string fileExtension = Path.GetExtension(file.FileName);
            if (!validFileExtensions.Any(x => x == fileExtension))
            {
                return false;
            }

            return true;
        }
    }
}
