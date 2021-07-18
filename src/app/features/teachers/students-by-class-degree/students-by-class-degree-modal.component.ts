import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentsService } from 'src/app/features/students/students.service';
import { Class, Degree, Student } from 'src/app/models';

@Component({
  selector: 'app-students-by-class-degree-modal',
  templateUrl: './students-by-class-degree-modal.component.html',
  styleUrls: ['./students-by-class-degree-modal.component.scss'],
})
export class StudentsByClassModalComponent implements OnInit {
  public studentsByClassAndDegree: Student[];

  constructor(
    private studentsService: StudentsService,
    public dialogRef: MatDialogRef<StudentsByClassModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { degree: Degree; class: Class }
  ) {}

  ngOnInit(): void {
    this.studentsService.getStudents().then((students) => {
      this.studentsByClassAndDegree = students.filter(
        (student) => student.class.id === this.data.class.id && student.degree.id === this.data.degree.id
      );
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
