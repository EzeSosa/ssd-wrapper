import { inject, Injectable, Injector } from '@angular/core';
import { ClientService } from '../services/client.service';
import { BaseService } from '../interfaces/service.interface';
import { ContainerSizeService } from '../services/container-size.service';
import { DtoInterface } from '../interfaces/dtos/dto.interface';
import { DtoFactory } from './dto.factory';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  #injector: Injector = inject(Injector);
  #dtoFactory: DtoFactory = inject(DtoFactory);

  private serviceMap: Record<string, any> = {
    cliente: ClientService,
    tamaño_envase: ContainerSizeService,
  };

  createService<T extends DtoInterface>(bodyName: string): BaseService<T> {
    const serviceClass = this.serviceMap[bodyName];
    if (!serviceClass) {
      throw new Error(`Service not found for bodyName: ${bodyName}`);
    }

    const service = this.#injector.get(serviceClass);
    const originalGetAll = service.getAll.bind(service);

    service.getAll = () =>
      originalGetAll().pipe(
        map((objects: any[]) => {
          const dtoClass = this.#dtoFactory.createDto<T>(bodyName);
          return objects.map((obj) => {
            const dtoInstance = new dtoClass();
            return Object.assign(dtoInstance, obj);
          });
        })
      );

    return service;
  }
}
