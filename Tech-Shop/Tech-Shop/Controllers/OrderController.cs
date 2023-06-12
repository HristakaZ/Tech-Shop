using DataAccess.Contracts;
using DataStructure.Enums;
using DataStructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tech_Shop.Mappers.Order;
using Tech_Shop.Roles;
using Tech_Shop.ViewModels.Order;

namespace Tech_Shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IBaseRepository baseRepository;

        public OrderController(IBaseRepository baseRepository)
        {
            this.baseRepository = baseRepository;
        }

        [HttpGet]
        [Authorize(Roles = RoleConstants.AdminRole)]
        public IActionResult Get()
        {
            IQueryable<Order> orders = baseRepository.GetAll<Order>();
            if (orders.Count() == 0)
            {
                return NotFound("No orders were found.");
            }

            List<OrderViewModel> orderViewModels = OrderModelViewModelMapper.MapOrderModelToViewModel(orders,
                $"{Request.Scheme}://{Request.Host.Value}/");
            return Ok(orderViewModels);
        }

        [HttpGet("{id}", Name = $"{nameof(GetOrderByID)}")]
        [Authorize]
        public IActionResult GetOrderByID(int id)
        {
            Order order = baseRepository.GetByID<Order>(id);
            if (order == null)
            {
                return NotFound("Order was not found.");
            }

            OrderViewModel orderViewModel = OrderModelViewModelMapper.MapOrderModelToViewModel(order,
                $"{Request.Scheme}://{Request.Host.Value}/");
            return Ok(orderViewModel);
        }

        [HttpGet]
        [Authorize(Roles = RoleConstants.UserRole)]
        [Route($"{nameof(GetLoggedInUserOrders)}")]
        public IActionResult GetLoggedInUserOrders()
        {
            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            IQueryable<Order> orders = baseRepository.GetAll<Order>(x => x.User.ID == loggedInUserId);
            if (orders.Count() == 0)
            {
                return NotFound("No orders were found.");
            }

            List<OrderViewModel> orderViewModels = OrderModelViewModelMapper.MapOrderModelToViewModel(orders,
                $"{Request.Scheme}://{Request.Host.Value}/");
            return Ok(orderViewModels);
        }

        [HttpPost]
        [Authorize(Roles = RoleConstants.UserRole)]
        public IActionResult Post([FromBody] CreateOrderViewModel createOrderViewModel)
        {
            List<Product> productsForOrder = baseRepository.GetAll<Product>(
                x => createOrderViewModel.ProductIDs.Any(y => x.ID == y)).ToList();
            List<Product> productsOutOfStock = productsForOrder.Where(x => x.Quantity == 0).ToList();
            if (productsForOrder.Count == 0 || productsOutOfStock.Count > 0)
            {
                return NotFound("No products for ordering were found.");
            }
            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            User userForOrder = baseRepository.GetByID<User>(loggedInUserId);
            Order order = OrderModelViewModelMapper.MapCreateOrderViewModelToModel(createOrderViewModel, productsForOrder, userForOrder);

            int ID = baseRepository.Create<Order>(order);
            Uri uri = new Uri(Url.Link($"{nameof(GetOrderByID)}", new { Id = ID }));

            return Created(uri, ID.ToString());
        }

        [HttpPut]
        [Authorize(Roles = RoleConstants.AdminRole)]
        [Route($"{nameof(Approve)}")]
        public IActionResult Approve([FromBody] int id)
        {
            Order order = baseRepository.GetByID<Order>(id);

            if (order == null)
            {
                return NotFound("Order was not found.");
            }

            if (order.Status == OrderStatus.Initiated)
            {
                order.Status = OrderStatus.Approved;
                baseRepository.Update<Order>(order);
            }

            return Ok("Order was approved.");
        }

        [HttpPut]
        [Authorize(Roles = RoleConstants.AdminRole)]
        [Route($"{nameof(Finish)}")]
        public IActionResult Finish([FromBody] int id)
        {
            Order order = baseRepository.GetByID<Order>(id);

            if (order == null)
            {
                return NotFound("Order was not found.");
            }

            if (order.Status == OrderStatus.Approved)
            {
                foreach (Product productInOrder in order.Products)
                {
                    productInOrder.Quantity--;
                    baseRepository.Update<Product>(productInOrder);
                }
                order.Status = OrderStatus.Finished;
                baseRepository.Update<Order>(order);
            }

            return Ok("Order was finished.");
        }

        [HttpDelete]
        [Authorize(Roles = RoleConstants.UserRole)]
        [Route($"{nameof(Cancel)}")]
        public IActionResult Cancel([FromBody] int id)
        {
            Order orderToCancel = baseRepository.GetByID<Order>(id);

            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (orderToCancel == null ||
               (orderToCancel.User.ID != loggedInUserId))
            {
                return NotFound("Order was not found.");
            }

            if (orderToCancel.Status != OrderStatus.Finished)
            {
                baseRepository.Delete<Order>(orderToCancel);
            }

            return Ok("Order was cancelled.");
        }

        [HttpPut]
        [Authorize(Roles = RoleConstants.UserRole)]
        [Route($"{nameof(RequestReturn)}")]
        public IActionResult RequestReturn([FromBody] ReturnOrderViewModel returnOrderViewModel)
        {
            Order orderToReturn = baseRepository.GetByID<Order>(returnOrderViewModel.ID);

            if (orderToReturn == null)
            {
                return NotFound("Order was not found.");
            }

            if (orderToReturn.Status == OrderStatus.Finished)
            {
                orderToReturn.Address = returnOrderViewModel.Address;
                orderToReturn.Status = OrderStatus.Awaiting_Return;
                baseRepository.Update<Order>(orderToReturn);
            }

            return Ok("Order is awaiting return.");
        }

        [HttpPut]
        [Authorize(Roles = RoleConstants.AdminRole)]
        [Route($"{nameof(Return)}")]
        public IActionResult Return([FromBody] int id)
        {
            Order orderToReturn = baseRepository.GetByID<Order>(id);

            if (orderToReturn == null)
            {
                return NotFound("Order was not found.");
            }

            if (orderToReturn.Status == OrderStatus.Awaiting_Return)
            {
                foreach (Product productInOrder in orderToReturn.Products)
                {
                    productInOrder.Quantity++;
                    baseRepository.Update<Product>(productInOrder);
                }
                orderToReturn.Status = OrderStatus.Returned;
                baseRepository.Update<Order>(orderToReturn);
            }

            return Ok("Order is returned.");
        }
    }
}
