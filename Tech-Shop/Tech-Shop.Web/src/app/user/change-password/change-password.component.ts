import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChangePasswordModel } from './change-password.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm!: FormGroup;
  subscription!: Subscription;

  get oldPassword(): AbstractControl {
    return this.changePasswordForm.get('oldPassword')!;
  }

  get newPassword(): AbstractControl {
    return this.changePasswordForm.get('newPassword')!;
  }

  get confirmNewPassword(): AbstractControl {
    return this.changePasswordForm.get('confirmNewPassword')!;
  }

  constructor(private userService: UserService,
    private changePasswordSnackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$')
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$')
      ])
    });
  }

  changePassword(): void {
    debugger;
    if (this.changePasswordForm.value.newPassword != this.changePasswordForm.value.confirmNewPassword) {
      this.changePasswordForm.controls['newPassword'].setErrors({ 'invalid': true })
      this.changePasswordForm.controls['confirmNewPassword'].setErrors({ 'invalid': true })
    }
    else {
      this.changePasswordForm.controls['newPassword'].setErrors(null)
      this.changePasswordForm.controls['confirmNewPassword'].setErrors(null)
    }

    if (!this.changePasswordForm.invalid) {
      let changePasswordModel: ChangePasswordModel = new ChangePasswordModel(
        this.changePasswordForm.value.oldPassword,
        this.changePasswordForm.value.newPassword,
        this.changePasswordForm.value.confirmNewPassword
      );

      this.subscription = this.userService.$changePassword(changePasswordModel).subscribe({
        next: (response) => {
          this.changePasswordSnackBar.open(response.toString(), 'X', {
            duration: 3000
          });
          this.router.navigateByUrl('product/getall');
        },
        error: (errorResponse) => {
          this.changePasswordSnackBar.open(errorResponse.error, 'X');
        }
      });
    }
    else {
      this.changePasswordSnackBar.open('There were validation errors while registering the user!', 'X');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
