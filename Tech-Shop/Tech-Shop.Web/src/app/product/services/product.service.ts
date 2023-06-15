import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiConfig from '../../../apiconfig.json';
import { Product, ProductByIdTotalCount, ProductTotalCount } from '../get-all-products/product.model';
import { Observable, Subject, tap } from 'rxjs';
import { CreateProductModel } from '../create-product/create-product.model';
import { UpdateProductModel } from '../update-product/update-product.model';

@Injectable()
export class ProductService {
  baseUrl = apiConfig.baseUrl;
  subject: Subject<void> = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  public $getAll(search?: string | null, page?: any, pageSize?: any, orderBy?: string | null, orderByDirection?: string | null): Observable<ProductTotalCount> {
    search = search ?? '';
    orderBy = orderBy ?? '';
    orderByDirection = orderByDirection ?? '';
    page = page ?? '';
    pageSize = pageSize ?? '';
    return this.httpClient.get<ProductTotalCount>(`${this.baseUrl}/api/Product?search=${search}&page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderByDirection=${orderByDirection}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $getById(id: number, search?: string | null, page?: any, pageSize?: any, orderBy?: string | null, orderByDirection?: string | null): Observable<ProductByIdTotalCount> {
    search = search ?? '';
    orderBy = orderBy ?? '';
    orderByDirection = orderByDirection ?? '';
    page = page ?? '';
    pageSize = pageSize ?? '';
    return this.httpClient.get<ProductByIdTotalCount>(`${this.baseUrl}/api/Product/${id}?search=${search}&page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderByDirection=${orderByDirection}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $getByIds(productIDs: number[]): Observable<Product[]> {
    return this.httpClient.post<Product[]>(`${this.baseUrl}/api/Product/GetProductsByIDs`, productIDs, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  public $create(createProductModel: CreateProductModel): Observable<Object> {
    let formData: FormData = new FormData();
    formData.append('name', createProductModel.name);
    formData.append('quantity', createProductModel.quantity.toString());
    formData.append('price', createProductModel.price.toString());
    formData.append('categoryID', createProductModel.categoryID.toString());
    formData.append('photo', createProductModel.photo as Blob);
    return this.httpClient.post(`${this.baseUrl}/api/Product`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      responseType: 'text'
    });
  }

  public $update(id: number, updateProductModel: UpdateProductModel): Observable<Object> {
    let formData: FormData = new FormData();
    formData.append('name', updateProductModel.name);
    formData.append('quantity', updateProductModel.quantity.toString());
    formData.append('price', updateProductModel.price.toString());
    formData.append('categoryID', updateProductModel.categoryID.toString());
    formData.append('photo', updateProductModel.photo as Blob);
    return this.httpClient.put(`${this.baseUrl}/api/Product/${id}`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }
}
