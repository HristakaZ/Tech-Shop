import { Subscription } from 'rxjs';
import { CreateReviewModel } from './../../create-review.model';
import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewService } from 'src/app/review/services/review.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-review-dialog',
  templateUrl: './create-review-dialog.component.html',
  styleUrls: ['./create-review-dialog.component.css']
})
export class CreateReviewDialogComponent implements OnInit, OnDestroy {
  createReviewForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscription!: Subscription;

  get rating(): AbstractControl {
    return this.createReviewForm.get('rating')!;
  }

  get comment(): AbstractControl {
    return this.createReviewForm.get('comment')!;
  }

  get productID(): AbstractControl {
    return this.createReviewForm.get('productID')!;
  }

  constructor(private reviewService: ReviewService,
     private createReviewSnackBar: MatSnackBar,
     private createReviewDialogRef: MatDialogRef<CreateReviewDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.createReviewForm = new FormGroup({
      rating: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern("[0-9]+")
      ]),
      comment: new FormControl(''),
      productID: new FormControl('')
    });

    this.createReviewForm.patchValue({
      productID: this.data.productID
    });
  }

  createReview(): void {
    if (!this.createReviewForm.invalid) {
      let createReviewModel: CreateReviewModel = new CreateReviewModel(
        this.createReviewForm.value.rating,
        this.createReviewForm.value.productID,
        this.createReviewForm.value.comment);
      this.subscription = this.reviewService.$create(createReviewModel).subscribe({
        next: (response) => {
          this.createReviewSnackBar.open('Successfully left a review.', 'X', {
            duration: 3000
          });
          this.createReviewDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.createReviewSnackBar.open('An unexpected error occured while creating the review.', 'X');
        }
      });
    }
    else {
      this.createReviewSnackBar.open('There were validation errors while creating the review.', 'X');
    }
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
