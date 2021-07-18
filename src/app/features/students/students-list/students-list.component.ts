import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentEditModalComponent } from 'src/app/features/students/student-edit-modal/student-edit-modal.component';
import { StudentsChartModalComponent } from 'src/app/features/students/students-chart-modal/students-chart-modal.component';
import { Filter, Student } from 'src/app/models';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { STUDENTS_ADD_AMOUNT } from 'src/app/shared/constants';
import { FileUtil } from 'src/app/shared/utils/file.util';
import ClassesList from 'src/mock-data/classes.json';
import DegreesList from 'src/mock-data/degrees.json';
import StudentsMock from 'src/mock-data/students.json';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) matTable: MatTable<Student>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Student>;
  public readonly columns = ['name', 'class', 'degree', 'actions'];

  private currentFilter: Filter;
  private lastAddedStudentIndex = 1;
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getOriginalStudentsList());
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.currentFilter) {
        return (
          (!this.currentFilter.classId || this.currentFilter.classId === data.class.id) &&
          (!this.currentFilter.degreeId || this.currentFilter.degreeId === data.degree.id)
        );
      }
      return true;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onFilter($event) {
    if (!$event) {
      this.currentFilter = null;
    } else {
      const { classFilter, degreeFilter } = $event;
      if (!classFilter && !degreeFilter) {
        this.currentFilter = null;
      } else {
        this.currentFilter = { classId: classFilter?.id, degreeId: degreeFilter?.id };
      }
    }
    this.dataSource.filter = 'filter';
  }

  openEditDialog(student) {
    const dialogRef = this.dialog.open(StudentEditModalComponent, { data: student });
    dialogRef.afterClosed().subscribe((editedStudent) => {
      if (editedStudent) {
        this.dataSource.data[this.dataSource.data.findIndex((item) => item.id === editedStudent.id)] = editedStudent;
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  saveStudents() {
    FileUtil.saveJsonFile(JSON.stringify(this.dataSource.data), `students-${new Date().toLocaleString()}.json`);
    this.snackBar.open('Alterações salvas com sucesso!', 'Dispensar', { duration: 2000 });
  }

  reset() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.dataSource.data = this.getOriginalStudentsList();
      }
    });
  }

  generateRandomStudents() {
    const newData = [];
    for (let i = 1; i <= STUDENTS_ADD_AMOUNT; i++) {
      newData.push({
        id: Number(`1000${this.lastAddedStudentIndex}`),
        name: `Novo aluno ${this.lastAddedStudentIndex}`,
        class: ClassesList.classes[Math.floor(Math.random() * ClassesList.classes.length)],
        degree: DegreesList[Math.floor(Math.random() * DegreesList.length)],
      });
      this.lastAddedStudentIndex++;
    }
    this.dataSource.data = this.dataSource.data.concat(newData);
  }

  openChartModal() {
    this.dialog.open(StudentsChartModalComponent, { data: this.dataSource.data, width: '900px' });
  }

  private getOriginalStudentsList(): Student[] {
    return StudentsMock.map((student) => {
      return {
        id: student.id,
        name: student.name,
        class: ClassesList.classes.find((clazz) => clazz.id === student.classId),
        degree: DegreesList.find((degree) => degree.id === student.degreeId),
      };
    });
  }
}
