using Tech_Shop.Mappers.Category;
using Tech_Shop.Mappers.Review;
using Tech_Shop.ViewModels.Product;

namespace Tech_Shop.Mappers.Product
{
    public static class ProductModelViewModelMapper
    {
        public static DataStructure.Models.Product MapCreateProductViewModelToModel(CreateProductViewModel createProductViewModel,
            DataStructure.Models.Category category)
        {
            return new DataStructure.Models.Product
            {
                Name = createProductViewModel.Name,
                Price = createProductViewModel.Price,
                Quantity = createProductViewModel.Quantity,
                Category = category
            };
        }

        public static DataStructure.Models.Product MapUpdateProductViewModelToModel(DataStructure.Models.Product product,
            UpdateProductViewModel updateProductViewModel,
            DataStructure.Models.Category category)
        {
            product.Name = updateProductViewModel.Name;
            product.Price = updateProductViewModel.Price;
            product.Quantity = updateProductViewModel.Quantity;
            product.Category = category;

            return product;
        }

        public static List<ProductViewModel> MapProductToProductViewModel(IQueryable<DataStructure.Models.Product> products)
        {
            List<ProductViewModel> productViewModels = new List<ProductViewModel>();
            foreach (DataStructure.Models.Product product in products)
            {
                productViewModels.Add(new ProductViewModel()
                {
                    ID = product.ID,
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = product.Quantity,
                    Category = CategoryModelViewModelMapper.MapCategoryToCategoryViewModel(product.Category),
                    Reviews = ReviewModelViewModelMapper.MapReviewModelToReviewViewModel(product.Reviews.AsQueryable())
                });
            }

            return productViewModels;
        }

        public static ProductViewModel MapProductToProductViewModel(DataStructure.Models.Product product)
        {
            return new ProductViewModel()
            {
                ID = product.ID,
                Name = product.Name,
                Price = product.Price,
                Quantity = product.Quantity,
                Category = CategoryModelViewModelMapper.MapCategoryToCategoryViewModel(product.Category),
                Reviews = ReviewModelViewModelMapper.MapReviewModelToReviewViewModel(product.Reviews.AsQueryable())
            };
        }
    }
}
