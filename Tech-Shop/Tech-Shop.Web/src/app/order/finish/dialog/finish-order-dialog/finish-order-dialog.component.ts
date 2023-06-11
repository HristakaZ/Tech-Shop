import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-finish-order-dialog',
  templateUrl: './finish-order-dialog.component.html',
  styleUrls: ['./finish-order-dialog.component.css']
})
export class FinishOrderDialogComponent implements OnInit {
  finishOrderForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscription!: Subscription;

  get id(): AbstractControl {
    return this.finishOrderForm.get('id')!;
  }

  constructor(private orderService: OrderService,
    private finishOrderSnackBar: MatSnackBar,
    private finishOrderDialogRef: MatDialogRef<FinishOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    debugger;
    console.log(this.data);
    this.finishOrderForm = new FormGroup({
      id: new FormControl('')
    });

    this.finishOrderForm.patchValue({
      id: this.data.orderID
    });
  }

  finishOrder(): void {
    debugger;
    if (!this.finishOrderForm.invalid) {
      this.subscription = this.orderService.$finish(this.finishOrderForm.value.id).subscribe({
        next: (response) => {
          this.finishOrderSnackBar.open('Successfully finished the order.', 'X', {
            duration: 3000
          });
          this.finishOrderDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.finishOrderSnackBar.open('An unexpected error occured while finishing the order.', 'X');
        }
      });
    }
    else {
      this.finishOrderSnackBar.open('There were validation errors while finishing the order.', 'X');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
