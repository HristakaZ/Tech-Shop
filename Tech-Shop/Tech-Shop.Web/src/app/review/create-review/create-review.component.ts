import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreateReviewDialogComponent } from './dialog/create-review-dialog/create-review-dialog.component';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent {
  @Input()
  productID!: number;
  constructor(public createReviewDialog: MatDialog) { }

  openCreateReviewDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      productID: this.productID
    };
    const dialogRef: MatDialogRef<CreateReviewDialogComponent> = this.createReviewDialog.open(CreateReviewDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
