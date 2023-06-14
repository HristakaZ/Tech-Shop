import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import jwt_decode from 'jwt-decode';
import apiConfig from '../../../apiconfig.json';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.css']
})
export class GetAllProductsComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public columnsToDisplay = ['name', 'quantity', 'price', 'imagePath', 'category', 'reviewCount', 'updateButton', 'deleteButton'];
  subscription!: Subscription;
  userRole!: string;
  public totalCount!: number;
  public pageSize = 5;
  public currentPage = 1;
  private orderBy?: string;
  private orderByDirection?: string;
  private searchQuery?: string;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.performAllFilters();
    this.setUserRole();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.subscription = this.productService.$getAll(this.searchQuery, this.currentPage, this.pageSize, this.orderBy, this.orderByDirection).subscribe((productTotalCount) => {
      this.products = productTotalCount.products;
      this.totalCount = productTotalCount.totalCount;
    });
  }
}
