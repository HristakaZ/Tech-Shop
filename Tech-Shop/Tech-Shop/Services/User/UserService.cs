using System.Security.Cryptography;
using System.Text;
using Tech_Shop.Services.User.Contracts;

namespace Tech_Shop.Services.User
{
    public class UserService : IUserService
    {
        public string HashPassword(string password)
        {
            byte[] hashBytes;
            using (SHA512 algorithm = SHA512.Create())
            {
                hashBytes = algorithm.ComputeHash(new UTF8Encoding().GetBytes(password));
            }

            return Convert.ToBase64String(hashBytes);
        }
    }
}
