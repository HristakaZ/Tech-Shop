import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../services/category.service';
import jwt_decode from 'jwt-decode';

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
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.subscription = this.categoryService.$getAll().subscribe((categories) => {
      this.categories = categories;
    });
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
}
