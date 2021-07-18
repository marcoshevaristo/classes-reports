import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/features/students/students.service';
import { Student } from 'src/app/models';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  public studentsList: Student[];

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getStudents().then((students) => {
      this.studentsList = students;
    });
  }
}
