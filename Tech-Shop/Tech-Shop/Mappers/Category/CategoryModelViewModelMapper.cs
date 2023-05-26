using Tech_Shop.Mappers.Product;
using Tech_Shop.ViewModels.Category;
using Tech_Shop.ViewModels.Product;

namespace Tech_Shop.Mappers.Category
{
    public static class CategoryModelViewModelMapper
    {
        public static DataStructure.Models.Category MapCreateCategoryViewModelToModel(CreateCategoryViewModel createCategoryViewModel)
        {
            return new DataStructure.Models.Category()
            {
                Name = createCategoryViewModel.Name
            };
        }

        public static List<CategoryViewModel> MapCategoryToCategoryViewModel(IQueryable<DataStructure.Models.Category> categories)
        {
            List<CategoryViewModel> categoryViewModels = new List<CategoryViewModel>();

            foreach (DataStructure.Models.Category category in categories)
            {
                categoryViewModels.Add(new CategoryViewModel()
                {
                    ID = category.ID,
                    Name = category.Name
                });
            }

            return categoryViewModels;
        }

        public static CategoryViewModel MapCategoryToCategoryViewModel(DataStructure.Models.Category category)
        {
            return new CategoryViewModel()
            {
                ID = category.ID,
                Name = category.Name
            };
        }
    }
}
