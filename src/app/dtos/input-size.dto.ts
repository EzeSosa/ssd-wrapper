import { DtoInterface } from './dto.interface';

export class InputSize implements DtoInterface {
  _id!: number;
  nombre_tamaño_insumo!: string;

  buildPresentation(): string {
    return this.nombre_tamaño_insumo;
  }
}
