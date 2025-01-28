import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseService } from '../interfaces/service.interface';
import { FundType } from '../dtos/fund-type.dto';

@Injectable({ providedIn: 'root' })
export class FundTypeService implements BaseService<FundType> {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<FundType[]> {
    return this.#http.get<FundType[]>(`${this.#url}/fund-types`);
  }
}
