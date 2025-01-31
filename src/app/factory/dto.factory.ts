import { Injectable, signal, WritableSignal } from '@angular/core';
import { Client } from '../dtos/client.dto';
import { ContainerSize } from '../dtos/container-size.dto';
import { DtoInterface } from '../dtos/dto.interface';
import { ClosureType } from '../dtos/closure-type.dto';
import { EntranceType } from '../dtos/entrance-type.dto';
import { FundType } from '../dtos/fund-type.dto';
import { Supplier } from '../dtos/supplier.dto';
import { InputSize } from '../dtos/input-size.dto';
import { Input } from '../dtos/input.dto';

@Injectable({
  providedIn: 'root',
})
export class DtoFactory {
  private dtoMap: WritableSignal<Record<string, new () => DtoInterface>> =
    signal({
      cliente: Client,
      tamaño_envase: ContainerSize,
      tipo_cierre: ClosureType,
      tipo_boca: EntranceType,
      tipo_fondo: FundType,
      proveedor: Supplier,
      tamaño_insumo: InputSize,
      insumo: Input,
    });

  createDto<T extends DtoInterface>(bodyName: string): new () => T {
    const dtoClass = this.dtoMap()[bodyName];
    if (!dtoClass)
      throw new Error(`DTO class not found for bodyName: ${bodyName}`);
    return dtoClass as new () => T;
  }
}
