import { inject, Injectable } from '@angular/core';
import { ClosureType } from '../interfaces/dtos/closure-type.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseService } from '../interfaces/service.interface';

@Injectable({ providedIn: 'root' })
export class ClosureTypeService implements BaseService<ClosureType> {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<ClosureType[]> {
    return this.#http.get<ClosureType[]>(`${this.#url}/closure-types`);
  }
}
