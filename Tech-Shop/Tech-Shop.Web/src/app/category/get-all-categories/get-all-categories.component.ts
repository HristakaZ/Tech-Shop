import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../services/category.service';
import jwt_decode from 'jwt-decode';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-get-all-categories',
  templateUrl: './get-all-categories.component.html',
  styleUrls: ['./get-all-categories.component.css']
})
export class GetAllCategoriesComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  public columnsToDisplay = ['name', 'updateButton', 'deleteButton'];
  subscription!: Subscription;
  userRole!: string;
  public totalCount!: number;
  public pageSize = 5;
  public currentPage = 1;
  private orderBy?: string;
  private orderByDirection?: string;
  private searchQuery?: string;
  @ViewChild('input') searchInput!: ElementRef;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.performAllFilters();
    this.subscription = this.categoryService.subject.subscribe(() => {
      this.searchQuery = '';
      this.searchInput.nativeElement.value = '';
      this.performAllFilters();
    });
    this.setUserRole();
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
    this.subscription = this.categoryService.$getAll(this.searchQuery, this.currentPage, this.pageSize, this.orderBy, this.orderByDirection).subscribe((categoryTotalCount) => {
      this.categories = categoryTotalCount.categories;
      this.totalCount = categoryTotalCount.totalCount;
    });
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
}
