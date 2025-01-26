import { Cube } from '../interfaces/cube.interface';

export const CUBES_DATA: Cube[] = [
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
        dimensions: ['Tiempo', 'Cliente', 'Tamaño de Envase'],
      },
      {
        id: 'ventas-2',
        title: 'Cantidad de Lotes',
        description:
          'Cantidad de Lotes de Envases vendidos según cierre, boca y fondo recuperados por mes durante el último año.',
        dimensions: [
          'Tiempo',
          'Tipo de Cierre',
          'Tipo de Boca',
          'Tipo de Fondo',
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
        dimensions: ['Tiempo', 'Proveedor', 'Tamaño de Insumo'],
      },
      {
        id: 'compras-2',
        title: 'Insumos',
        description:
          'Insumos de órdenes de compra por proveedor y tamaño recuperados por día durante el último mes.',
        dimensions: ['Tiempo', 'Proveedor', 'Tamaño de Insumo'],
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
        dimensions: ['Tiempo', 'Cliente', 'Insumo'],
      },
    ],
  },
];
