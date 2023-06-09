﻿using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using Tech_Shop.Helpers;
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
        public IActionResult Get(string? search = null,
                                int? page = null,
                                int? pageSize = null,
                                string? orderBy = null,
                                string? orderByDirection = null)
        {
            Expression<Func<Product, bool>>? searchExpression = ProductHelper.GetProductSearchExpressionByKey(search);
            (IQueryable<Product> Products, int TotalCount) products =
                this.baseRepository.GetAll<Product>(searchExpression, page, pageSize);
            products.Products = ProductHelper.OrderProducts(products.Products, orderBy, orderByDirection);
            if (products.Products.Count() == 0)
            {
                return NotFound("No products were found.");
            }

            List<ProductViewModel> productViewModels = ProductModelViewModelMapper.MapProductToProductViewModel(products.Products,
                 $"{Request.Scheme}://{Request.Host.Value}/");
            ProductViewModelTotalCount productViewModelTotalCount = new ProductViewModelTotalCount(productViewModels, products.TotalCount);

            return Ok(productViewModelTotalCount);
        }

        [HttpPost]
        [Authorize]
        [Route($"{nameof(GetProductsByIDs)}")]
        public IActionResult GetProductsByIDs(List<int> productIDs)
        {
            (IQueryable<Product> Products, int TotalCount) products
                = this.baseRepository.GetAll<Product>(x => productIDs.Any(y => x.ID == y));
            if (products.Products.Count() == 0)
            {
                return NotFound("No products were found.");
            }

            List<ProductViewModel> productViewModels = ProductModelViewModelMapper.MapProductToProductViewModel(products.Products,
                 $"{Request.Scheme}://{Request.Host.Value}/");

            return Ok(productViewModels);
        }

        [HttpGet("{id}", Name = $"{nameof(GetProductByID)}")]
        [Authorize]
        public IActionResult GetProductByID(int id,
                                            string? search = null,
                                            int? page = null,
                                            int? pageSize = null,
                                            string? orderBy = null,
                                            string? orderByDirection = null)
        {
            Product product = this.baseRepository.GetByID<Product>(id);
            List<Expression<Func<Review, bool>>?> expressions = new List<Expression<Func<Review, bool>>?>()
            {
                x => x.Product.ID == product.ID,
                ReviewHelper.GetReviewSearchExpressionByKey(search)
            };
            (IQueryable<Review> Reviews, int TotalCount) reviews =
                this.baseRepository.GetAllWithMultipleFilters<Review>(expressions, page, pageSize);
            reviews.Reviews = ReviewHelper.OrderReviews(reviews.Reviews, orderBy, orderByDirection);
            if (product == null)
            {
                return NotFound("Product was not found.");
            }

            ProductViewModel productViewModel = ProductModelViewModelMapper.MapProductToProductViewModel(product,
                reviews.Reviews,
                $"{Request.Scheme}://{Request.Host.Value}/");
            GetProductByIdViewModelTotalCount getProductByIdViewModelTotalCount = new GetProductByIdViewModelTotalCount(
                productViewModel, reviews.TotalCount);

            return Ok(getProductByIdViewModelTotalCount);
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
                return NotFound("Product was not found.");
            }

            baseRepository.Delete<Product>(product);
            return Ok("Product was deleted.");
        }
    }
}
