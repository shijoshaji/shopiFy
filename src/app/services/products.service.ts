import { Injectable } from '@angular/core';
import ApiService from './api.service';
import { Observable } from 'rxjs';
import { PaginationParam, Product, Products } from '../../types';
// import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }


   // getProductsDiffApproach = (url: string, params: PaginationParam): Observable<Products> => {
  //   const httpParams = new HttpParams({ fromObject: params as any });
  //   return this.apiService.get(url, {
  //     params: httpParams,
  //     responseType: 'json'
  //   });
  // };

  getProducts = (url: string, params: PaginationParam): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json'
    });
  };

  addProduct = (url: string, body: Product): Observable<Products> => {
    return this.apiService.post(url, body, {});
  };

  editProduct = (url: string, body: Product): Observable<Products> => {
    return this.apiService.put(url, body, {});
  };

  deleteProduct = (url: string): Observable<Products> => {
    return this.apiService.delete(url, {});
  };
}






