import {
  inject,
  Injectable,
  Injector,
  signal,
  WritableSignal,
} from '@angular/core';
import { map } from 'rxjs';
import { ClientService } from '../services/client.service';
import { BaseService } from '../interfaces/service.interface';
import { ContainerSizeService } from '../services/container-size.service';
import { DtoInterface } from '../dtos/dto.interface';
import { DtoFactory } from './dto.factory';
import { ClosureTypeService } from '../services/closure-type.service';
import { EntranceTypeService } from '../services/entrance-type.service';
import { FundTypeService } from '../services/fund-type.service';
import { SupplierService } from '../services/supplier.service';
import { InputSizeService } from '../services/input-size.service';
import { InputService } from '../services/input.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  #injector: Injector = inject(Injector);
  #dtoFactory: DtoFactory = inject(DtoFactory);

  private serviceMap: WritableSignal<Record<string, any>> = signal({
    cliente: ClientService,
    tamaño_envase: ContainerSizeService,
    tipo_cierre: ClosureTypeService,
    tipo_boca: EntranceTypeService,
    tipo_fondo: FundTypeService,
    proveedor: SupplierService,
    tamaño_insumo: InputSizeService,
    insumo: InputService,
  });

  createService<T extends DtoInterface>(bodyName: string): BaseService<T> {
    const serviceClass = this.serviceMap()[bodyName];
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
