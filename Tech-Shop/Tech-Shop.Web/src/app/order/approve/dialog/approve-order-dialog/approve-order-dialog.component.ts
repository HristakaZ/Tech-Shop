import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-approve-order-dialog',
  templateUrl: './approve-order-dialog.component.html',
  styleUrls: ['./approve-order-dialog.component.css']
})
export class ApproveOrderDialogComponent implements OnInit, OnDestroy {
  approveOrderForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscription!: Subscription;

  get id(): AbstractControl {
    return this.approveOrderForm.get('id')!;
  }

  constructor(private orderService: OrderService,
    private approveOrderSnackBar: MatSnackBar,
    private approveOrderDialogRef: MatDialogRef<ApproveOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    debugger;
    console.log(this.data);
    this.approveOrderForm = new FormGroup({
      id: new FormControl('')
    });

    this.approveOrderForm.patchValue({
      id: this.data.orderID
    });
  }

  approveOrder(): void {
    debugger;
    if (!this.approveOrderForm.invalid) {
      this.subscription = this.orderService.$approve(this.approveOrderForm.value.id).subscribe({
        next: (response) => {
          this.approveOrderSnackBar.open('Successfully approved the order.', 'X', {
            duration: 3000
          });
          this.approveOrderDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.approveOrderSnackBar.open('An unexpected error occured while approving the order.', 'X');
        }
      });
    }
    else {
      this.approveOrderSnackBar.open('There were validation errors while approving the order.', 'X');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
