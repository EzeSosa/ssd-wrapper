import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseService } from '../interfaces/service.interface';
import { EntranceType } from '../interfaces/dtos/entrance-type.dto';

@Injectable({ providedIn: 'root' })
export class EntranceTypeService implements BaseService<EntranceType> {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<EntranceType[]> {
    return this.#http.get<EntranceType[]>(`${this.#url}/entrance-types`);
  }
}
