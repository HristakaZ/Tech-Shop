using DataStructure.Models;
using System.Linq.Expressions;

namespace Tech_Shop.Helpers
{
    public static class ReviewHelper
    {
        public static Expression<Func<Review, bool>>? GetReviewSearchExpressionByKey(string? search = null)
        {
            if (!string.IsNullOrEmpty(search))
            {
                Expression<Func<Review, bool>>? searchExpression = x => x.Comment.Contains(search) ||
                                                                        x.User.Name.Contains(search);

                return searchExpression;
            }

            return null;
        }

        public static IQueryable<Review> OrderReviews(IQueryable<Review> reviews,
            string? orderBy = null, string? orderByDirection = null)
        {
            if (orderByDirection == "desc")
            {
                switch (orderBy)
                {
                    case "comment":
                        reviews = reviews.OrderByDescending(x => x.Comment);
                        break;
                    case "rating":
                        reviews = reviews.OrderByDescending(x => x.Rating);
                        break;
                    default:
                        reviews.OrderByDescending(x => x.Rating);
                        break;
                }
            }
            else
            {
                switch (orderBy)
                {
                    case "comment":
                        reviews = reviews.OrderBy(x => x.Comment);
                        break;
                    case "rating":
                        reviews = reviews.OrderBy(x => x.Rating);
                        break;
                    default:
                        reviews.OrderBy(x => x.Rating);
                        break;
                }
            }

            return reviews;
        }
    }
}
