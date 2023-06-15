import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/category/category.model';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.css']
})
export class DeleteCategoryDialogComponent implements OnInit {
  public category: Category = new Category();
  deleteCategoryForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isIdInputHidden: boolean = true;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private deleteCategorySnackBar: MatSnackBar,
    private deleteCategoryDialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.deleteCategoryForm = new FormGroup({
      id: new FormControl('')
    });

    this.deleteCategoryForm.setValue({
      id: this.data.id
    });

    this.subscriptions.push(this.categoryService.$getById(this.data.id).subscribe((category) => {
      this.category = category;
    }));
  }

  deleteCategory(): void {
    this.subscriptions.push(this.categoryService.$delete(this.deleteCategoryForm.value.id).subscribe({
      next: (response) => {
        this.deleteCategorySnackBar.open(response.toString(), 'X', {
          duration: 3000
        });
        this.deleteCategoryDialogRef.close(this.data);
      },
      error: (errorResponse) => {
        this.deleteCategorySnackBar.open(errorResponse.error, 'X');
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
