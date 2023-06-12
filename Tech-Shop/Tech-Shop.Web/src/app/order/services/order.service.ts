import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../get-all-orders/order.model';
import { Observable, Subject, tap } from 'rxjs';
import { ReturnOrderModel } from '../return/dialog/return-order-dialog/return-order.model';
import { PlaceOrderModel } from '../place-order/place-order.model';

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

  public $getLoggedInUserOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.baseUrl}/api/Order/GetLoggedInUserOrders`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $approve(id: number): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/api/Order/Approve`, id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  };

  public $finish(id: number): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/api/Order/Finish`, id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  };

  public $cancel(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/api/Order/Cancel`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text',
      body: id
    }).pipe(tap(() => {
      this.subject.next();
    }));
  };

  public $requestReturn(returnOrderModel: ReturnOrderModel): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/api/Order/RequestReturn`, returnOrderModel, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  };

  public $return(id: number): Observable<Object> {
    return this.httpClient.patch(`${this.baseUrl}/api/Order/Return`, id, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  };

  public $place(placeOrderModel: PlaceOrderModel): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/Order/Place`, placeOrderModel, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }
}
