import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { LoginModel } from '../login/login.model';
import { Observable, Subject, tap } from 'rxjs';
import { RegisterModel } from '../register/register.model';
import { User, UserTotalCount } from '../get-all-users/user.model';
import { UpdateUserModel } from '../update-user/update-user.model';
import { ChangePasswordModel } from '../change-password/change-password.model';
import { ForgottenPasswordModel } from '../forgotten-password/forgotten-password.model';

@Injectable()
export class UserService {
  baseUrl = apiConfig.baseUrl;
  subject: Subject<void> = new Subject<void>();

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

  public $getAll(search?: string | null, page?: any, pageSize?: any, orderBy?: string | null, orderByDirection?: string | null): Observable<UserTotalCount> {
    search = search ?? '';
    orderBy = orderBy ?? '';
    orderByDirection = orderByDirection ?? '';
    page = page ?? '';
    pageSize = pageSize ?? '';
    return this.httpClient.get<UserTotalCount>(`${this.baseUrl}/api/User?search=${search}&page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderByDirection=${orderByDirection}`, {
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
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  public $changePassword(changePasswordModel: ChangePasswordModel): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/api/User/ChangePassword`, changePasswordModel, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }

  public $forgottenPassword(forgottenPasswordModel: ForgottenPasswordModel): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/api/User/ForgottenPassword`, forgottenPasswordModel, {
      responseType: 'text'
    });
  }
}
