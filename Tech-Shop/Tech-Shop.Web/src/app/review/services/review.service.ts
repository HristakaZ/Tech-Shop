import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../review.model';
import { Observable, Subject, tap } from 'rxjs';
import apiConfig from '../../../apiconfig.json';
import { CreateReviewModel } from '../create-review/create-review.model';
import { UpdateReviewModel } from '../update-review/update-review.model';

@Injectable()
export class ReviewService {
  baseUrl = apiConfig.baseUrl;
  subject: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  public $getAll(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.baseUrl}/api/Review`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $getById(id: number): Observable<Review> {
    return this.httpClient.get<Review>(`${this.baseUrl}/api/Review/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $create(createReviewModel: CreateReviewModel): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/api/Review`, createReviewModel, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  public $update(id: number, updateReviewModel: UpdateReviewModel): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/api/Review/${id}`, updateReviewModel, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  public $delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/api/Review/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }
}
