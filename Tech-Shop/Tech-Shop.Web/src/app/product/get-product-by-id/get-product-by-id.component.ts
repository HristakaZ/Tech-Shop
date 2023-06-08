import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../get-all-products/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ReviewService } from 'src/app/review/services/review.service';

@Component({
  selector: 'app-get-product-by-id',
  templateUrl: './get-product-by-id.component.html',
  styleUrls: ['./get-product-by-id.component.css']
})
export class GetProductByIdComponent implements OnInit, OnDestroy {
  product: Product = new Product();
  subscriptions: Subscription[] = [];
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  isIdInputHidden: boolean = true;
  userRole!: string;
  userId!: number;
  public columnsToDisplay = ['user', 'rating', 'comment', 'updateButton', 'deleteButton'];
  constructor(private productService: ProductService,
     private router: Router,
     private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getProductById();
    this.setUserRole();
    this.setUserId();
    this.subscriptions.push(this.reviewService.subject.subscribe(() => {
      this.getProductById();
    }));
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

  setUserId(): void {
    if(localStorage.getItem('token')) {
      let decodedToken: any = jwt_decode(localStorage.getItem('token')!);
      this.userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    }
    else {
      this.userId = 0;
    }
  }

  getProductById(): void {
    this.subscriptions.push(this.productService.$getById(this.id).subscribe((product) => {
      this.product = product;
    }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
