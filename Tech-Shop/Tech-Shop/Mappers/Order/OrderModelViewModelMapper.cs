using DataStructure.Enums;
using Tech_Shop.Helpers;
using Tech_Shop.Mappers.Product;
using Tech_Shop.ViewModels.Order;

namespace Tech_Shop.Mappers.Order
{
    public static class OrderModelViewModelMapper
    {
        public static List<OrderViewModel> MapOrderModelToViewModel(IQueryable<DataStructure.Models.Order> orders,
            string basePublicUrl)
        {
            List<OrderViewModel> orderViewModels = new List<OrderViewModel>();
            List<ProductPhotoViewModel> productPhotoViewModels = new List<ProductPhotoViewModel>();
            foreach (DataStructure.Models.Order order in orders)
            {
                foreach (DataStructure.Models.Product product in order.Products)
                {
                    productPhotoViewModels.Add(new ProductPhotoViewModel()
                    {
                        ProductName = product.Name,
                        Photo = !string.IsNullOrEmpty(product.ImagePath) ? ImageHelper.GetImageFromImagePath(product.ImagePath, basePublicUrl)
                                                                         : null
                    });
                }
                orderViewModels.Add(new OrderViewModel
                {
                    ID = order.ID,
                    Address = order.Address,
                    Status = order.Status.ToString(),
                    Products = productPhotoViewModels
                });
                productPhotoViewModels = new List<ProductPhotoViewModel>();
            }

            return orderViewModels;
        }

        public static OrderViewModel MapOrderModelToViewModel(DataStructure.Models.Order order,
            string basePublicUrl)
        {
            List<ProductPhotoViewModel> productPhotoViewModels = new List<ProductPhotoViewModel>();
            foreach (DataStructure.Models.Product product in order.Products)
            {
                productPhotoViewModels.Add(new ProductPhotoViewModel()
                {
                    ProductName = product.Name,
                    Photo = !string.IsNullOrEmpty(product.ImagePath) ? ImageHelper.GetImageFromImagePath(product.ImagePath, basePublicUrl)
                                                                     : null
                });
            }
            return new OrderViewModel()
            {
                ID = order.ID,
                Address = order.Address,
                Status = order.Status.ToString(),
                Products = productPhotoViewModels
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
