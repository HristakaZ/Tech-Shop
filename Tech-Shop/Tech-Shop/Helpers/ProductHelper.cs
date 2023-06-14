using DataStructure.Models;
using System.Linq.Expressions;

namespace Tech_Shop.Helpers
{
    public static class ProductHelper
    {
        public static Expression<Func<Product, bool>>? GetProductSearchExpressionByKey(string? search = null)
        {
            if (!string.IsNullOrEmpty(search))
            {
                Expression<Func<Product, bool>>? searchExpression = x => x.Category.Name.Contains(search) ||
                                                                         x.Price.ToString() == search ||
                                                                         x.Name.Contains(search);

                return searchExpression;
            }

            return null;
        }

        public static IQueryable<Product> OrderProducts(IQueryable<Product> products,
            string? orderBy = null, string? orderByDirection = null)
        {
            if (orderByDirection == "desc")
            {
                switch (orderBy)
                {
                    case "price":
                        products = products.OrderByDescending(x => x.Price);
                        break;
                    case "reviews":
                        products = products.OrderByDescending(x => x.Reviews.Count);
                        break;
                    default:
                        products.OrderByDescending(x => x.Reviews.Count);
                        break;
                }
            }
            else
            {
                switch (orderBy)
                {
                    case "price":
                        products = products.OrderBy(x => x.Price);
                        break;
                    case "reviews":
                        products = products.OrderBy(x => x.Reviews.Count);
                        break;
                    default:
                        products.OrderBy(x => x.Reviews.Count);
                        break;
                }
            }

            return products;
        }
    }
}
