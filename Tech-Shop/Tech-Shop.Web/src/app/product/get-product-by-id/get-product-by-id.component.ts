import { Component, OnDestroy, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../get-all-products/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ReviewService } from 'src/app/review/services/review.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-get-product-by-id',
  templateUrl: './get-product-by-id.component.html',
  styleUrls: ['./get-product-by-id.component.css']
})
export class GetProductByIdComponent implements OnInit, OnDestroy, DoCheck {
  product: Product = new Product();
  subscriptions: Subscription[] = [];
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  isIdInputHidden: boolean = true;
  userRole!: string;
  userId!: number;
  public columnsToDisplay = ['user', 'rating', 'comment', 'updateButton', 'deleteButton'];
  isProductAlreadyAdded!: Boolean;
  public totalCount!: number;
  public pageSize = 5;
  public currentPage = 1;
  private orderBy?: string;
  private orderByDirection?: string;
  private searchQuery?: string;
  @ViewChild('input') searchInput!: ElementRef;
  constructor(private productService: ProductService,
    private router: Router,
    private reviewService: ReviewService,
    private addToCartSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.performAllFilters();
    this.setUserRole();
    this.setUserId();
    this.subscriptions.push(this.reviewService.subject.subscribe(() => {
      this.searchQuery = '';
      this.searchInput.nativeElement.value = '';
      this.performAllFilters();
    }));
  }

  ngDoCheck(): void {
    this.setUserRole();
    this.setUserId();
    this.setIsProductAlreadyAdded(this.product.id);
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

  setUserId(): void {
    if (localStorage.getItem('token')) {
      let decodedToken: any = jwt_decode(localStorage.getItem('token')!);
      this.userId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    }
    else {
      this.userId = 0;
    }
  }

  addToCart(id: number): void {
    let productIDs: number[] = JSON.parse(localStorage.getItem('productIDs')!);
    if (productIDs) {
      productIDs.push(id);
      localStorage.setItem('productIDs', JSON.stringify(productIDs));
    }
    else {
      localStorage.setItem('productIDs', JSON.stringify([id]));
    }
    this.addToCartSnackBar.open('Successfully added product to cart!', 'X', {
      duration: 3000
    });
  }

  setIsProductAlreadyAdded(id: number): void {
    if (localStorage.getItem('productIDs')) {
      let productIDs: number[] = JSON.parse(localStorage.getItem('productIDs')!);
      if (productIDs.find(productID => productID == id)) {
        this.isProductAlreadyAdded = true;
      }
    }
    else {
      this.isProductAlreadyAdded = false;
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
    this.subscriptions.push(this.productService.$getById(this.id, this.searchQuery, this.currentPage, this.pageSize, this.orderBy, this.orderByDirection).subscribe((productTotalCount) => {
      this.product = productTotalCount.product;
      this.totalCount = productTotalCount.totalCount;
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
