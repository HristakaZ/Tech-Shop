import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from './dialog/delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  @Input()
  id!: number;
  productID!: number;
  constructor(public deleteCategoryDialog: MatDialog) { }

  openDeleteCategoryDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.id
    };
    const dialogRef: MatDialogRef<DeleteCategoryDialogComponent> = this.deleteCategoryDialog.open(DeleteCategoryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
