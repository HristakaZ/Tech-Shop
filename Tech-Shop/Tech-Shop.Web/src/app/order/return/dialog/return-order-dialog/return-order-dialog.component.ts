import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/order/get-all-orders/order.model';
import { OrderService } from 'src/app/order/services/order.service';
import { ReturnOrderModel } from './return-order.model';

@Component({
  selector: 'app-return-order-dialog',
  templateUrl: './return-order-dialog.component.html',
  styleUrls: ['./return-order-dialog.component.css']
})
export class ReturnOrderDialogComponent implements OnInit, OnDestroy {
  returnOrderForm!: FormGroup;
  isIdInputHidden: boolean = true;
  subscriptions: Subscription[] = [];
  order!: Order;

  get id(): AbstractControl {
    return this.returnOrderForm.get('id')!;
  }

  get address(): AbstractControl {
    return this.returnOrderForm.get('address')!;
  }

  constructor(private orderService: OrderService,
    private returnOrderSnackBar: MatSnackBar,
    private returnOrderDialogRef: MatDialogRef<ReturnOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.returnOrderForm = new FormGroup({
      id: new FormControl(''),
      address: new FormControl('', [
        Validators.required
      ])
    });

    this.returnOrderForm.patchValue({
      id: this.data.orderID
    });

    this.subscriptions.push(this.orderService.$getById(this.returnOrderForm.value.id).subscribe((order) => {
      this.order = order;
      this.returnOrderForm.patchValue({
        address: this.order.address
      });
    }));
  }

  returnOrder(): void {
    debugger;
    if (!this.returnOrderForm.invalid) {
      let returnOrderModel: ReturnOrderModel = new ReturnOrderModel(this.returnOrderForm.value.id,
        this.returnOrderForm.value.address);
      this.subscriptions.push(this.orderService.$requestReturn(returnOrderModel).subscribe({
        next: (response) => {
          this.returnOrderSnackBar.open('Successfully requested a return for the order.', 'X', {
            duration: 3000
          });
          this.returnOrderDialogRef.close(this.data);
        },
        error: (errorResponse) => {
          this.returnOrderSnackBar.open('An unexpected error occured while requesting a return for the order.', 'X');
        }
      }));
    }
    else {
      this.returnOrderSnackBar.open('There were validation errors while requesting a return for the order.', 'X');
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
