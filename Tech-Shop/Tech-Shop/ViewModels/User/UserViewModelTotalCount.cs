namespace Tech_Shop.ViewModels.User
{
    public class UserViewModelTotalCount
    {
        public List<UserViewModel> Users { get; set; }

        public int TotalCount { get; set; }

        public UserViewModelTotalCount(List<UserViewModel> users,
            int totalCount)
        {
            this.Users = users;
            this.TotalCount = totalCount;
        }
    }
}
