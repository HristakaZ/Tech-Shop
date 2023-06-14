namespace Tech_Shop.ViewModels.Category
{
    public class CategoryViewModelTotalCount
    {
        public List<CategoryViewModel> Categories { get; set; }

        public int TotalCount { get; set; }

        public CategoryViewModelTotalCount(List<CategoryViewModel> categories,
            int totalCount)
        {
            this.Categories = categories;
            this.TotalCount = totalCount;
        }
    }
}
