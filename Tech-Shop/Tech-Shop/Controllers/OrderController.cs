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
        [Authorize(Roles = RoleConstants.AdminRole)]
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
            List<Product> productsForOrder = baseRepository.GetAll<Product>(x => createOrderViewModel.ProductIDs.Any(y => x.ID == y)).ToList();
            if (productsForOrder.Count == 0)
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

        [HttpPost]
        [Authorize(Roles = RoleConstants.AdminRole)]
        [Route($"{nameof(Approve)}")]
        public IActionResult Approve(int id)
        {
            Order order = baseRepository.GetByID<Order>(id);

            if (order == null)
            {
                return NotFound("Order was not found.");
            }

            order.Status = OrderStatus.Approved;
            baseRepository.Update<Order>(order);
            return Ok("Order was approved.");
        }

        [HttpPost]
        [Authorize(Roles = RoleConstants.AdminRole)]
        [Route($"{nameof(Finish)}")]
        public IActionResult Finish(int id)
        {
            Order order = baseRepository.GetByID<Order>(id);

            if (order == null)
            {
                return NotFound("Order was not found.");
            }

            foreach (Product productInOrder in order.Products)
            {
                productInOrder.Quantity--;
                baseRepository.Update<Product>(productInOrder);
            }

            order.Status = OrderStatus.Finished;
            baseRepository.Update<Order>(order);
            return Ok("Order was finished.");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleConstants.UserRole)]
        public IActionResult Cancel(int id)
        {
            Order orderToCancel = baseRepository.GetByID<Order>(id);

            int loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (orderToCancel == null ||
               (orderToCancel.User.ID != loggedInUserId))
            {
                return NotFound("Order was not found.");
            }

            if (orderToCancel.Status == OrderStatus.Finished)
            {
                foreach (Product productInOrder in orderToCancel.Products)
                {
                    productInOrder.Quantity++;
                    baseRepository.Update<Product>(productInOrder);
                }
            }

            baseRepository.Delete<Order>(orderToCancel);
            return Ok("Order was cancelled.");
        }
    }
}
