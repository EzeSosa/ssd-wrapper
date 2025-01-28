import { DtoInterface } from './dto.interface';

export class Supplier implements DtoInterface {
  _id!: number;
  nombre_proveedor!: string;

  buildPresentation(): string {
    return this.nombre_proveedor;
  }

  getId(): number {
    return this._id;
  }
}
