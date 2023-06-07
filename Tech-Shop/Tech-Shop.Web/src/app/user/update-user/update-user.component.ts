import { AuthenticationAuthorizationService } from './../services/authentication-authorization.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../get-all-users/user.model';
import { UpdateUserModel } from './update-user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  updateUserForm!: FormGroup;
  subscriptions: Subscription[] = [];
  public updateUserModel!: UpdateUserModel;
  id: number = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
  isIdInputHidden: boolean = true;

  get email(): AbstractControl {
    return this.updateUserForm.get('email')!;
  }

  get name(): AbstractControl {
    return this.updateUserForm.get('name')!;
  }

  get address(): AbstractControl {
    return this.updateUserForm.get('address')!;
  }

  get phoneNumber(): AbstractControl {
    return this.updateUserForm.get('phoneNumber')!;
  }

  constructor(private userService: UserService,
    private updateUserSnackBar: MatSnackBar,
    private router: Router,
    private authenticationAuthorizationService: AuthenticationAuthorizationService) { }

  ngOnInit(): void {
    if (!this.authenticationAuthorizationService.$isCurrentUser(localStorage.getItem('token')!, this.id)) {
      this.router.navigateByUrl('product/getall');
    }

    this.updateUserForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ])
    });

    this.subscriptions.push(this.userService.$getById(this.id).subscribe((user) => {
      this.updateUserModel = user;
      this.updateUserForm.setValue({
        id: this.id,
        email: this.updateUserModel.email,
        name: this.updateUserModel.name,
        address: this.updateUserModel.address,
        phoneNumber: this.updateUserModel.phoneNumber
      });
    }));
  }

  updateUser(): void {
    if (!this.updateUserForm.invalid) {
      this.updateUserModel.email = this.updateUserForm.value.email;
      this.updateUserModel.name = this.updateUserForm.value.name;
      this.updateUserModel.address = this.updateUserForm.value.address;
      this.updateUserModel.phoneNumber = this.updateUserForm.value.phoneNumber;

      this.subscriptions.push(this.userService.$update(this.updateUserForm.value.id, this.updateUserModel).subscribe({
        next: (response) => {
          this.updateUserSnackBar.open(response.toString(), 'X', {
            duration: 3000
          })
          this.router.navigateByUrl('user/getall');
        },
        error: (errorResponse) => {
          this.updateUserSnackBar.open(errorResponse, 'X');
        }
      }));
    }
    else {
      this.updateUserSnackBar.open('There were validation errors while updating the user.', 'X');
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
