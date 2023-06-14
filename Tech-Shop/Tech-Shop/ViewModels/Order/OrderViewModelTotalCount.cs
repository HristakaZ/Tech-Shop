namespace Tech_Shop.ViewModels.Order
{
    public class OrderViewModelTotalCount
    {
        public List<OrderViewModel> Orders { get; set; }

        public int TotalCount { get; set; }

        public OrderViewModelTotalCount(List<OrderViewModel> orders,
            int totalCount)
        {
            this.Orders = orders;
            this.TotalCount = totalCount;
        }
    }
}
