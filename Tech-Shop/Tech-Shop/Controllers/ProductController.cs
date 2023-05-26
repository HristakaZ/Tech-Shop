﻿using DataAccess.Contracts;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tech_Shop.Mappers.Product;
using Tech_Shop.Roles;
using Tech_Shop.ViewModels.Product;

namespace Tech_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IBaseRepository baseRepository;
        public ProductController(IBaseRepository baseRepository)
        {
            this.baseRepository = baseRepository;
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

            List<ProductViewModel> productViewModels = ProductModelViewModelMapper.MapProductToProductViewModel(products);
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

            ProductViewModel productViewModel = ProductModelViewModelMapper.MapProductToProductViewModel(product);
            return Ok(productViewModel);
        }

        [HttpPost]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Post([FromBody] CreateProductViewModel createProductViewModel)
        {
            Category category = baseRepository.GetByID<Category>(createProductViewModel.CategoryID);

            if (category == null)
            {
                return NotFound("Category of product was not found.");
            }

            Product product = ProductModelViewModelMapper.MapCreateProductViewModelToModel(createProductViewModel, category);
            int ID = baseRepository.Create<Product>(product);
            Uri uri = new Uri(Url.Link($"{nameof(GetProductByID)}", new { Id = ID }));

            return Created(uri, ID.ToString());
        }

        [HttpPut]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Put(int id, [FromBody] UpdateProductViewModel updateProductViewModel)
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

            product = ProductModelViewModelMapper.MapUpdateProductViewModelToModel(product, updateProductViewModel, category);
            baseRepository.Update<Product>(product);

            return Ok("Product's info was successfully updated.");
        }

        [HttpDelete]
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