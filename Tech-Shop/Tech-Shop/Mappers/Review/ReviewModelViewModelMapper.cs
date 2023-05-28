using DataStructure.Models;
using Tech_Shop.Mappers.Product;
using Tech_Shop.Mappers.User;
using Tech_Shop.ViewModels.Review;

namespace Tech_Shop.Mappers.Review
{
    public static class ReviewModelViewModelMapper
    {
        public static List<ReviewViewModel> MapReviewModelToReviewViewModel(IQueryable<DataStructure.Models.Review> reviews)
        {
            List<ReviewViewModel> reviewViewModels = new List<ReviewViewModel>();
            foreach (DataStructure.Models.Review review in reviews)
            {
                reviewViewModels.Add(new ReviewViewModel()
                {
                    ID = review.ID,
                    Comment = review.Comment,
                    Rating = review.Rating,
                    Product = review.Product.Name,
                    User = UserModelViewModelMapper.MapUserModelToViewModel(review.User)
                });
            }

            return reviewViewModels;
        }

        public static ReviewViewModel MapReviewModelToReviewViewModel(DataStructure.Models.Review review)
        {
            return new ReviewViewModel()
            {
                ID = review.ID,
                Comment = review.Comment,
                Rating = review.Rating,
                Product = review.Product.Name,
                User = UserModelViewModelMapper.MapUserModelToViewModel(review.User)
            };
        }

        public static DataStructure.Models.Review MapCreateReviewViewModelToReviewModel(CreateReviewViewModel createReviewViewModel,
            DataStructure.Models.Product product,
            DataStructure.Models.User user)
        {
            return new DataStructure.Models.Review()
            {
                Comment = createReviewViewModel.Comment,
                Rating = createReviewViewModel.Rating,
                Product = product,
                User = user
            };
        }

        public static DataStructure.Models.Review MapUpdateReviewViewModelToReviewModel(DataStructure.Models.Review review,
            UpdateReviewViewModel updateReviewViewModel,
            DataStructure.Models.Product product,
            DataStructure.Models.User user)
        {
            review.Comment = updateReviewViewModel.Comment;
            review.Rating = updateReviewViewModel.Rating;
            review.Product = product;
            review.User = user;

            return review;
        }
    }
}
