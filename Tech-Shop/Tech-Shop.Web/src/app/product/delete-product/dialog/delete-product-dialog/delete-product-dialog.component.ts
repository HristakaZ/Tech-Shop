import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/product/get-all-products/product.model';
import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent implements OnInit {
  public product: Product = new Product();
  deleteProductForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isIdInputHidden: boolean = true;

  constructor(private productService: ProductService,
    private router: Router,
    private deleteProductSnackBar: MatSnackBar,
    private deleteProductDialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.deleteProductForm = new FormGroup({
      id: new FormControl('')
    });

    this.deleteProductForm.setValue({
      id: this.data.id
    });

    this.subscriptions.push(this.productService.$getById(this.data.id).subscribe((productByIdTotalCount) => {
      this.product = productByIdTotalCount.product;
    }));
  }

  deleteProduct(): void {
    this.subscriptions.push(this.productService.$delete(this.deleteProductForm.value.id).subscribe({
      next: (response) => {
        this.deleteProductSnackBar.open(response.toString(), 'X', {
          duration: 3000
        });
        this.deleteProductDialogRef.close(this.data);
      },
      error: (errorResponse) => {
        this.deleteProductSnackBar.open(errorResponse.error, 'X');
      }
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
