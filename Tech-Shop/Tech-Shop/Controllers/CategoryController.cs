using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Security.Claims;
using Tech_Shop.Helpers;
using Tech_Shop.Mappers.Category;
using Tech_Shop.Roles;
using Tech_Shop.ViewModels.Category;
using Tech_Shop.ViewModels.User;

namespace Tech_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IBaseRepository baseRepository;
        public CategoryController(IBaseRepository baseRepository)
        {
            this.baseRepository = baseRepository;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get(string? search = null,
                                int? page = null,
                                int? pageSize = null,
                                string? orderBy = null,
                                string? orderByDirection = null)
        {
            Expression<Func<Category, bool>>? searchExpression = CategoryHelper.GetCategorySearchExpressionByKey(search);
            (IQueryable<Category> Categories, int TotalCount) categories =
                this.baseRepository.GetAll<Category>(searchExpression, page, pageSize);
            categories.Categories = CategoryHelper.OrderCategories(categories.Categories, orderBy, orderByDirection);
            if (categories.Categories.Count() == 0)
            {
                return NotFound("No categories were found.");
            }

            List<CategoryViewModel> categoryViewModels = CategoryModelViewModelMapper.MapCategoryToCategoryViewModel(categories.Categories);
            CategoryViewModelTotalCount categoryViewModelTotalCount = new CategoryViewModelTotalCount(categoryViewModels, categories.TotalCount);

            return Ok(categoryViewModelTotalCount);
        }

        [HttpGet("{id}", Name = $"{nameof(GetCategoryByID)}")]
        [Authorize]
        public IActionResult GetCategoryByID(int id)
        {
            Category category = baseRepository.GetByID<Category>(id);
            if (category == null)
            {
                return NotFound("Category was not found.");
            }

            CategoryViewModel categoryViewModel = CategoryModelViewModelMapper.MapCategoryToCategoryViewModel(category);
            return Ok(categoryViewModel);
        }

        [HttpPost]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Post([FromBody] CreateCategoryViewModel createCategoryViewModel)
        {
            Category category = CategoryModelViewModelMapper.MapCreateCategoryViewModelToModel(createCategoryViewModel);
            int ID = baseRepository.Create<Category>(category);
            Uri uri = new Uri(Url.Link($"{nameof(GetCategoryByID)}", new { Id = ID }));

            return Created(uri, ID.ToString());
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Put(int id, [FromBody] UpdateCategoryViewModel updateCategoryViewModel)
        {
            Category category = baseRepository.GetByID<Category>(id);
            if (category != null)
            {
                category.Name = updateCategoryViewModel.Name;
                baseRepository.Update<Category>(category);
                return Ok("Category's info was successfully updated.");
            }

            return NotFound("Category was not found.");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Delete(int id)
        {
            Category categoryToDelete = baseRepository.GetByID<Category>(id);

            if (categoryToDelete == null)
            {
                return NotFound("Category was not found.");
            }

            baseRepository.Delete<Category>(categoryToDelete);
            return Ok("Category was deleted.");
        }
    }
}
