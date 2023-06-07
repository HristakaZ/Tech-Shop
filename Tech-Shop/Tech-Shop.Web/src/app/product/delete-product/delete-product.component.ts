import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../get-all-products/product.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit, OnDestroy {
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  public product: Product = new Product();
  deleteProductForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isIdInputHidden: boolean = true;

  constructor(private productService: ProductService,
    private router: Router,
    private deleteProductSnackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.deleteProductForm = new FormGroup({
      id: new FormControl('')
    });

    this.subscriptions.push(this.productService.$getById(this.id).subscribe((product) => {
      this.product = product;
      console.log(this.product);
      this.deleteProductForm.setValue({
        id: this.product.id
      });
    }));
  }

  deleteProduct(): void {
    this.subscriptions.push(this.productService.$delete(this.deleteProductForm.value.id).subscribe({
      next: (response) => {
        this.deleteProductSnackBar.open(response.toString(), 'X', {
          duration: 3000
        });
        this.router.navigateByUrl('product/getall');
      },
      error: (errorResponse) => {
        this.deleteProductSnackBar.open(errorResponse.error, 'X');
      }
    }));
  }

  ngOnDestroy(): void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
