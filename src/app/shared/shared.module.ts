import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FilterComponent } from './filter/filter.component';
import { StudentsTableComponent } from './students-table/students-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  exports: [
    FilterComponent,
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    StudentsTableComponent,
  ],
  declarations: [FilterComponent, ConfirmationModalComponent, StudentsTableComponent],
})
export class SharedModule {}
