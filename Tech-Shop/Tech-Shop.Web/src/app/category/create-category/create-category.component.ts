import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  createCategoryForm!: FormGroup;
  subscription!: Subscription;

  get name(): AbstractControl {
    return this.createCategoryForm.get('name')!;
  }

  constructor(private categoryService: CategoryService, private createCategorySnackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.createCategoryForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createCategory(): void {
    if (!this.createCategoryForm.invalid) {
      let category: Category = new Category();
      category.name = this.createCategoryForm.value.name;
      this.subscription = this.categoryService.$create(category).subscribe({
        next: (response) => {
          this.createCategorySnackBar.open('The category was successfully created.', 'X', {
            duration: 3000
          });
          this.router.navigateByUrl('category/getall');
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.createCategorySnackBar.open('There was an unexpected error while creating the category!', 'X');
        }
      });
    }
    else {
      this.createCategorySnackBar.open('There were validation errors while creating the category!', 'X');
    }
  }

}
