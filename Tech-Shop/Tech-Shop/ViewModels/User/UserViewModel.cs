﻿using DataStructure.Models;
using Tech_Shop.ViewModels.Order;
using Tech_Shop.ViewModels.Review;

namespace Tech_Shop.ViewModels.User
{
    public class UserViewModel : BaseEntity
    {
        public string Email { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Role { get; set; }
    }
}
