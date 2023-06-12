using DataStructure.Enums;
using Tech_Shop.Helpers;
using Tech_Shop.Mappers.Product;
using Tech_Shop.ViewModels.Order;
using Tech_Shop.ViewModels.User;

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
                        Photo = ImageHelper.GetImageFromImagePath(product.ImagePath, basePublicUrl),
                        ImagePath = product.ImagePath
                    });
                }
                orderViewModels.Add(new OrderViewModel
                {
                    ID = order.ID,
                    Address = order.Address,
                    Status = order.Status.ToString().Replace('_', ' '),
                    Products = productPhotoViewModels,
                    User = new UserViewModel()
                    {
                        Email = order.User.Email,
                        Name = order.User.Name,
                        PhoneNumber = order.User.PhoneNumber
                    }
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
                    Photo = ImageHelper.GetImageFromImagePath(product.ImagePath, basePublicUrl),
                    ImagePath = product.ImagePath
                });
            }
            return new OrderViewModel()
            {
                ID = order.ID,
                Address = order.Address,
                Status = order.Status.ToString().Replace('_', ' '),
                Products = productPhotoViewModels,
                User = new UserViewModel()
                {
                    Email = order.User.Email,
                    Name = order.User.Name,
                    PhoneNumber = order.User.PhoneNumber
                }
            };
        }

        public static DataStructure.Models.Order MapPlaceOrderViewModelToModel(PlaceOrderViewModel placeOrderViewModel,
            List<DataStructure.Models.Product> productsForOrder,
            DataStructure.Models.User userForOrder)
        {
            return new DataStructure.Models.Order()
            {
                Address = placeOrderViewModel.Address,
                Products = productsForOrder,
                Status = OrderStatus.Initiated,
                User = userForOrder
            };
        }
    }
}
