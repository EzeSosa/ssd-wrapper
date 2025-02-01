import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { QueryResponse } from '../interfaces/query-response.interface';

@Injectable({ providedIn: 'root' })
export class OrderService {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAveragePriceByDimension(
    date: Date,
    supplier: number,
    inputSize: number
  ): Observable<QueryResponse> {
    const options = {
      params: new HttpParams()
        .set('date', date.toISOString())
        .set('supplier', supplier.toString())
        .set('inputSize', inputSize.toString()),
    };

    return this.#http.get<QueryResponse>(
      `${this.#url}/orders/average-orders`,
      options
    );
  }

  getOrdersByDimensions(
    date: Date,
    supplier: number,
    inputSize: number
  ): Observable<QueryResponse> {
    const options = {
      params: new HttpParams()
        .set('date', date.toISOString())
        .set('supplier', supplier.toString())
        .set('inputSize', inputSize.toString()),
    };

    return this.#http.get<QueryResponse>(
      `${this.#url}/orders/input-quantity`,
      options
    );
  }
}
