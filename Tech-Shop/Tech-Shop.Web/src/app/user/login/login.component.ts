import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginModel } from './login.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Token } from './token.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subscription!: Subscription;

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  constructor(private userService: UserService, private loginSnackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('product/getall');
    }

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(): void {
    let loginModel: LoginModel = new LoginModel(this.loginForm.value.email, this.loginForm.value.password);
    let token: Token;
    this.subscription = this.userService.$login(loginModel).subscribe({
      next: (response) => {
        token = response as Token;
        localStorage.setItem('token', token.token);
        this.loginSnackBar.open('Successfully logged in!', 'X', {
          duration: 3000
        });
        this.router.navigateByUrl('product/getall');
      },
      error: (errorResponse) => {
        this.loginSnackBar.open(errorResponse.error, 'X');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
