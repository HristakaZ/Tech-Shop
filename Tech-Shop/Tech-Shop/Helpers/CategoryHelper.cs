using DataStructure.Models;
using System.Linq.Expressions;

namespace Tech_Shop.Helpers
{
    public static class CategoryHelper
    {
        public static Expression<Func<Category, bool>>? GetCategorySearchExpressionByKey(string? search = null)
        {
            if (!string.IsNullOrEmpty(search))
            {
                Expression<Func<Category, bool>>? searchExpression = x => x.Name.Contains(search);

                return searchExpression;
            }

            return null;
        }

        public static IQueryable<Category> OrderCategories(IQueryable<Category> categories,
            string? orderBy = null, string? orderByDirection = null)
        {
            if (orderByDirection == "desc")
            {
                switch (orderBy)
                {
                    case "name":
                        categories = categories.OrderByDescending(x => x.Name);
                        break;
                    default:
                        categories.OrderByDescending(x => x.Name);
                        break;
                }
            }
            else
            {
                switch (orderBy)
                {
                    case "name":
                        categories = categories.OrderBy(x => x.Name);
                        break;
                    default:
                        categories.OrderBy(x => x.Name);
                        break;
                }
            }

            return categories;
        }
    }
}