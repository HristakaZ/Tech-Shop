using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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
        public IActionResult Get()
        {
            IQueryable<Category> categories = baseRepository.GetAll<Category>();
            if (categories.Count() == 0)
            {
                return NotFound("No categories were found.");
            }

            return Ok(categories);
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

            return Ok(category);
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

        [HttpPut]
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

        [HttpDelete]
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
