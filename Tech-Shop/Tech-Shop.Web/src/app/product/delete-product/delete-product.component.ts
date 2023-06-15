import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../get-all-products/product.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteProductDialogComponent } from './dialog/delete-product-dialog/delete-product-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  @Input()
  id!: number;
  productID!: number;
  constructor(public deleteProductDialog: MatDialog) { }

  openDeleteProductDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.id
    };
    const dialogRef: MatDialogRef<DeleteProductDialogComponent> = this.deleteProductDialog.open(DeleteProductDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
