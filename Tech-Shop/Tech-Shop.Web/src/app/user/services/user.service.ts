import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { LoginModel } from '../login/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../register/register.model';
import { User } from '../get-all-users/user.model';
import { UpdateUserModel } from '../update-user/update-user.model';

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

  public $getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/User`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/api/User/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $update(id: number, updateUserModel: UpdateUserModel): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/api/User/${id}`, updateUserModel, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }

  public $delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/api/User/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }
}
