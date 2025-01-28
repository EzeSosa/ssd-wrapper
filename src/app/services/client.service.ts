import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/dtos/client.dto';
import { environment } from '../../environments/environment';
import { BaseService } from '../interfaces/service.interface';

@Injectable({ providedIn: 'root' })
export class ClientService implements BaseService<Client> {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<Client[]> {
    return this.#http.get<Client[]>(`${this.#url}/clients`);
  }
}
