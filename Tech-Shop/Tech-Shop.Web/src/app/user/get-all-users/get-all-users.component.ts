import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, UserTotalCount } from './user.model';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public columnsToDisplay = ['email', 'name', 'address', 'phoneNumber', 'role', 'updateButton', 'deleteButton'];
  subscription!: Subscription;
  public loggedInUserId: number = this.getLoggedInUserId();
  public totalCount!: number;
  public pageSize = 5;
  public currentPage = 1;
  private orderBy?: string;
  private orderByDirection?: string;
  private searchQuery?: string;
  @ViewChild('input') searchInput!: ElementRef;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.performAllFilters();
    this.subscription = this.userService.subject.subscribe(() => {
      this.searchQuery = '';
      this.searchInput.nativeElement.value = '';
      this.performAllFilters();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getLoggedInUserId(): number {
    let decodedToken: any = jwt_decode(localStorage.getItem('token')!);
    return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
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
    this.subscription = this.userService.$getAll(this.searchQuery, this.currentPage, this.pageSize, this.orderBy, this.orderByDirection).subscribe((userTotalCount) => {
      this.users = userTotalCount.users;
      this.totalCount = userTotalCount.totalCount;
    });
  }
}