import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, RequestOptions } from '../../types';

@Injectable({
  providedIn: 'root'
})
export default class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }


  // CRUD Product API
  get<T>(url: string, options: RequestOptions): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, body: Product, options: RequestOptions): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  put<T>(url: string, body: Product, options: RequestOptions): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options: RequestOptions): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }


}
