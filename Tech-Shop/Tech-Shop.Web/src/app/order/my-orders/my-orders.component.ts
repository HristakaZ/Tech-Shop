import { Component, OnInit } from '@angular/core';
import { Order } from '../get-all-orders/order.model';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CancelOrderDialogComponent } from '../cancel/dialog/cancel-order-dialog/cancel-order-dialog.component';
import { ReturnOrderDialogComponent } from '../return/dialog/return-order-dialog/return-order-dialog.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  public orders: Order[] = [];
  public columnsToDisplay = ['address', 'status', 'products', 'user', 'actions'];
  subscriptions: Subscription[] = [];
  public totalCount!: number;
  public pageSize = 5;
  public currentPage = 1;
  private orderBy?: string;
  private orderByDirection?: string;
  private searchQuery?: string;
  constructor(private orderService: OrderService,
    public approveOrderDialog: MatDialog) { }

  ngOnInit(): void {
    this.performAllFilters();
    this.subscriptions.push(this.orderService.subject.subscribe(() => {
      this.performAllFilters();
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

  public handlePage(e: any) {
    this.currentPage = ++e.pageIndex;
    this.pageSize = e.pageSize;

    this.performAllFilters();
  }

  public sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.orderBy = sort.active;
      this.orderByDirection = sort.direction;
      return;
    }
    this.orderBy = sort.active;
    this.orderByDirection = sort.direction;

    this.performAllFilters();
  }

  public search(searchQuery?: string) {
    this.searchQuery = searchQuery;

    this.performAllFilters();
  }

  private performAllFilters() {
    this.subscriptions.push(this.orderService.$getLoggedInUserOrders(this.searchQuery, this.currentPage, this.pageSize, this.orderBy, this.orderByDirection).subscribe((orderTotalCount) => {
      this.orders = orderTotalCount.orders;
      this.totalCount = orderTotalCount.totalCount;
    }));
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
