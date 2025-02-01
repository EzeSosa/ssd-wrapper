import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { QueryResponse } from '../interfaces/query-response.interface';

@Injectable({ providedIn: 'root' })
export class ProductionService {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getContainerTypesByDimensions(
    date: Date,
    client: number,
    input: number
  ): Observable<QueryResponse> {
    const options = {
      params: new HttpParams()
        .set('date', date.toISOString())
        .set('client', client.toString())
        .set('input', input.toString()),
    };

    return this.#http.get<QueryResponse>(
      `${this.#url}/productions/container-types`,
      options
    );
  }
}
