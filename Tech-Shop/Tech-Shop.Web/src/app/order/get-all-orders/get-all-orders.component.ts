import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from './order.model';
import { OrderService } from '../services/order.service';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ApproveOrderDialogComponent } from '../approve/dialog/approve-order-dialog/approve-order-dialog.component';
import { FinishOrderDialogComponent } from '../finish/dialog/finish-order-dialog/finish-order-dialog.component';
import { ApproveReturnDialogComponent } from '../return/dialog/approve-return-dialog/approve-return-dialog.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-get-all-orders',
  templateUrl: './get-all-orders.component.html',
  styleUrls: ['./get-all-orders.component.css']
})
export class GetAllOrdersComponent implements OnInit, OnDestroy {
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
    this.subscriptions.push(this.orderService.$getAll(this.searchQuery, this.currentPage, this.pageSize, this.orderBy, this.orderByDirection).subscribe((orderTotalCount) => {
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
