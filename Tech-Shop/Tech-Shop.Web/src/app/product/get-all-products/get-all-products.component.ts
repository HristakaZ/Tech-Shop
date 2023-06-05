import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import jwt_decode from 'jwt-decode';
import apiConfig from '../../../apiconfig.json';

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.css']
})
export class GetAllProductsComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public columnsToDisplay = ['name', 'quantity', 'price', 'imagePath', 'category', 'updateButton', 'deleteButton'];
  subscription!: Subscription;
  userRole!: string;
  baseUrl = apiConfig.baseUrl;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.$getAll().subscribe((products) => {
      this.products = products;
      this.products.forEach((product) => {
        if(product.imagePath) {
          product.imagePath = this.baseUrl + '/' + product.imagePath;
        }
      });
      console.log(this.products);
    });
    this.setUserRole();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setUserRole(): void {
    if (localStorage.getItem('token')) {
      let decodedToken: any = jwt_decode(localStorage.getItem('token')!);
      this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    else {
      this.userRole = "";
    }
  }
}
