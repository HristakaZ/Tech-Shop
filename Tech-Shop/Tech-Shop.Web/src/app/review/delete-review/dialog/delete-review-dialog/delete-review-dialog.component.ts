import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/review/review.model';
import { ReviewService } from 'src/app/review/services/review.service';

@Component({
  selector: 'app-delete-review-dialog',
  templateUrl: './delete-review-dialog.component.html',
  styleUrls: ['./delete-review-dialog.component.css']
})
export class DeleteReviewDialogComponent implements OnInit, OnDestroy {
  deleteReviewForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscriptions: Subscription[] = [];
  review: Review = new Review();

  get id(): AbstractControl {
    return this.deleteReviewForm.get('id')!;
  }

  constructor(private reviewService: ReviewService,
    private deleteReviewSnackBar: MatSnackBar,
    private deleteReviewDialogRef: MatDialogRef<DeleteReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.deleteReviewForm = new FormGroup({
      id: new FormControl('')
    });
    
    this.deleteReviewForm.patchValue({
      id: this.data.id
    });

    this.subscriptions.push(this.reviewService.$getById(this.deleteReviewForm.value.id).subscribe((review) => {
      this.review = review;
    }));
  }

  deleteReview(): void {
    if (!this.deleteReviewForm.invalid) {
      this.subscriptions.push(this.reviewService.$delete(this.deleteReviewForm.value.id).subscribe({
        next: (response) => {
          this.deleteReviewSnackBar.open('Successfully deleted the review.', 'X', {
            duration: 3000
          });
          this.deleteReviewDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.deleteReviewSnackBar.open('An unexpected error occured while deleting the review.', 'X');
        }
      }));
    }
    else {
      this.deleteReviewSnackBar.open('There were validation errors while deleting the review.', 'X');
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
