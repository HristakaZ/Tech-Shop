using DataStructure.Models;
using Tech_Shop.Roles;
using Tech_Shop.ViewModels.User;

namespace Tech_Shop.Mappers.User
{
    public static class UserModelViewModelMapper
    {
        public static List<UserViewModel> MapUserModelToViewModel(IQueryable<DataStructure.Models.User> users)
        {
            List<UserViewModel> userViewModels = new List<UserViewModel>();
            foreach (DataStructure.Models.User user in users)
            {
                userViewModels.Add(new UserViewModel()
                {
                    Name = user.Name,
                    Address = user.Address,
                    Email = user.Email,
                    Orders = user.Orders,
                    PhoneNumber = user.PhoneNumber,
                    Reviews = user.Reviews,
                    Role = user.IsAdmin ? RoleConstants.AdminRole : RoleConstants.UserRole
                });
            }

            return userViewModels;
        }

        public static UserViewModel MapUserModelToViewModel(DataStructure.Models.User user)
        {
            return new UserViewModel()
            {
                Address = user.Address,
                Email = user.Email,
                Name = user.Name,
                Orders = user.Orders,
                PhoneNumber = user.PhoneNumber,
                Reviews = user.Reviews,
                Role = user.IsAdmin ? RoleConstants.AdminRole : RoleConstants.UserRole
            };
        }

        public static DataStructure.Models.User MapUserRegisterViewModelToModel(UserRegisterViewModel userRegisterViewModel)
        {
            return new DataStructure.Models.User()
            {
                Email = userRegisterViewModel.Email,
                Password = userRegisterViewModel.Password,
                Name = userRegisterViewModel.Name,
                Address = userRegisterViewModel.Address,
                PhoneNumber = userRegisterViewModel.PhoneNumber
            };
        }
    }
}
