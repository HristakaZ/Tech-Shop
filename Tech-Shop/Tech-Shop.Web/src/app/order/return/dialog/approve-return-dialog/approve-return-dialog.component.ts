import { Subscription } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/app/order/get-all-orders/order.model';
import { OrderService } from 'src/app/order/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-approve-return-dialog',
  templateUrl: './approve-return-dialog.component.html',
  styleUrls: ['./approve-return-dialog.component.css']
})
export class ApproveReturnDialogComponent implements OnInit, OnDestroy {
  approveReturnOfOrderForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscriptions: Subscription[] = [];
  order!: Order;

  get id(): AbstractControl {
    return this.approveReturnOfOrderForm.get('id')!;
  }

  constructor(private orderService: OrderService,
    private approveReturnOfOrderSnackBar: MatSnackBar,
    private approveReturnOfOrderDialogRef: MatDialogRef<ApproveReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.approveReturnOfOrderForm = new FormGroup({
      id: new FormControl('')
    });

    this.approveReturnOfOrderForm.patchValue({
      id: this.data.orderID
    });

    this.subscriptions.push(this.orderService.$getById(this.approveReturnOfOrderForm.value.id).subscribe((order) => {
      this.order = order;
    }));
  }

  approveReturnOfOrder(): void {
    debugger;
    if (!this.approveReturnOfOrderForm.invalid) {
      this.subscriptions.push(this.orderService.$return(this.order.id).subscribe({
        next: (response) => {
          this.approveReturnOfOrderSnackBar.open('Successfully approved the return of the order.', 'X', {
            duration: 3000
          });
          this.approveReturnOfOrderDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.approveReturnOfOrderSnackBar.open('An unexpected error occured while approving the return of the order.', 'X');
        }
      }));
    }
    else {
      this.approveReturnOfOrderSnackBar.open('There were validation errors while approving the request of the order.', 'X');
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
