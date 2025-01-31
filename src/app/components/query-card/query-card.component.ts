import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Dimension } from '../../interfaces/dimension.interface';

@Component({
  standalone: true,
  selector: 'query-card',
  templateUrl: 'query-card.component.html',
  styleUrl: 'query-card.component.css',
  imports: [MatCardModule, MatIconModule, MatChipsModule, MatButtonModule],
})
export class QueryCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() path!: string;
  @Input() dimensions!: Dimension[];

  #router: Router = inject(Router);

  hoverCard: WritableSignal<boolean> = signal(false);
  hoverButton: WritableSignal<boolean> = signal(false);

  onQuery(): void {
    this.#router.navigate(['/queries', this.path]);
  }
}
