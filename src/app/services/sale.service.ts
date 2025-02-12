import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { QueryResponse } from '../interfaces/query-response.interface';

@Injectable({ providedIn: 'root' })
export class SaleService {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getEarningsByDimensions(
    date: Date,
    client: number,
    containerSize: number
  ): Observable<QueryResponse> {
    const options = {
      params: new HttpParams()
        .set('date', date.toISOString())
        .set('client', client.toString())
        .set('containerSize', containerSize.toString()),
    };

    return this.#http.get<QueryResponse>(
      `${this.#url}/sales/earnings-by-dimensions`,
      options
    );
  }

  getBatchesByDimensions(
    date: Date,
    closureType: number,
    entranceType: number,
    fundType: number
  ): Observable<QueryResponse> {
    const options = {
      params: new HttpParams()
        .set('date', date.toISOString())
        .set('closureType', closureType.toString())
        .set('entranceType', entranceType.toString())
        .set('fundType', fundType.toString()),
    };

    return this.#http.get<QueryResponse>(
      `${this.#url}/sales/batches-by-dimensions`,
      options
    );
  }
}
