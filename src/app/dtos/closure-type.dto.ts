import { DtoInterface } from './dto.interface';

export class ClosureType implements DtoInterface {
  _id!: number;
  nombre!: string;

  buildPresentation(): string {
    return this.nombre;
  }
}
