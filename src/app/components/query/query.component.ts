import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { QueryService } from '../../services/query.service';
import { MatToolbar } from '@angular/material/toolbar';
import { Query } from '../../interfaces/query.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ServiceFactory } from '../../factory/service.factory';
import { DtoInterface } from '../../dtos/dto.interface';

@Component({
  standalone: true,
  selector: 'query',
  templateUrl: './query.component.html',
  styleUrl: './query.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbar,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class QueryComponent implements OnInit {
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #queryService: QueryService = inject(QueryService);
  #fb: FormBuilder = inject(FormBuilder);
  #location: Location = inject(Location);
  #serviceFactory: ServiceFactory = inject(ServiceFactory);

  formGroup!: FormGroup;
  query!: Query;
  options: { [key: string]: DtoInterface[] } = {};

  ngOnInit(): void {
    this.loadQuery();
  }

  private loadQuery(): void {
    this.#activatedRoute.params
      .pipe(
        switchMap((params) => this.#queryService.getQueryById(params['id']))
      )
      .subscribe({
        next: (query) => {
          if (!query) return;
          this.loadControlsFromQuery(query);
        },
        error: (error) => console.error(error),
      });
  }

  private loadControlsFromQuery(query: Query): void {
    this.query = query;

    const formControls = this.query.dimensions.reduce((controls, dimension) => {
      controls[dimension.bodyName] = ['', Validators.required];
      return controls;
    }, {} as { [key: string]: any });

    this.formGroup = this.#fb.group(formControls);
    this.loadOptions(query);
  }

  private loadOptions(query: Query): void {
    const newOptions: { [key: string]: DtoInterface[] } = {};

    query.dimensions.forEach((dimension) => {
      if (dimension.bodyName === 'fecha') return;
      this.#serviceFactory
        .createService<DtoInterface>(dimension.bodyName)
        .getAll()
        .subscribe({
          next: (dtos) => {
            newOptions[dimension.bodyName] = dtos;
            this.options = { ...this.options, ...newOptions };
          },
          error: (error) => console.error(error),
        });
    });
  }

  getOptions(bodyName: string): DtoInterface[] {
    return this.options[bodyName] || [];
  }

  onSubmit(): void {
    console.log('Formulario enviado:', this.formGroup.value);
  }

  onGoBack(): void {
    this.#location.back();
  }
}
