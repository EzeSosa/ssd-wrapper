import { Observable } from 'rxjs';
import { DtoInterface } from '../dtos/dto.interface';

export interface BaseService<T extends DtoInterface> {
  getAll(): Observable<T[]>;
}
