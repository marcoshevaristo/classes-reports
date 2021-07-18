import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentsService } from 'src/app/features/students/students.service';
import { Class, Degree, Student } from 'src/app/models';
import { ClassDegreePosition } from 'src/app/models/class-degree-position';
import { filterItems } from 'src/app/shared/utils/list.util';
import ClassesList from 'src/mock-data/classes.json';
import DegreesList from 'src/mock-data/degrees.json';

@Component({
  selector: 'app-class-degree-position-edit-modal',
  templateUrl: './class-degree-position-edit-modal.component.html',
  styleUrls: ['./class-degree-position-edit-modal.component.scss'],
})
export class ClassDegreePositionEditModalComponent implements OnInit, OnDestroy {
  public classDegreePositionForm: FormGroup;
  public classesOptions: Class[] = ClassesList.classes;
  public degreesOptions: Degree[] = DegreesList;
  public studentsOptions: Student[] = [];
  public addStudentControl: FormControl;
  public studentsFiltered: Student[] = [];
  private subscription: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ClassDegreePositionEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDegreePosition,
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.classDegreePositionForm = this.fb.group({
      degree: this.fb.control({ value: this.data?.degree, disabled: !!this.data?.degree }, Validators.required),
      class: this.fb.control({ value: this.data?.class, disabled: !!this.data?.class }, Validators.required),
      students: this.fb.control(this.data?.students),
    });
    this.addStudentControl = new FormControl();
    this.studentsService.getStudents().then((students) => {
      this.studentsOptions = students;
    });
    this.addSubscriptions();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirm(): void {
    this.classDegreePositionForm.markAllAsTouched();
    if (this.classDegreePositionForm.valid) {
      this.closeModal(this.classDegreePositionForm.getRawValue());
    }
  }

  closeModal(editedPosition?: ClassDegreePosition): void {
    this.dialogRef.close(editedPosition);
  }

  displayWith(item) {
    return item?.name;
  }

  addStudent() {
    this.addStudentControl.markAsTouched();
    if (this.addStudentControl.valid) {
      if (
        this.classDegreePositionForm.get('students').value.find((item) => item.id === this.addStudentControl.value.id)
      ) {
        this.snackBar.open('Estudante já existe na lista', 'Dispensar', { duration: 1000 });
        return;
      }
      this.classDegreePositionForm
        .get('students')
        .setValue([...this.classDegreePositionForm.get('students').value, this.addStudentControl.value]);
      this.addStudentControl.reset();
    }
  }

  checkStudentValid() {
    if (typeof this.addStudentControl.value === 'string') {
      this.addStudentControl.reset();
    }
  }

  isAddStudentValid() {
    return this.addStudentControl.value && typeof this.addStudentControl.value !== 'string';
  }

  private addSubscriptions() {
    this.subscription.add(
      this.addStudentControl.valueChanges
        .pipe(map((value) => (value ? filterItems(value, this.studentsOptions) : this.studentsOptions)))
        .subscribe((filteredStudents) => {
          this.studentsFiltered = filteredStudents;
        })
    );
  }
}
