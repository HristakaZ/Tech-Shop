using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tech_Shop.Mappers.Review;
using Tech_Shop.Roles;
using Tech_Shop.ViewModels.Review;

namespace Tech_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IBaseRepository baseRepository;
        public ReviewController(IBaseRepository baseRepository)
        {
            this.baseRepository = baseRepository;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            IQueryable<Review> reviews = baseRepository.GetAll<Review>();
            if (reviews.Count() == 0)
            {
                return NotFound("No reviews were found.");
            }
            List<ReviewViewModel> reviewViewModels = ReviewModelViewModelMapper.MapReviewModelToReviewViewModel(reviews);

            return Ok(reviewViewModels);
        }

        [HttpGet("{id}", Name = $"{nameof(GetReviewByID)}")]
        [Authorize]
        public IActionResult GetReviewByID(int id)
        {
            Review review = baseRepository.GetByID<Review>(id);

            if (review == null)
            {
                return NotFound("Review was not found.");
            }
            ReviewViewModel reviewViewModel = ReviewModelViewModelMapper.MapReviewModelToReviewViewModel(review);

            return Ok(reviewViewModel);
        }

        [HttpPost]
        [Authorize(Roles = RoleConstants.UserRole)]
        public IActionResult Post([FromBody] CreateReviewViewModel createReviewViewModel)
        {
            Product product = baseRepository.GetByID<Product>(createReviewViewModel.ProductID);
            if (product == null)
            {
                return NotFound("There was no product found for reviewing.");
            }

            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User user = baseRepository.GetByID<User>(loggedInUserId);
            Review review = ReviewModelViewModelMapper.MapCreateReviewViewModelToReviewModel(createReviewViewModel, product, user);
            int ID = baseRepository.Create<Review>(review);
            Uri uri = new Uri(Url.Link($"{nameof(GetReviewByID)}", new { Id = ID }));

            return Created(uri, ID.ToString());
        }

        [HttpPut]
        [Authorize(Roles = RoleConstants.UserRole)]
        public IActionResult Put(int id, [FromBody] UpdateReviewViewModel updateReviewViewModel)
        {
            Review review = baseRepository.GetByID<Review>(id);
            if (review == null)
            {
                return NotFound("Review was not found.");
            }

            Product product = baseRepository.GetByID<Product>(updateReviewViewModel.ProductID);

            if (product == null)
            {
                return NotFound("No product for reviewing was found.");
            }

            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User user = baseRepository.GetByID<User>(loggedInUserId);
            review = ReviewModelViewModelMapper.MapUpdateReviewViewModelToReviewModel(review, updateReviewViewModel, product, user);
            if (review.User.ID == loggedInUserId)
            {
                baseRepository.Update<Review>(review);
            }

            return Ok("Review's info was successfully updated.");
        }

        [HttpDelete]
        [Authorize(Roles = RoleConstants.UserRole)]
        public IActionResult Delete(int id)
        {
            Review review = baseRepository.GetByID<Review>(id);
            if (review == null)
            {
                return NotFound("Review was not found.");
            }
            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User user = baseRepository.GetByID<User>(loggedInUserId);

            if (review.User.ID == loggedInUserId)
            {
                baseRepository.Delete<Review>(review);
            }

            return Ok("Review was deleted.");
        }
    }
}
