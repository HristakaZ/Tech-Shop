import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/product/get-all-products/product.model';
import { ProductService } from 'src/app/product/services/product.service';
import { PlaceOrderModel } from './place-order.model';
import { UserService } from 'src/app/user/services/user.service';
import { User } from 'src/app/user/get-all-users/user.model';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  subscriptions: Subscription[] = [];
  products: Product[] = [];
  user: User = new User();
  isIdInputHidden: Boolean = true;
  public columnsToDisplay = ['name', 'quantity', 'price', 'imagePath', 'category', 'removeFromCartButton'];

  get address(): AbstractControl {
    return this.firstFormGroup.get('address')!;
  }

  get productIDs(): AbstractControl {
    return this.secondFormGroup.get('productIDs')!;
  }

  constructor(private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
    private placeOrderSnackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      address: new FormControl('', [
        Validators.required
      ])
    });
    this.secondFormGroup = new FormGroup({
      productIDs: new FormControl('', [
        Validators.required
      ])
    });

    this.loadProductsAndAddress();
  }

  loadProductsAndAddress(): void {
    let productIDs: number[] = JSON.parse(localStorage.getItem('productIDs')!);
    this.secondFormGroup.patchValue({
      productIDs: productIDs
    });
    if (productIDs && productIDs.length > 0) {
      this.subscriptions.push(this.productService.$getByIds(this.secondFormGroup.value.productIDs).subscribe((products) => {
        this.products = products;
        this.secondFormGroup.controls['productIDs'].setErrors(null);
        console.log(this.products);
      }));
    }
    if (!this.productIDs) {
      this.secondFormGroup.controls['productIDs'].setErrors({ 'incorrect': true });
    }
    let decodedToken: any = jwt_decode(localStorage.getItem('token')!);
    let userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    this.subscriptions.push(this.userService.$getById(userId).subscribe((user) => {
      this.firstFormGroup.patchValue({
        address: user.address
      });
    }));
  }

  placeOrder(): void {
    if (this.secondFormGroup.invalid) {
      this.placeOrderSnackBar.open('Cannot place an order without products!', 'X');
    }

    if (!this.firstFormGroup.invalid) {
      let placeOrderModel: PlaceOrderModel = new PlaceOrderModel(this.firstFormGroup.value.address,
        this.secondFormGroup.value.productIDs);
      this.subscriptions.push(this.orderService.$place(placeOrderModel).subscribe({
        next: (response) => {
          this.placeOrderSnackBar.open('The order was successfully placed. In the meantime, you can check its status in the "My Orders" tab.', 'X', {
            duration: 10000
          });
          localStorage.removeItem('productIDs');
          this.router.navigateByUrl('order/myorders');
        },
        error: (errorResponse) => {
          this.placeOrderSnackBar.open('There was an unexpected error while placing the order!', 'X');
        }
      }));
    }
    else {
      this.placeOrderSnackBar.open('There were validation errors while placing the order!', 'X');
    }
  }

  removeFromCart(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
    let productIDs: number[] = JSON.parse(localStorage.getItem('productIDs')!);
    if (productIDs) {
      localStorage.setItem('productIDs', JSON.stringify(this.products.map(product => product.id)));
    }
    this.loadProductsAndAddress();
    this.placeOrderSnackBar.open('Successfully removed product from cart!', 'X', {
      duration: 3000
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
