import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleConstants } from 'src/app/user/constants/role-constants';
import { User } from 'src/app/user/get-all-users/user.model';
import { AuthenticationAuthorizationService } from 'src/app/user/services/authentication-authorization.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {
  public user: User = new User();
  deleteUserForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isIdInputHidden: boolean = true;
  isCurrentUser!: boolean;

  constructor(private userService: UserService,
    private router: Router,
    private deleteUserSnackBar: MatSnackBar,
    private authenticationAuthorizationService: AuthenticationAuthorizationService,
    private deleteUserDialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.isCurrentUser = this.authenticationAuthorizationService.$isCurrentUser(localStorage.getItem('token')!, this.data.id);
    if (!this.isCurrentUser
      && !this.authenticationAuthorizationService.$isUserEligible(localStorage.getItem('token')!, RoleConstants.adminRole)) {
      this.router.navigateByUrl('product/getall');
    }

    this.deleteUserForm = new FormGroup({
      id: new FormControl('')
    });

    this.deleteUserForm.setValue({
      id: this.data.id
    });

    this.subscriptions.push(this.userService.$getById(this.deleteUserForm.value.id).subscribe((user) => {
      this.user = user;
    }));
  }

  deleteUser(): void {
    this.subscriptions.push(this.userService.$delete(this.deleteUserForm.value.id).subscribe({
      next: (response) => {
        this.deleteUserDialogRef.close(this.data);
        this.deleteUserSnackBar.open(response.toString(), 'X', {
          duration: 3000
        });
        if (this.isCurrentUser) {
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
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
