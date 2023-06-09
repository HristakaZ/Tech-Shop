﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Tech_Shop.ViewModels.Product
{
    public class CreateProductViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Precision(18, 2)]
        [RegularExpression("^[0-9]+(.[0-9]{0,2})?$", ErrorMessage = "The price must be a number/decimal number with , or . as separators.")]
        [Required]
        public decimal Price { get; set; }

        public IFormFile? Photo { get; set; }

        [Required]
        public int CategoryID { get; set; }
    }
}
