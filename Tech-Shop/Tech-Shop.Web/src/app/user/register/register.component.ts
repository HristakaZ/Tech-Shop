import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterModel } from './register.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subscription!: Subscription;

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  get name(): AbstractControl {
    return this.registerForm.get('name')!;
  }

  get address(): AbstractControl {
    return this.registerForm.get('address')!;
  }

  get phoneNumber(): AbstractControl {
    return this.registerForm.get('phoneNumber')!;
  }

  constructor(private userService: UserService, private registerSnackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$')
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
  }

  register(): void {
    if (!this.registerForm.invalid) {
      let registerModel: RegisterModel = new RegisterModel(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.name,
        this.registerForm.value.address,
        this.registerForm.value.phoneNumber
      );

      this.subscription = this.userService.$register(registerModel).subscribe({
        next: (response) => {
          this.registerSnackBar.open('User was successfully registered.', 'X', {
            duration: 3000
          });
          this.router.navigateByUrl('user/login');
        },
        error: (errorResponse) => {
          this.registerSnackBar.open(errorResponse.error, 'X');
        }
      });
    }
    else {
      this.registerSnackBar.open('There were validation errors while registering the user!', 'X');
    }
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
