import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationAuthorizationService } from '../services/authentication-authorization.service';
import { RoleConstants } from '../constants/role-constants';
import { User } from '../get-all-users/user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit, OnDestroy {
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  public user: User = new User();
  deleteUserForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isIdInputHidden: boolean = true;
  isCurrentUser: boolean = this.authenticationAuthorizationService.$isCurrentUser(localStorage.getItem('token')!, this.id);

  constructor(private userService: UserService,
    private router: Router,
    private deleteUserSnackBar: MatSnackBar,
    private authenticationAuthorizationService: AuthenticationAuthorizationService) { }

  ngOnInit(): void {
    debugger;
    if (!this.isCurrentUser
      && !this.authenticationAuthorizationService.$isUserEligible(localStorage.getItem('token')!, RoleConstants.adminRole)) {
      this.router.navigateByUrl('user/login'); //TO DO: change to a different url afterwards
    }

    this.deleteUserForm = new FormGroup({
      id: new FormControl('')
    });

    this.subscriptions.push(this.userService.$getById(this.id).subscribe((user) => {
      this.user = user;
      this.deleteUserForm.setValue({
        id: this.user.id
      });
    }));
  }

  deleteUser(): void {
    this.subscriptions.push(this.userService.$delete(this.deleteUserForm.value.id).subscribe({
      next: (response) => {
        this.deleteUserSnackBar.open(response.toString(), 'X', {
          duration: 3000
        });
        if(this.isCurrentUser) {
          this.router.navigateByUrl('user/logout');
        }
        else {
          this.router.navigateByUrl('user/getall');
        }
      },
      error: (errorResponse) => {
        this.deleteUserSnackBar.open(errorResponse, 'X');
      }
    }));
  }

  ngOnDestroy(): void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }

}
