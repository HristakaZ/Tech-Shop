import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ReviewService } from 'src/app/review/services/review.service';
import { UpdateReviewModel } from '../../update-review.model';
import { Review } from 'src/app/review/review.model';

@Component({
  selector: 'app-update-review-dialog',
  templateUrl: './update-review-dialog.component.html',
  styleUrls: ['./update-review-dialog.component.css']
})
export class UpdateReviewDialogComponent implements OnInit, OnDestroy {
  updateReviewForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscriptions: Subscription[] = [];
  review: Review = new Review();

  get id(): AbstractControl {
    return this.updateReviewForm.get('id')!;
  }

  get rating(): AbstractControl {
    return this.updateReviewForm.get('rating')!;
  }

  get comment(): AbstractControl {
    return this.updateReviewForm.get('comment')!;
  }

  get productID(): AbstractControl {
    return this.updateReviewForm.get('productID')!;
  }

  constructor(private reviewService: ReviewService,
    private updateReviewSnackBar: MatSnackBar,
    private updateReviewDialogRef: MatDialogRef<UpdateReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.updateReviewForm = new FormGroup({
      id: new FormControl(''),
      rating: new FormControl('', [
        Validators.required
      ]),
      comment: new FormControl(''),
      productID: new FormControl('')
    });

    this.updateReviewForm.patchValue({
      id: this.data.id,
      productID: this.data.productID
    });

    this.subscriptions.push(this.reviewService.$getById(this.updateReviewForm.value.id).subscribe((review) => {
      this.review = review;
      this.updateReviewForm.patchValue({
        rating: review.rating,
        comment: review.comment
      });
    }));
  }

  updateReview(): void {
    if (!this.updateReviewForm.invalid) {
      let updateReviewModel: UpdateReviewModel = new UpdateReviewModel(
        this.updateReviewForm.value.rating,
        this.updateReviewForm.value.productID,
        this.updateReviewForm.value.comment);
      this.subscriptions.push(this.reviewService.$update(this.updateReviewForm.value.id, updateReviewModel).subscribe({
        next: (response) => {
          this.updateReviewSnackBar.open('Successfully updated the review.', 'X', {
            duration: 3000
          });
          this.updateReviewDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.updateReviewSnackBar.open('An unexpected error occured while updating the review.', 'X');
        }
      }));
    }
    else {
      this.updateReviewSnackBar.open('There were validation errors while updating the review.', 'X');
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
