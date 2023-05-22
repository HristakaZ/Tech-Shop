using Tech_Shop.ViewModels.Category;

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
    }
}
