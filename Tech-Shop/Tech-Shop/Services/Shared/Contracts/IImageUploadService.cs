namespace Tech_Shop.Services.Shared.Contracts
{
    public interface IImageUploadService
    {
        Task<string> UploadImageAsync(IFormFile file);

        bool IsFileExtensionValid(IFormFile file);
    }
}
