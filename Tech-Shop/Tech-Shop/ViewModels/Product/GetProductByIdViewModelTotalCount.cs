namespace Tech_Shop.ViewModels.Product
{
    public class GetProductByIdViewModelTotalCount
    {
        public ProductViewModel Product { get; set; }

        public int TotalCount { get; set; }

        public GetProductByIdViewModelTotalCount(ProductViewModel product, int totalCount)
        {
            this.Product = product;
            this.TotalCount = totalCount;
        }
    }
}
