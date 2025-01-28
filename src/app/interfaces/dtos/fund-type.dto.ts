import { DtoInterface } from './dto.interface';

export class FundType implements DtoInterface {
  _id!: number;
  nombre!: string;

  buildPresentation(): string {
    return this.nombre;
  }
}
