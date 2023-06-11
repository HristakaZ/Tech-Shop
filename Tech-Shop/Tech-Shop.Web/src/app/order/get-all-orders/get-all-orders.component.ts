import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from './order.model';
import { OrderService } from '../services/order.service';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ApproveOrderDialogComponent } from '../approve/dialog/approve-order-dialog/approve-order-dialog.component';
import { FinishOrderDialogComponent } from '../finish/dialog/finish-order-dialog/finish-order-dialog.component';

@Component({
  selector: 'app-get-all-orders',
  templateUrl: './get-all-orders.component.html',
  styleUrls: ['./get-all-orders.component.css']
})
export class GetAllOrdersComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];
  public columnsToDisplay = ['address', 'status', 'products', 'user', 'actions'];
  subscriptions: Subscription[] = [];
  userRole!: string;
  constructor(private orderService: OrderService,
    public approveOrderDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.setUserRole();
    console.log(this.userRole);
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

  setUserRole(): void {
    if (localStorage.getItem('token')) {
      let decodedToken: any = jwt_decode(localStorage.getItem('token')!);
      this.userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    else {
      this.userRole = "";
    }
  }

  openApproveOrderDialog(orderID: number) {
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderID: orderID
    };
    const dialogRef: MatDialogRef<ApproveOrderDialogComponent> = this.approveOrderDialog.open(ApproveOrderDialogComponent, dialogConfig);
  }

  openFinishOrderDialog(orderID: number) {
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      orderID: orderID
    };
    const dialogRef: MatDialogRef<FinishOrderDialogComponent> = this.approveOrderDialog.open(FinishOrderDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
