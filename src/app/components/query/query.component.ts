import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
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
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap } from 'rxjs';
import { QueryService } from '../../services/query.service';
import { MatToolbar } from '@angular/material/toolbar';
import { Query } from '../../interfaces/query.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ServiceFactory } from '../../factory/service.factory';
import { DtoInterface } from '../../dtos/dto.interface';
import { QueryFactory } from '../../factory/query.factory';
import { QueryResponse } from '../../interfaces/query-response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatToolbar,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class QueryComponent {
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #fb: FormBuilder = inject(FormBuilder);
  #location: Location = inject(Location);
  #dialog: MatDialog = inject(MatDialog);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #serviceFactory: ServiceFactory = inject(ServiceFactory);
  #queryFactory: QueryFactory = inject(QueryFactory);
  #queryService: QueryService = inject(QueryService);

  formGroup: WritableSignal<FormGroup> = signal(this.#fb.group({}));
  query: WritableSignal<Query> = signal({} as Query);
  options: WritableSignal<Record<string, DtoInterface[]>> = signal({});

  constructor() {
    effect(() => {
      this.#activatedRoute.params
        .pipe(
          switchMap((params) => this.#queryService.getQueryById(params['id']))
        )
        .subscribe({
          next: (query) => {
            if (query) {
              this.query.set(query);
              this.loadControlsFromQuery(query);
            }
          },
          error: (error) => console.error(error),
        });
    });
  }

  private loadControlsFromQuery(query: Query): void {
    const formControls = query.dimensions.reduce((controls, dimension) => {
      controls[dimension.bodyName] = ['', Validators.required];
      return controls;
    }, {} as { [key: string]: any });

    this.formGroup.set(this.#fb.group(formControls));
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
            this.options.set({ ...this.options(), ...newOptions });
          },
          error: (error) => console.error(error),
        });
    });
  }

  getOptions(bodyName: string): DtoInterface[] {
    return this.options()[bodyName] || [];
  }

  onSubmit(): void {
    const form = this.formGroup();
    if (!form) return;
    this.#queryFactory
      .getQuery(this.query(), form.value)
      .pipe(
        catchError((exception) => {
          this.#snackBar.open(exception.error.message, 'Cerrar', {
            duration: 2000,
          });
          return [];
        })
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.#dialog
            .open(DialogDataExampleDialog, { data: value })
            .afterClosed()
            .subscribe((value) => value && this.onGoBack());
        },
      });
  }

  onGoBack(): void {
    this.#location.back();
  }
}

@Component({
  selector: 'query-dialog',
  templateUrl: 'query-dialog.component.html',
  styleUrl: 'query-dialog.component.css',
  imports: [
    MatDialogContent,
    MatToolbar,
    MatIconModule,
    MatDialogActions,
    MatDivider,
    MatButton,
  ],
})
export class DialogDataExampleDialog {
  data: QueryResponse = inject(MAT_DIALOG_DATA);
  dialogRef: MatDialogRef<DialogDataExampleDialog> = inject(MatDialogRef);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
