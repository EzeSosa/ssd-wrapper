import { DtoInterface } from './dto.interface';

export class Input implements DtoInterface {
  _id!: number;
  nombre!: string;

  buildPresentation(): string {
    return this.nombre;
  }

  getId(): number {
    return this._id;
  }
}
