using DataStructure.Models;
using System.Linq.Expressions;

namespace Tech_Shop.Helpers
{
    public static class OrderHelper
    {
        public static Expression<Func<Order, bool>>? GetOrderSearchExpressionByKey(string? search = null)
        {
            if (!string.IsNullOrEmpty(search))
            {
                Expression<Func<Order, bool>>? searchExpression = x => x.User.Name.Contains(search) ||
                                                                       x.User.Email.Contains(search) ||
                                                                       x.Products.FirstOrDefault(y => y.Name.Contains(search)) != null ||
                                                                       x.Address.Contains(search);

                return searchExpression;
            }

            return null;
        }

        public static IQueryable<Order> OrderOrders(IQueryable<Order> orders,
            string? orderBy = null, string? orderByDirection = null)
        {
            if (orderByDirection == "desc")
            {
                switch (orderBy)
                {
                    case "user":
                        orders = orders.OrderByDescending(x => x.User.Name);
                        break;
                    case "status":
                        orders = orders.OrderByDescending(x => x.Status);
                        break;
                    default:
                        orders.OrderByDescending(x => x.User.Name);
                        break;
                }
            }
            else
            {
                switch (orderBy)
                {
                    case "user":
                        orders = orders.OrderBy(x => x.User.Name);
                        break;
                    case "status":
                        orders = orders.OrderBy(x => x.Status);
                        break;
                    default:
                        orders.OrderBy(x => x.User.Name);
                        break;
                }
            }

            return orders;
        }
    }
}
