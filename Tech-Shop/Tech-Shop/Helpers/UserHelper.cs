using DataStructure.Models;
using System.Linq.Expressions;

namespace Tech_Shop.Helpers
{
    public static class UserHelper
    {
        public static Expression<Func<User, bool>>? GetUserSearchExpressionByKey(string? search = null)
        {
            if (!string.IsNullOrEmpty(search))
            {
                Expression<Func<User, bool>>? searchExpression = x => x.Email.Contains(search) ||
                                                                      x.Name.Contains(search) ||
                                                                      x.PhoneNumber.Contains(search);

                return searchExpression;
            }

            return null;
        }

        public static IQueryable<User> OrderUsers(IQueryable<User> users,
            string? orderBy = null, string? orderByDirection = null)
        {
            if (orderByDirection == "desc")
            {
                switch (orderBy)
                {
                    case "email":
                        users = users.OrderByDescending(x => x.Email);
                        break;
                    case "name":
                        users = users.OrderByDescending(x => x.Name);
                        break;
                    default:
                        users.OrderByDescending(x => x.Email);
                        break;
                }
            }
            else
            {
                switch (orderBy)
                {
                    case "email":
                        users = users.OrderBy(x => x.Email);
                        break;
                    case "name":
                        users = users.OrderBy(x => x.Name);
                        break;
                    default:
                        users.OrderBy(x => x.Email);
                        break;
                }
            }

            return users;
        }
    }
}
