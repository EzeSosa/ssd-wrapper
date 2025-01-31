import { signal, WritableSignal } from '@angular/core';
import { Cube } from '../interfaces/cube.interface';

export const CUBES_DATA: WritableSignal<Cube[]> = signal([
  {
    id: 'ventas',
    title: 'Ventas',
    description:
      'Consultas relacionadas a las ventas de lotes de envases personalizados.',
    icon: 'sell',
    queries: [
      {
        id: 'ventas-1',
        title: 'Ganancias',
        description:
          'Ganancias de Ventas por cliente y tamaño de envase recuperadas por mes durante el último año.',
        dimensions: [
          {
            name: 'Tiempo',
            type: 'date',
            bodyName: 'fecha',
          },
          {
            name: 'Cliente',
            type: 'selector',
            bodyName: 'cliente',
          },
          {
            name: 'Tamaño de Envase',
            type: 'selector',
            bodyName: 'tamaño_envase',
          },
        ],
      },
      {
        id: 'ventas-2',
        title: 'Cantidad de Lotes',
        description:
          'Cantidad de Lotes de Envases vendidos según cierre, boca y fondo recuperados por mes durante el último año.',
        dimensions: [
          {
            name: 'Tiempo',
            type: 'date',
            bodyName: 'fecha',
          },
          {
            name: 'Tipo de Cierre',
            type: 'selector',
            bodyName: 'tipo_cierre',
          },
          {
            name: 'Tipo de Boca',
            type: 'selector',
            bodyName: 'tipo_boca',
          },
          {
            name: 'Tipo de Fondo',
            type: 'selector',
            bodyName: 'tipo_fondo',
          },
        ],
      },
    ],
  },
  {
    id: 'compras',
    title: 'Órdenes de Compra',
    description:
      'Consultas relacionadas a las compras de insumos para la fabricación de envases.',
    icon: 'shopping_cart',
    queries: [
      {
        id: 'compras-1',
        title: 'Precio Promedio',
        description:
          'Precio promedio de órdenes de compra por proveedor y tamaño de insumo recuperados por mes realizadas durante el último año.',
        dimensions: [
          {
            name: 'Tiempo',
            type: 'date',
            bodyName: 'fecha',
          },
          {
            name: 'Proveedor',
            type: 'selector',
            bodyName: 'proveedor',
          },
          {
            name: 'Tamaño de Insumo',
            type: 'selector',
            bodyName: 'tamaño_insumo',
          },
        ],
      },
      {
        id: 'compras-2',
        title: 'Insumos',
        description:
          'Insumos de órdenes de compra por proveedor y tamaño recuperados por día durante el último mes.',
        dimensions: [
          {
            name: 'Tiempo',
            type: 'date',
            bodyName: 'fecha',
          },
          {
            name: 'Proveedor',
            type: 'selector',
            bodyName: 'proveedor',
          },
          {
            name: 'Tamaño de Insumo',
            type: 'selector',
            bodyName: 'tamaño_insumo',
          },
        ],
      },
    ],
  },
  {
    id: 'produccion',
    title: 'Órdenes de Producción',
    description:
      'Consultas relacionadas a la producción de lotes de envases personalizados.',
    icon: 'build',
    queries: [
      {
        id: 'produccion-1',
        title: 'Tipos de Envases',
        description:
          'Tipos de envases producidos según cliente e insumo recuperados por día durante el último mes.',
        dimensions: [
          {
            name: 'Tiempo',
            type: 'date',
            bodyName: 'fecha',
          },
          {
            name: 'Cliente',
            type: 'selector',
            bodyName: 'cliente',
          },
          {
            name: 'Insumo',
            type: 'selector',
            bodyName: 'insumo',
          },
        ],
      },
    ],
  },
]);
