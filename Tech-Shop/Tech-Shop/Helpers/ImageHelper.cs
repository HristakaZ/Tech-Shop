using Microsoft.Extensions.Primitives;

namespace Tech_Shop.Helpers
{
    public static class ImageHelper
    {
        public static IFormFile? GetImageFromImagePath(string imagePath, string basePublicUrl)
        {
            IFormFile? formFile = null;
            if (!string.IsNullOrEmpty(imagePath))
            {
                string absolutePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/", imagePath);
                string publicPath = Path.Combine(basePublicUrl, imagePath);
                using (FileStream stream = File.OpenRead(absolutePath))
                {
                    string contentDisposition = $"form-data; name=\"photo\"; filename=\"{Path.GetFileName(stream.Name)}\"";
                    string contentType = $"image/{Path.GetExtension(stream.Name).Replace(".", "")}";
                    formFile = new FormFile(stream, 0, stream.Length, publicPath, Path.GetFileName(stream.Name))
                    {
                        Headers = new HeaderDictionary()/*,
                        ContentDisposition = contentDisposition,
                        ContentType = contentType*/
                    };
                }
            }

            return formFile;
        }
    }
}
