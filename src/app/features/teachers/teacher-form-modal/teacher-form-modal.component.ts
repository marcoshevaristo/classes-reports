import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ClassDegreePositionEditModalComponent } from 'src/app/features/teachers/teacher-form-modal/class-degree-position-edit-modal/class-degree-position-edit-modal.component';
import { Class, Student } from 'src/app/models';
import { ClassDegreePosition } from 'src/app/models/class-degree-position';
import { Matter } from 'src/app/models/matter';
import { Teacher } from 'src/app/models/teacher';
import { TeacherPosition } from 'src/app/models/teacher-position';
import ClassesList from 'src/mock-data/classes.json';
import MattersList from 'src/mock-data/matters.json';
import TeachersList from 'src/mock-data/teachers.json';

@Component({
  selector: 'app-teacher-form-modal',
  templateUrl: './teacher-form-modal.component.html',
  styleUrls: ['./teacher-form-modal.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherFormModalComponent implements OnInit {
  public teacherPositionForm: FormGroup;
  public classesOptions: Class[] = ClassesList.classes;
  public teachersOptions: Teacher[] = TeachersList;
  public mattersOptions: Matter[] = MattersList;
  public positionsColumns = ['degreeName', 'className', 'actions'];
  public expandedPositionItem: ClassDegreePosition;
  public positionsDataSource: MatTableDataSource<ClassDegreePosition>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) matTable: MatTable<Student>;

  constructor(
    public dialogRef: MatDialogRef<TeacherFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeacherPosition,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.teacherPositionForm = this.fb.group({
      teacher: this.fb.control({ value: this.data?.teacher, disabled: !!this.data }, Validators.required),
      matter: this.fb.control({ value: this.data?.matter, disabled: !!this.data }, Validators.required),
      positions: this.fb.control(this.data?.positions),
    });
    this.positionsDataSource = new MatTableDataSource(this.data?.positions || []);
    this.positionsDataSource.paginator = this.paginator;
  }

  expandItem(item) {
    this.expandedPositionItem = this.expandedPositionItem === item ? null : item;
  }

  addPosition() {
    const editDialog = this.dialog.open(ClassDegreePositionEditModalComponent, { data: { students: [] } });
    editDialog.afterClosed().subscribe((newPosition) => {
      if (newPosition) {
        this.positionsDataSource.data.push(newPosition);
        this.matTable.renderRows();
        this.snackBar.open('Nova turma adicionada ao professor!', 'Dispensar', { duration: 2000 });
      }
    });
  }

  openEditDialog($event, item, index) {
    $event.stopPropagation();
    const editDialog = this.dialog.open(ClassDegreePositionEditModalComponent, { data: item });
    editDialog.afterClosed().subscribe((editedPosition) => {
      if (editedPosition) {
        this.positionsDataSource.data[index] = editedPosition;
        this.matTable.renderRows();
        this.snackBar.open('Dados da turma atualizados com sucesso!', 'Dispensar', { duration: 2000 });
      }
    });
  }

  confirm(): void {
    this.teacherPositionForm.markAllAsTouched();
    if (this.teacherPositionForm.valid) {
      this.closeModal({ ...this.teacherPositionForm.getRawValue(), positions: this.positionsDataSource.data });
    }
  }

  closeModal(editedStudent?: Student): void {
    this.dialogRef.close(editedStudent);
  }
}
