import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category, CategoryTotalCount } from '../category.model';

@Injectable()
export class CategoryService {
  baseUrl = apiConfig.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public $getAll(search?: string | null, page?: number | null, pageSize?: number | null, orderBy?: string | null, orderByDirection?: string | null): Observable<CategoryTotalCount> {
    search = search ?? '';
    orderBy = orderBy ?? '';
    orderByDirection = orderByDirection ?? '';
    return this.httpClient.get<CategoryTotalCount>(`${this.baseUrl}/api/Category?search=${search}&page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderByDirection=${orderByDirection}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $getById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/api/Category/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $create(category: Category): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/Category`, category, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }

  public $update(id: number, category: Category): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/api/Category/${id}`, category, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }

  public $delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/api/Category/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }
}
