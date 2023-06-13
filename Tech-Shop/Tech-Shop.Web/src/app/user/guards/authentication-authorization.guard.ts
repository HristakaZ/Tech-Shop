import { AuthenticationAuthorizationService } from './../services/authentication-authorization.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationAuthorizationGuard implements CanActivate {
  constructor(private authenticationAuthorizationService: AuthenticationAuthorizationService,
    private router: Router,
    private snackBar: MatSnackBar) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token: string | null = localStorage.getItem('token');

    if (this.authenticationAuthorizationService.$isUserLoggedIn(token)) {
      let role: string = route.data['role'];
      if (this.authenticationAuthorizationService.$isTokenExpired(token!)) {
        localStorage.clear();
        this.router.navigateByUrl('user/login');
        this.snackBar.open('The session timed out. Please renew it by logging in again.', 'X');
        return false;
      }
      if (role) {
        return this.authenticationAuthorizationService.$isUserEligible(token!, role);
      }

      return true;
    }

    return false;
  }

}
