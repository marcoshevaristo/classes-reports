import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Class, Student } from 'src/app/models';
import ClassesList from 'src/mock-data/classes.json';

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.scss'],
})
export class StudentEditModalComponent implements OnInit {
  public studentForm: FormGroup;
  public classesOptions: Class[] = ClassesList.classes;
  constructor(
    public dialogRef: MatDialogRef<StudentEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      ...this.data,
      name: this.fb.control(this.data.name, Validators.required),
      class: this.fb.control(this.data.class?.id, Validators.required),
    });
  }

  confirm(): void {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      formValue.class = this.classesOptions.find((item) => item.id === formValue.class);
      this.closeModal(formValue);
    }
  }

  closeModal(editedStudent?: Student): void {
    this.dialogRef.close(editedStudent);
  }
}
