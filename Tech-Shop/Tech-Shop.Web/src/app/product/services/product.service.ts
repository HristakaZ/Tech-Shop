import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { Product } from '../product.model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  baseUrl = apiConfig.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public $getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/api/Product`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/api/Product/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $create(product: Product): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/Product`, product, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'enctype': 'multipart/form-data'
      }),
      responseType: 'text'
    });
  }

  public $update(id: number, product: Product): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/api/Product/${id}`, product, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'enctype': 'multipart/form-data'
      }),
      responseType: 'text'
    });
  }

  public $delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/api/Product/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }
}
