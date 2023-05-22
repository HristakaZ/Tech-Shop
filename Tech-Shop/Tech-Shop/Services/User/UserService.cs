using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Tech_Shop.Roles;
using Tech_Shop.Services.User.Contracts;

namespace Tech_Shop.Services.User
{
    public class UserService : IUserService
    {
        private IConfiguration Configuration { get; }
        public UserService(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public string CreateToken(DataStructure.Models.User user)
        {
            string secret = Configuration.GetSection("JWTConfiguration:secret").Value;
            string issuer = Configuration.GetSection("JWTConfiguration:issuer").Value;
            string audience = Configuration.GetSection("JWTConfiguration:audience").Value;

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.IsAdmin ? RoleConstants.AdminRole : RoleConstants.UserRole)
            };

            JwtSecurityToken tokenOptions = new JwtSecurityToken
                            (
                                issuer: issuer,
                                audience: audience,
                                claims: claims,
                                expires: DateTime.Now.AddMinutes(30),
                                signingCredentials: signInCredentials
                            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return tokenString;
        }

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
