﻿using DataStructure.Enums;
using DataStructure.Models;
using Tech_Shop.ViewModels.Product;

namespace Tech_Shop.ViewModels.Order
{
    public class OrderViewModel : BaseEntity
    {
        public string Address { get; set; }

        public OrderStatus Status { get; set; }

        public virtual List<ProductViewModel> Products { get; set; } = new List<ProductViewModel>();
    }
}