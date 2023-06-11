import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../get-all-orders/order.model';
import { Observable, Subject, tap } from 'rxjs';

@Injectable()
export class OrderService {
  baseUrl = apiConfig.baseUrl;
  subject: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  public $getAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/api/Order`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $getById(id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.baseUrl}/api/Order/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $approve(id: number): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/Order/Approve`, id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  };

  public $finish(id: number): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/Order/Finish`, id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  };

  // public $create(createProductModel: CreateProductModel): Observable<Object> {
  //   let formData: FormData = new FormData();
  //   formData.append('name', createProductModel.name);
  //   formData.append('quantity', createProductModel.quantity.toString());
  //   formData.append('price', createProductModel.price.toString());
  //   formData.append('categoryID', createProductModel.categoryID.toString());
  //   formData.append('photo', createProductModel.photo as Blob);
  //   return this.httpClient.post(`${this.baseUrl}/api/Product`, formData, {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }),
  //     responseType: 'text'
  //   });
  // }

  // public $update(id: number, updateProductModel: UpdateProductModel): Observable<Object> {
  //   let formData: FormData = new FormData();
  //   formData.append('name', updateProductModel.name);
  //   formData.append('quantity', updateProductModel.quantity.toString());
  //   formData.append('price', updateProductModel.price.toString());
  //   formData.append('categoryID', updateProductModel.categoryID.toString());
  //   formData.append('photo', updateProductModel.photo as Blob);
  //   return this.httpClient.put(`${this.baseUrl}/api/Product/${id}`, formData, {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }),
  //     responseType: 'text'
  //   });
  // }

  // public $delete(id: number): Observable<Object> {
  //   return this.httpClient.delete(`${this.baseUrl}/api/Product/${id}`, {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }),
  //     responseType: 'text'
  //   });
  // }

  //TO DO: add the other endpoints for the order component from the .net order controller
}
