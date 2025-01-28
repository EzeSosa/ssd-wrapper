import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BaseService } from '../interfaces/service.interface';
import { Supplier } from '../dtos/supplier.dto';

@Injectable({ providedIn: 'root' })
export class SupplierService implements BaseService<Supplier> {
  #http: HttpClient = inject(HttpClient);
  #url: string = environment.apiUrl;

  getAll(): Observable<Supplier[]> {
    return this.#http.get<Supplier[]>(`${this.#url}/suppliers`);
  }
}
