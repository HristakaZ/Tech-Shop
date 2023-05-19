using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Tech_Shop.Mappers;
using Tech_Shop.Roles;
using Tech_Shop.Services.User.Contracts;
using Tech_Shop.ViewModels.User;

namespace Tech_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IBaseRepository baseRepository;
        private readonly IUserService userService;
        private IConfiguration Configuration { get; }

        public UserController(IBaseRepository baseRepository,
            IUserService userService,
            IConfiguration configuration)
        {
            this.baseRepository = baseRepository;
            this.userService = userService;
            Configuration = configuration;

        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            IQueryable<User> users = baseRepository.GetAll<User>();
            if (users.Count() == 0)
            {
                return NotFound("No users were found.");
            }
            List<UserViewModel> userViewModels = UserModelToViewModelMapper.MapUserModelToViewModel(users);

            return Ok(userViewModels);
        }

        [HttpGet("{id}", Name = $"{nameof(GetByID)}")]
        [Authorize]
        public IActionResult GetByID(int id)
        {
            User user = baseRepository.GetByID<User>(id);

            if (user == null)
            {
                return NotFound("User was not found.");
            }

            UserViewModel userViewModel = UserModelToViewModelMapper.MapUserModelToViewModel(user);

            return Ok(userViewModel);
        }

        [HttpPost(Name = $"{nameof(Register)}")]
        public IActionResult Register([FromBody] User user)
        {
            user.Password = userService.HashPassword(user.Password);
            int ID = baseRepository.Create<User>(user);
            Uri uri = new Uri(Url.Link($"{nameof(GetByID)}", new { Id = ID }));

            return Created(uri, ID.ToString());
        }

        [HttpPost(Name = $"{nameof(Login)}")]
        public IActionResult Login([FromBody] User user)
        {
            string hashedPassword = userService.HashPassword(user.Password);
            User userFromDb = baseRepository.GetAll<User>().FirstOrDefault(x => x.Email == user.Email && x.Password == hashedPassword);
            if (userFromDb == null)
            {
                return NotFound("Wrong username or password.");
            }

            string secret = Configuration.GetSection("JWTConfiguration:secret").Value;
            string issuer = Configuration.GetSection("JWTConfiguration:issuer").Value;
            string audience = Configuration.GetSection("JWTConfiguration:audience").Value;

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, userFromDb.ID.ToString()),
                new Claim(ClaimTypes.Name, userFromDb.Email),
                new Claim(ClaimTypes.Role, userFromDb.IsAdmin ? RoleConstants.AdminRole : RoleConstants.UserRole)
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
            return Ok(new { Token = tokenString });
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Put(int id, [FromBody] UpdateUserViewModel updateUserViewModel)
        {
            User userFromDb = baseRepository.GetByID<User>(id);
            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userFromDb != null && loggedInUserId == userFromDb.ID)
            {
                userFromDb.PhoneNumber = updateUserViewModel.PhoneNumber;
                userFromDb.Address = updateUserViewModel.Address;
                userFromDb.Email = updateUserViewModel.Email;
                userFromDb.Name = updateUserViewModel.Name;
                baseRepository.Update<User>(userFromDb);
                return Ok("User's info was successfully updated.");
            }

            return NotFound("User was not found.");
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            User userToDelete = baseRepository.GetByID<User>(id);

            if (userToDelete == null)
            {
                return NotFound("User was not found.");
            }

            baseRepository.Delete<User>(userToDelete);
            return Ok("User was deleted.");
        }
    }
}
