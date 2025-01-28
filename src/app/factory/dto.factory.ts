import { Injectable } from '@angular/core';
import { Client } from '../interfaces/dtos/client.dto';
import { ContainerSize } from '../interfaces/dtos/container-size.dto';
import { DtoInterface } from '../interfaces/dtos/dto.interface';

@Injectable({
  providedIn: 'root',
})
export class DtoFactory {
  private dtoMap: Record<string, new () => DtoInterface> = {
    cliente: Client,
    tamaño_envase: ContainerSize,
  };

  createDto<T extends DtoInterface>(bodyName: string): new () => T {
    const dtoClass = this.dtoMap[bodyName];
    if (!dtoClass) {
      throw new Error(`DTO class not found for bodyName: ${bodyName}`);
    }

    return dtoClass as new () => T;
  }
}
