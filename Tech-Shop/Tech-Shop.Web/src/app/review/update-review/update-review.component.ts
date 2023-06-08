import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UpdateReviewDialogComponent } from './dialog/update-review-dialog/update-review-dialog.component';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent {
  @Input()
  id!: number;
  @Input()
  productID!: number;
  constructor(public updateReviewDialog: MatDialog) { }

  openUpdateReviewDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.id,
      productID: this.productID
    };
    const dialogRef: MatDialogRef<UpdateReviewDialogComponent> = this.updateReviewDialog.open(UpdateReviewDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
