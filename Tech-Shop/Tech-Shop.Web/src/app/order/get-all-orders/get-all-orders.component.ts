import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from './order.model';
import { OrderService } from '../services/order.service';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ApproveOrderDialogComponent } from '../approve/dialog/approve-order-dialog/approve-order-dialog.component';
import { FinishOrderDialogComponent } from '../finish/dialog/finish-order-dialog/finish-order-dialog.component';
import { ApproveReturnDialogComponent } from '../return/dialog/approve-return-dialog/approve-return-dialog.component';

@Component({
  selector: 'app-get-all-orders',
  templateUrl: './get-all-orders.component.html',
  styleUrls: ['./get-all-orders.component.css']
})
export class GetAllOrdersComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];
  public columnsToDisplay = ['address', 'status', 'products', 'user', 'actions'];
  subscriptions: Subscription[] = [];
  constructor(private orderService: OrderService,
    public approveOrderDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.subscriptions.push(this.orderService.subject.subscribe(() => {
      this.getAllProducts();
    }));
  }

  getAllProducts(): void {
    this.subscriptions.push(this.orderService.$getAll().subscribe((orders) => {
      this.orders = orders;
      console.log(this.orders);
    }));
  }

  openApproveOrderDialog(orderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderID: orderID
    };
    const dialogRef: MatDialogRef<ApproveOrderDialogComponent> = this.approveOrderDialog.open(ApproveOrderDialogComponent, dialogConfig);
  }

  openFinishOrderDialog(orderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderID: orderID
    };
    const dialogRef: MatDialogRef<FinishOrderDialogComponent> = this.approveOrderDialog.open(FinishOrderDialogComponent, dialogConfig);
  }

  openApproveReturnOfOrderDialog(orderID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderID: orderID
    };
    const dialogRef: MatDialogRef<ApproveReturnDialogComponent> = this.approveOrderDialog.open(ApproveReturnDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
