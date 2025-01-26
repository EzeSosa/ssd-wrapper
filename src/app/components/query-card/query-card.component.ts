import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'query-card',
  templateUrl: 'query-card.component.html',
  styleUrl: 'query-card.component.css',
  imports: [MatCardModule, MatIconModule],
})
export class QueryCardComponent {
  @Input() title: string = 'Query Card';
  @Input() description: string = 'Query Card Description';
  @Input() icon: string = 'info';

  hoverCard: boolean = false;
  hoverButton: boolean = false;
}
