namespace Tech_Shop.Services.User.Contracts
{
    public interface IUserService
    {
        string HashPassword(string password);
    }
}
