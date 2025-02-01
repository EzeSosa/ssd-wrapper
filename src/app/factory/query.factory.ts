import { inject, Injectable } from '@angular/core';
import { QueryResponse } from '../interfaces/query-response.interface';
import { Query } from '../interfaces/query.interface';
import { SaleService } from '../services/sale.service';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';
import { ProductionService } from '../services/production.service';

@Injectable({ providedIn: 'root' })
export class QueryFactory {
  #saleService: SaleService = inject(SaleService);
  #orderService: OrderService = inject(OrderService);
  #productionService: ProductionService = inject(ProductionService);

  getQuery(query: Query, formValue: any): Observable<QueryResponse> {
    switch (query.id) {
      case 'ventas-1':
        return this.#saleService.getEarningsByDimensions(
          formValue.fecha,
          formValue.cliente,
          formValue.tamaño_envase
        );
      case 'ventas-2':
        return this.#saleService.getBatchesByDimensions(
          formValue.fecha,
          formValue.tipo_cierre,
          formValue.tipo_boca,
          formValue.tipo_fondo
        );
      case 'compras-1':
        return this.#orderService.getAveragePriceByDimension(
          formValue.fecha,
          formValue.proveedor,
          formValue.tamaño_insumo
        );
      case 'compras-2':
        return this.#orderService.getOrdersByDimensions(
          formValue.fecha,
          formValue.proveedor,
          formValue.tamaño_insumo
        );
      case 'produccion-1':
        return this.#productionService.getContainerTypesByDimensions(
          formValue.fecha,
          formValue.cliente,
          formValue.insumo
        );
      default:
        throw new Error(`Query not found: ${query.id}`);
    }
  }
}
