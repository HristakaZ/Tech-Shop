import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  public category: Category = new Category();
  deleteCategoryForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isIdInputHidden: boolean = true;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private deleteCategorySnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.deleteCategoryForm = new FormGroup({
      id: new FormControl('')
    });

    this.subscriptions.push(this.categoryService.$getById(this.id).subscribe((category) => {
      this.category = category;
      this.deleteCategoryForm.setValue({
        id: this.category.id
      });
    }));
  }

  deleteCategory(): void {
    debugger;
    this.subscriptions.push(this.categoryService.$delete(this.deleteCategoryForm.value.id).subscribe({
      next: (response) => {
        this.deleteCategorySnackBar.open(response.toString(), 'X', {
          duration: 3000
        });
        this.router.navigateByUrl('category/getall');
      },
      error: (errorResponse) => {
        this.deleteCategorySnackBar.open(errorResponse.error, 'X');
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
