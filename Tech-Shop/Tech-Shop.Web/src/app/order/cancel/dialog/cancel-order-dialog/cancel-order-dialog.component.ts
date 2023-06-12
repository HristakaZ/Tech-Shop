import { Subscription } from 'rxjs';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/order/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-order-dialog',
  templateUrl: './cancel-order-dialog.component.html',
  styleUrls: ['./cancel-order-dialog.component.css']
})
export class CancelOrderDialogComponent implements OnInit, OnDestroy {
  cancelOrderForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscription!: Subscription;

  get id(): AbstractControl {
    return this.cancelOrderForm.get('id')!;
  }

  constructor(private orderService: OrderService,
    private cancelOrderSnackBar: MatSnackBar,
    private cancelOrderDialogRef: MatDialogRef<CancelOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    debugger;
    console.log(this.data);
    this.cancelOrderForm = new FormGroup({
      id: new FormControl('')
    });

    this.cancelOrderForm.patchValue({
      id: this.data.orderID
    });
  }

  cancelOrder(): void {
    debugger;
    if (!this.cancelOrderForm.invalid) {
      this.subscription = this.orderService.$cancel(this.cancelOrderForm.value.id).subscribe({
        next: (response) => {
          this.cancelOrderSnackBar.open('Successfully cancelled the order.', 'X', {
            duration: 3000
          });
          this.cancelOrderDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.cancelOrderSnackBar.open('An unexpected error occured while cancelling the order.', 'X');
        }
      });
    }
    else {
      this.cancelOrderSnackBar.open('There were validation errors while cancelling the order.', 'X');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
