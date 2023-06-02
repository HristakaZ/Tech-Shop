import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { LoginModel } from '../login/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../register/register.model';

@Injectable()
export class UserService {
  baseUrl = apiConfig.baseUrl;

  constructor(private httpClient: HttpClient) { }


  public $login(loginModel: LoginModel): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/User/Login`, loginModel);
  }

  public $logout(): void {
    localStorage.removeItem('token');
  }

  public $register(registerModel: RegisterModel): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/User/Register`, registerModel);
  }
}
