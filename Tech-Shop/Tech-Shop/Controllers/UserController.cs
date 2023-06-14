using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Security.Claims;
using Tech_Shop.Helpers;
using Tech_Shop.Mappers.User;
using Tech_Shop.Roles;
using Tech_Shop.Services.Shared.Contracts;
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
        private IMailingService mailingService;

        public UserController(IBaseRepository baseRepository,
            IUserService userService,
            IConfiguration configuration,
            IMailingService mailingService)
        {
            this.baseRepository = baseRepository;
            this.userService = userService;
            Configuration = configuration;
            this.mailingService = mailingService;
        }

        [HttpGet]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Get(string? search = null,
                                int? page = null,
                                int? pageSize = null,
                                string? orderBy = null,
                                string? orderByDirection = null)
        {
            Expression<Func<User, bool>>? searchExpression = UserHelper.GetUserSearchExpressionByKey(search);
            IQueryable<User> users = baseRepository.GetAll<User>(searchExpression, page, pageSize);
            users = UserHelper.OrderUsers(users, orderBy, orderByDirection);
            if (users.Count() == 0)
            {
                return NotFound("No users were found.");
            }
            List<UserViewModel> userViewModels = UserModelViewModelMapper.MapUserModelToViewModel(users);
            return Ok(userViewModels);
        }

        [HttpGet("{id}", Name = $"{nameof(GetUserByID)}")]
        [Authorize]
        public IActionResult GetUserByID(int id)
        {
            User user = baseRepository.GetByID<User>(id);
            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            bool isLoggedInUserAdmin = User.FindFirst(ClaimTypes.Role).Value == RoleConstants.AdminRole;

            if (user != null && (user.ID == loggedInUserId || isLoggedInUserAdmin))
            {
                UserViewModel userViewModel = UserModelViewModelMapper.MapUserModelToViewModel(user);
                return Ok(userViewModel);
            }

            return NotFound("User was not found.");
        }

        [HttpPost]
        [Route($"{nameof(Register)}")]
        public IActionResult Register([FromBody] UserRegisterViewModel userRegisterViewModel)
        {
            bool isEmailTaken = this.baseRepository.GetAll<User>().Where(x => x.Email == userRegisterViewModel.Email).FirstOrDefault() != null;
            if (isEmailTaken)
            {
                return BadRequest("This email is taken. Please choose a unique one.");
            }
            User user = UserModelViewModelMapper.MapUserRegisterViewModelToModel(userRegisterViewModel);
            user.Password = userService.HashPassword(user.Password);
            int ID = baseRepository.Create<User>(user);
            Uri uri = new Uri(Url.Link($"{nameof(GetUserByID)}", new { Id = ID }));

            return Created(uri, ID.ToString());
        }

        [HttpPost]
        [Route($"{nameof(Login)}")]
        public IActionResult Login([FromBody] UserLoginViewModel userLoginViewModel)
        {
            string hashedPassword = userService.HashPassword(userLoginViewModel.Password);
            User userFromDb = baseRepository.GetAll<User>().FirstOrDefault(x => x.Email == userLoginViewModel.Email && x.Password == hashedPassword);
            if (userFromDb == null)
            {
                return NotFound("Wrong username or password.");
            }

            string tokenString = userService.CreateToken(userFromDb);

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
            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            bool isLoggedInUserAdmin = User.FindFirst(ClaimTypes.Role).Value == RoleConstants.AdminRole;
            if (userToDelete != null && (userToDelete.ID == loggedInUserId || isLoggedInUserAdmin))
            {
                baseRepository.Delete<User>(userToDelete);
                return Ok("User was deleted.");
            }

            return NotFound("User was not found.");
        }

        [HttpPatch]
        [Authorize]
        [Route($"{nameof(ChangePassword)}")]
        public IActionResult ChangePassword(ChangePasswordViewModel changePasswordViewModel)
        {
            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User user = this.baseRepository.GetByID<User>(loggedInUserId);
            if (userService.HashPassword(changePasswordViewModel.OldPassword) != user.Password)
            {
                return BadRequest("The old password is incorrect.");
            }

            if (changePasswordViewModel.NewPassword != changePasswordViewModel.ConfirmNewPassword)
            {
                return BadRequest("New password and confirm new password do not match.");
            }

            string newPassword = userService.HashPassword(changePasswordViewModel.NewPassword);
            user.Password = newPassword;
            this.baseRepository.Update<User>(user);

            return Ok("User's password change was successful.");
        }

        [HttpPatch]
        [Route($"{nameof(ForgottenPassword)}")]
        public IActionResult ForgottenPassword(ForgottenPasswordViewModel forgottenPasswordViewModel)
        {
            User user = this.baseRepository.GetAll<User>().Where(x => x.Email == forgottenPasswordViewModel.Email).FirstOrDefault();
            if (user != null)
            {
                string password = Guid.NewGuid().ToString();
                this.mailingService.SendForgottenPasswordEmail(forgottenPasswordViewModel, password);
                user.Password = userService.HashPassword(password);
                this.baseRepository.Update<User>(user);
            }

            return Ok("Forgotten password email successfully sent to the user.");
        }
    }
}
