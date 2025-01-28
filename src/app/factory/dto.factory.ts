import { Injectable } from '@angular/core';
import { Client } from '../interfaces/dtos/client.dto';
import { ContainerSize } from '../interfaces/dtos/container-size.dto';
import { DtoInterface } from '../interfaces/dtos/dto.interface';
import { ClosureType } from '../interfaces/dtos/closure-type.dto';
import { EntranceType } from '../interfaces/dtos/entrance-type.dto';
import { FundType } from '../interfaces/dtos/fund-type.dto';

@Injectable({
  providedIn: 'root',
})
export class DtoFactory {
  private dtoMap: Record<string, new () => DtoInterface> = {
    cliente: Client,
    tamaño_envase: ContainerSize,
    tipo_cierre: ClosureType,
    tipo_boca: EntranceType,
    tipo_fondo: FundType,
  };

  createDto<T extends DtoInterface>(bodyName: string): new () => T {
    const dtoClass = this.dtoMap[bodyName];
    if (!dtoClass) {
      throw new Error(`DTO class not found for bodyName: ${bodyName}`);
    }

    return dtoClass as new () => T;
  }
}
