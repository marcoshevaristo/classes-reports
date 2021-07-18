import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models';

@Component({
  selector: 'app-students-by-class-degree-modal',
  templateUrl: './students-by-class-degree-modal.component.html',
  styleUrls: ['./students-by-class-degree-modal.component.scss'],
})
export class StudentsByClassModalComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentsByClassModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student[]
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
