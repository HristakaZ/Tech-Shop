using DataStructure.Enums;
using Tech_Shop.Mappers.Product;
using Tech_Shop.ViewModels.Order;

namespace Tech_Shop.Mappers.Order
{
    public static class OrderModelViewModelMapper
    {
        public static List<OrderViewModel> MapOrderModelToViewModel(IQueryable<DataStructure.Models.Order> orders)
        {
            List<OrderViewModel> orderViewModels = new List<OrderViewModel>();

            foreach (DataStructure.Models.Order order in orders)
            {
                orderViewModels.Add(new OrderViewModel
                {
                    ID = order.ID,
                    Address = order.Address,
                    Status = order.Status,
                    Products = ProductModelViewModelMapper.MapProductToProductViewModel(order.Products.AsQueryable())
                });
            }

            return orderViewModels;
        }

        public static OrderViewModel MapOrderModelToViewModel(DataStructure.Models.Order order)
        {
            return new OrderViewModel()
            {
                ID = order.ID,
                Address = order.Address,
                Status = order.Status,
                Products = ProductModelViewModelMapper.MapProductToProductViewModel(order.Products.AsQueryable())
            };
        }

        public static DataStructure.Models.Order MapCreateOrderViewModelToModel(CreateOrderViewModel createOrderViewModel,
            List<DataStructure.Models.Product> productsForOrder,
            DataStructure.Models.User userForOrder)
        {
            return new DataStructure.Models.Order()
            {
                Address = createOrderViewModel.Address,
                Products = productsForOrder,
                Status = OrderStatus.Initiated,
                User = userForOrder
            };
        }
    }
}
