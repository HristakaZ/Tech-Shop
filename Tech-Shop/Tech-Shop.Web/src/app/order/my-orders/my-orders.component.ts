import { Component, OnInit } from '@angular/core';
import { Order } from '../get-all-orders/order.model';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CancelOrderDialogComponent } from '../cancel/dialog/cancel-order-dialog/cancel-order-dialog.component';
import { ReturnOrderDialogComponent } from '../return/dialog/return-order-dialog/return-order-dialog.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  public orders: Order[] = [];
  public columnsToDisplay = ['address', 'status', 'products', 'user', 'actions'];
  subscriptions: Subscription[] = [];
  constructor(private orderService: OrderService,
    public approveOrderDialog: MatDialog) { }

  ngOnInit(): void {
    this.getLoggedInUserOrders();
    this.subscriptions.push(this.orderService.subject.subscribe(() => {
      this.getLoggedInUserOrders();
    }));
  }

  getLoggedInUserOrders(): void {
    this.subscriptions.push(this.orderService.$getLoggedInUserOrders().subscribe((orders) => {
      this.orders = orders;
      console.log(this.orders);
    }));
  }

  openCancelOrderDialog(orderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderID: orderID
    };
    const dialogRef: MatDialogRef<CancelOrderDialogComponent> = this.approveOrderDialog.open(CancelOrderDialogComponent, dialogConfig);
  }

  openReturnOrderDialog(orderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderID: orderID
    };
    const dialogRef: MatDialogRef<ReturnOrderDialogComponent> = this.approveOrderDialog.open(ReturnOrderDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
