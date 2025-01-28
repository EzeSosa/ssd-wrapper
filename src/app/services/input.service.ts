import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Input } from '../dtos/input.dto';
import { environment } from '../../environments/environment';
import { BaseService } from '../interfaces/service.interface';

@Injectable({ providedIn: 'root' })
export class InputService implements BaseService<Input> {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<Input[]> {
    return this.#http.get<Input[]>(`${this.#url}/inputs`);
  }
}
