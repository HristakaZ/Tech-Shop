import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../get-all-categories/category.model';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  updateCategoryForm!: FormGroup;
  subscriptions: Subscription[] = [];
  public category!: Category;
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  isIdInputHidden: boolean = true;

  get name(): AbstractControl {
    return this.updateCategoryForm.get('name')!;
  }

  constructor(private categoryService: CategoryService,
    private updateCategorySnackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

    this.updateCategoryForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required
      ])
    });

    this.subscriptions.push(this.categoryService.$getById(this.id).subscribe((category) => {
      this.category = category;
      this.updateCategoryForm.setValue({
        id: this.id,
        name: this.category.name
      });
    }));
  }

  updateCategory(): void {
    if (!this.updateCategoryForm.invalid) {
      this.category.name = this.updateCategoryForm.value.name;

      this.subscriptions.push(this.categoryService.$update(this.updateCategoryForm.value.id, this.category).subscribe({
        next: (response) => {
          this.updateCategorySnackBar.open(response.toString(), 'X', {
            duration: 3000
          })
          this.router.navigateByUrl('category/getall');
        },
        error: (errorResponse) => {
          this.updateCategorySnackBar.open(errorResponse, 'X');
        }
      }));
    }
    else {
      this.updateCategorySnackBar.open('There were validation errors while updating the category.', 'X');
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
