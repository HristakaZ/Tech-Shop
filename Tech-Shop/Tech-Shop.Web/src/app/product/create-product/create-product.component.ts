import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '../get-all-products/product.model';
import { CreateProductModel } from './create-product.model';
import { Category } from 'src/app/category/category.model';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  createProductForm!: FormGroup;
  subscriptions: Subscription[] = [];
  categories!: Category[];
  selectedFile?: File | null;
  url?: string | ArrayBuffer | null | undefined;

  get name(): AbstractControl {
    return this.createProductForm.get('name')!;
  }

  get quantity(): AbstractControl {
    return this.createProductForm.get('quantity')!;
  }

  get price(): AbstractControl {
    return this.createProductForm.get('price')!;
  }

  get categoryID(): AbstractControl {
    return this.createProductForm.get('categoryID')!;
  }

  get photo(): AbstractControl {
    return this.createProductForm.get('photo')!;
  }

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private createProductSnackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")
      ]),
      categoryID: new FormControl('', [
        Validators.required
      ]),
      photo: new FormControl('')
    });

    this.categoryService.$getAll().subscribe((categoryTotalCount) => {
      this.categories = categoryTotalCount.categories;
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  createProduct(): void {
    if (!this.selectedFile) {
      this.createProductForm.controls['photo'].setErrors(null);
    }

    if (!this.createProductForm.invalid) {
      let createProductModel: CreateProductModel = new CreateProductModel(
        this.createProductForm.value.name,
        this.createProductForm.value.quantity,
        this.createProductForm.value.price,
        this.createProductForm.value.categoryID,
        this.selectedFile);
      this.subscriptions.push(this.productService.$create(createProductModel).subscribe({
        next: (response) => {
          this.createProductSnackBar.open('The product was successfully created.', 'X', {
            duration: 3000
          });
          this.router.navigateByUrl('product/getall');
        },
        error: (errorResponse) => {
          this.createProductSnackBar.open('There was an unexpected error while creating the product!', 'X');
        }
      }));
    }
    else {
      this.createProductSnackBar.open('There were validation errors while creating the product!', 'X');
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    if (this.selectedFile) {
      if (this.isFileTypeValid(this.selectedFile.type)) {
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = (event) => {
          this.url = event.target?.result;
        };
        this.createProductForm.controls['photo'].setErrors(null);
      }
      else {
        this.createProductForm.controls['photo'].setErrors({ 'incorrect': true });
        this.url = null;
        this.selectedFile = null;
      }
    }
    else {
      this.createProductForm.controls['photo'].setErrors(null);
      this.url = null;
    }
  }

  isFileTypeValid(fileType: string): Boolean {
    let allowedFileTypes: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
    if (allowedFileTypes.find(allowedFileType => allowedFileType === fileType)) {
      return true;
    }

    return false;
  }
}
