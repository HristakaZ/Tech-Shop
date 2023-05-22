namespace Tech_Shop.Services.User.Contracts
{
    public interface IUserService
    {
        string HashPassword(string password);

        string CreateToken(DataStructure.Models.User user);
    }
}
