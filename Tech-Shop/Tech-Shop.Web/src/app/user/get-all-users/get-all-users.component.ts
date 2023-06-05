import jwt_decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from './user.model';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit, OnDestroy {
  public users: User[] = [];
  public columnsToDisplay = ['email', 'name', 'address', 'phoneNumber', 'role', /*orders,*/'updateButton', 'deleteButton'];
  subscription!: Subscription;
  constructor(private userService: UserService) { }
  public loggedInUserId: number = this.getLoggedInUserId();

  ngOnInit(): void {
    this.subscription = this.userService.$getAll().subscribe((users) => {
      this.users = users;
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
}
