import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from '../interfaces/service.interface';
import { InputSize } from '../dtos/input-size.dto';

@Injectable({ providedIn: 'root' })
export class InputSizeService implements BaseService<InputSize> {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<InputSize[]> {
    return this.#http.get<InputSize[]>(`${this.#url}/input-sizes`);
  }
}
