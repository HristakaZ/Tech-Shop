import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgottenPasswordModel } from './forgotten-password.model';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit, OnDestroy {
  forgottenPasswordForm!: FormGroup;
  subscription!: Subscription;

  get email(): AbstractControl {
    return this.forgottenPasswordForm.get('email')!;
  }

  constructor(private userService: UserService,
    private forgottenPasswordSnackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.forgottenPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }

  forgottenPassword(): void {
    if (!this.forgottenPasswordForm.invalid) {
      let forgottenPasswordModel: ForgottenPasswordModel = new ForgottenPasswordModel(
        this.forgottenPasswordForm.value.email
      );

      this.subscription = this.userService.$forgottenPassword(forgottenPasswordModel).subscribe({
        next: (response) => {
          this.forgottenPasswordSnackBar.open('You have successfully issued a forgotten password request. Please go to your email for further instructions.', 'X');
          this.router.navigateByUrl('user/login');
        },
        error: (errorResponse) => {
          this.forgottenPasswordSnackBar.open('An unexpected error occured when issuing a forgotten password email to the user.', 'X');
        }
      });
    }
    else {
      this.forgottenPasswordSnackBar.open('There were validation errors while issuing a forgotten password request!', 'X');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
