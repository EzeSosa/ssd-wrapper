import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { QueryCardComponent } from '../../components/query-card/query-card.component';

@Component({
  selector: 'app-card-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    QueryCardComponent,
  ],
  templateUrl: './query-layout.component.html',
  styleUrl: './query-layout.component.css',
})
export class QueryLayoutComponent {
  cards = [
    {
      title: 'Ventas',
      description:
        'Consultas relacionadas a las ventas de lotes de envases personalizados.',
      icon: 'sell',
    },
    {
      title: 'Órdenes de Compra',
      description:
        'Consultas relacionadas a las compras de insumos para la fabricación de envases.',
      icon: 'shopping_cart',
    },
    {
      title: 'Órdenes de Producción',
      description:
        'Consultas relacionadas a la producción de lotes de envases personalizados.',
      icon: 'build',
    },
  ];
}
