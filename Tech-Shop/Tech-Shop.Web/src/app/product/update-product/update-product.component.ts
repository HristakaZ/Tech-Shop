import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../get-all-products/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UpdateProductModel } from './update-product.model';
import { Category } from 'src/app/category/category.model';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  updateProductForm!: FormGroup;
  subscriptions: Subscription[] = [];
  public product!: Product;
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  isIdInputHidden: boolean = true;
  selectedFile?: File | null;
  categories!: Category[];
  url?: string | ArrayBuffer | null | undefined;

  get name(): AbstractControl {
    return this.updateProductForm.get('name')!;
  }

  get quantity(): AbstractControl {
    return this.updateProductForm.get('quantity')!;
  }

  get price(): AbstractControl {
    return this.updateProductForm.get('price')!;
  }

  get categoryID(): AbstractControl {
    return this.updateProductForm.get('categoryID')!;
  }

  get photo(): AbstractControl {
    return this.updateProductForm.get('photo')!;
  }

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private updateProductSnackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.updateProductForm = new FormGroup({
      id: new FormControl(''),
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

    this.subscriptions.push(this.productService.$getById(this.id).subscribe((product) => {
      this.product = product;
      this.updateProductForm.patchValue({
        id: this.id,
        name: this.product.name,
        quantity: this.product.quantity,
        price: this.product.price,
        categoryID: this.product.category.id
      });
      this.url = this.product.photo?.name;
      if (this.product.photo) {
        this.product.photo = new File([this.product.photo as BlobPart], this.product.imagePath);
      }
    }));

    this.categoryService.$getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updateProduct(): void {
    if (!this.selectedFile) {
      this.selectedFile = this.product.photo;
      this.updateProductForm.controls['photo'].setErrors(null);
    }

    if (!this.updateProductForm.invalid) {
      let updateProductModel: UpdateProductModel = new UpdateProductModel(
        this.updateProductForm.value.name,
        this.updateProductForm.value.quantity,
        this.updateProductForm.value.price,
        this.updateProductForm.value.categoryID,
        this.selectedFile
      );

      this.subscriptions.push(this.productService.$update(this.updateProductForm.value.id, updateProductModel).subscribe({
        next: (response) => {
          this.updateProductSnackBar.open(response.toString(), 'X', {
            duration: 3000
          })
          this.router.navigateByUrl('product/getall');
        },
        error: (errorResponse) => {
          this.updateProductSnackBar.open(errorResponse, 'X');
        }
      }));
    }
    else {
      this.updateProductSnackBar.open('There were validation errors while updating the product.', 'X');
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
        this.updateProductForm.controls['photo'].setErrors(null);
      }
      else {
        this.updateProductForm.controls['photo'].setErrors({ 'incorrect': true });
        this.url = null;
        this.selectedFile = null;
      }
    }
    else {
      this.updateProductForm.controls['photo'].setErrors(null);
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

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
