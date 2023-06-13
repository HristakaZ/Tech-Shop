import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthenticationAuthorizationService {

  constructor() { }

  public $isUserLoggedIn(token: string | null): boolean {
    if (token) {
      return true;
    }

    return false;
  }

  public $isUserEligible(token: string, role: string): boolean {
    let decodedToken: any = jwt_decode(token!);
    console.log(decodedToken);
    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === role) {
      return true;
    }

    return false;
  }

  public $isCurrentUser(token: string, id: number): boolean {
    let decodedToken: any = jwt_decode(token!);
    if (parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']) === id) {
      return true;
    }

    return false;
  }

  public $isTokenExpired(token: string): boolean {
    let decodedToken: any = jwt_decode(token!);
    const expiry = decodedToken.exp;
    let currentDateTime: number = (Math.floor((new Date).getTime() / 1000));
    let isTokenExpired: boolean = currentDateTime >= expiry;

    return isTokenExpired;
  }
}
