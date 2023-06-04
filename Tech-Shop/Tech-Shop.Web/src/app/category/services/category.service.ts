import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../get-all-categories/category.model';

@Injectable()
export class CategoryService {
  baseUrl = apiConfig.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public $getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/api/Category`, {
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
    return this.httpClient.post(`${this.baseUrl}/api/Category`, {
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
