import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../get-all-products/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Review } from 'src/app/review/review.model';
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
  public columnsToDisplay = ['user', 'rating', 'comment', 'createButton', 'updateButton', 'deleteButton'];
  constructor(private productService: ProductService,
     private router: Router) { }

  ngOnInit(): void {
    debugger;
    this.subscriptions.push(this.productService.$getById(this.id).subscribe((product) => {
      this.product = product;
    }));
    console.log(this.product);
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

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
