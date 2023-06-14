namespace Tech_Shop.ViewModels.Product
{
    public class ProductViewModelTotalCount
    {
        public List<ProductViewModel> Products { get; set; }

        public int TotalCount { get; set; }

        public ProductViewModelTotalCount(List<ProductViewModel> products,
            int totalCount)
        {
            this.Products = products;
            this.TotalCount = totalCount;
        }
    }
}
