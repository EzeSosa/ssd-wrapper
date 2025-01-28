import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Client } from '../dtos/client.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContainerSizeService {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<Client[]> {
    return this.#http.get<Client[]>(`${this.#url}/container-sizes`);
  }
}
