using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tech_Shop.Mappers.Product;
using Tech_Shop.Roles;
using Tech_Shop.Services.Shared.Contracts;
using Tech_Shop.ViewModels.Product;

namespace Tech_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IBaseRepository baseRepository;
        private readonly IImageUploadService imageUploadService;
        public ProductController(IBaseRepository baseRepository,
            IImageUploadService imageUploadService)
        {
            this.baseRepository = baseRepository;
            this.imageUploadService = imageUploadService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            IQueryable<Product> products = this.baseRepository.GetAll<Product>();
            if (products.Count() == 0)
            {
                return NotFound("No products were found.");
            }

            List<ProductViewModel> productViewModels = ProductModelViewModelMapper.MapProductToProductViewModel(products,
                 $"{Request.Scheme}://{Request.Host.Value}/");
            return Ok(productViewModels);
        }

        [HttpPost]
        [Authorize]
        [Route($"{nameof(GetProductsByIDs)}")]
        public IActionResult GetProductsByIDs(List<int> productIDs)
        {
            IQueryable<Product> products = this.baseRepository.GetAll<Product>(x => productIDs.Any(y => x.ID == y));
            if (products.Count() == 0)
            {
                return NotFound("No products were found.");
            }

            List<ProductViewModel> productViewModels = ProductModelViewModelMapper.MapProductToProductViewModel(products,
                 $"{Request.Scheme}://{Request.Host.Value}/");
            return Ok(productViewModels);
        }

        [HttpGet("{id}", Name = $"{nameof(GetProductByID)}")]
        [Authorize]
        public IActionResult GetProductByID(int id)
        {
            Product product = this.baseRepository.GetByID<Product>(id);
            if (product == null)
            {
                return NotFound("Product was not found.");
            }

            ProductViewModel productViewModel = ProductModelViewModelMapper.MapProductToProductViewModel(product,
                $"{Request.Scheme}://{Request.Host.Value}/");
            return Ok(productViewModel);
        }

        [HttpPost]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public async Task<IActionResult> Post([FromForm] CreateProductViewModel createProductViewModel)
        {
            Category category = baseRepository.GetByID<Category>(createProductViewModel.CategoryID);

            if (category == null)
            {
                return NotFound("Category of product was not found.");
            }

            string? imagePath = null;
            if (createProductViewModel.Photo != null)
            {
                if (!imageUploadService.IsFileExtensionValid(createProductViewModel.Photo))
                {
                    return BadRequest("No valid file extension was found.");
                }

                imagePath = await imageUploadService.UploadImageAsync(createProductViewModel.Photo);
            }

            Product product = ProductModelViewModelMapper.MapCreateProductViewModelToModel(createProductViewModel, category,
                imagePath);
            int ID = baseRepository.Create<Product>(product);
            Uri uri = new Uri(Url.Link($"{nameof(GetProductByID)}", new { Id = ID }));

            return Created(uri, ID.ToString());
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public async Task<IActionResult> Put(int id, [FromForm] UpdateProductViewModel updateProductViewModel)
        {
            Product product = baseRepository.GetByID<Product>(id);
            if (product == null)
            {
                return NotFound("Product was not found.");
            }

            Category category = baseRepository.GetByID<Category>(updateProductViewModel.CategoryID);

            if (category == null)
            {
                return NotFound("Category of product was not found.");
            }

            string? imagePath = null;
            if (updateProductViewModel.Photo != null)
            {
                if (!imageUploadService.IsFileExtensionValid(updateProductViewModel.Photo))
                {
                    return BadRequest("No valid file extension was found.");
                }

                imagePath = await imageUploadService.UploadImageAsync(updateProductViewModel.Photo);
            }

            product = ProductModelViewModelMapper.MapUpdateProductViewModelToModel(product, updateProductViewModel, category,
                imagePath);
            baseRepository.Update<Product>(product);

            return Ok("Product's info was successfully updated.");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Delete(int id)
        {
            Product product = baseRepository.GetByID<Product>(id);
            if (product == null)
            {
                return NotFound("Product was not found");
            }

            baseRepository.Delete<Product>(product);
            return Ok("Product was deleted.");
        }
    }
}
