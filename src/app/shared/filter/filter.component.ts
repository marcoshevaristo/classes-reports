import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Class, Degree } from 'src/app/models';
import { filterItems } from 'src/app/shared/utils/list.util';
import ClassesList from 'src/mock-data/classes.json';
import DegreesList from 'src/mock-data/degrees.json';

@Component({
  selector: 'app-filter',
  template: `
    <div class="filter-container">
      <button mat-raised-button class="filter-button" [color]="filterButtonColor" (click)="toggleFilter()">
        <mat-icon class="icon-button">filter_list</mat-icon>
      </button>
      <ng-container *ngIf="filterOpened">
        <mat-form-field appearance="outline" class="input-field">
          <mat-label>Grau</mat-label>
          <input
            type="text"
            placeholder="Filtrar grau"
            matInput
            [formControl]="filter.get('degreeFilter')"
            [matAutocomplete]="degreeFilter"
            (blur)="checkDegreesValid()"
          />
        </mat-form-field>
        <mat-form-field appearance="outline" class="input-field">
          <mat-label>Classe</mat-label>
          <mat-select [formControl]="filter.get('classFilter')">
            <mat-option> Vazio </mat-option>
            <mat-option *ngFor="let class of classes" [value]="class">
              {{ class.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="onFilter.emit(filter.value)">Filtrar</button>
      </ng-container>
      <mat-autocomplete #degreeFilter="matAutocomplete" [displayWith]="displayWith">
        <mat-option *ngFor="let degree of degreesFiltered" [value]="degree">
          {{ degree.name }}
        </mat-option>
      </mat-autocomplete>
    </div>
  `,
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  public filter: FormGroup;
  public degrees: Degree[] = DegreesList;
  public classes: Class[] = ClassesList.classes;
  public degreesFiltered: Degree[] = [];
  public filterOpened = false;

  private subscription: Subscription = new Subscription();

  @Output()
  public onFilter: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filter = this.fb.group({ classFilter: undefined, degreeFilter: undefined });
    this.addSubscriptions();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleFilter() {
    this.filterOpened = !this.filterOpened;
    this.filter.reset();
    if (!this.filterOpened) {
      this.onFilter.emit();
    }
  }

  displayWith(item) {
    return item?.name;
  }

  checkDegreesValid() {
    if (typeof this.filter.get('degreeFilter').value === 'string') {
      this.filter.get('degreeFilter').reset();
    }
  }

  get filterButtonColor(): string {
    return this.filterOpened ? 'primary' : '';
  }

  private addSubscriptions() {
    this.subscription.add(
      this.filter
        .get('degreeFilter')
        .valueChanges.pipe(map((value) => (value ? filterItems(value, this.degrees) : this.degrees)))
        .subscribe((filteredDegrees) => {
          this.degreesFiltered = filteredDegrees;
        })
    );
  }
}
