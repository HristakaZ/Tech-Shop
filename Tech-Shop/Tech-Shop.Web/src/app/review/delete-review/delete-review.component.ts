import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteReviewDialogComponent } from './dialog/delete-review-dialog/delete-review-dialog.component';

@Component({
  selector: 'app-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent {
  @Input()
  id!: number;
  productID!: number;
  constructor(public deleteReviewDialog: MatDialog) { }

  openDeleteReviewDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.id
    };
    const dialogRef: MatDialogRef<DeleteReviewDialogComponent> = this.deleteReviewDialog.open(DeleteReviewDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
