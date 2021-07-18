import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentEditModalComponent } from 'src/app/features/students/student-edit-modal/student-edit-modal.component';
import { StudentsChartModalComponent } from 'src/app/features/students/students-chart-modal/students-chart-modal.component';
import { StudentsService } from 'src/app/features/students/students.service';
import { Filter, Student } from 'src/app/models';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { STUDENTS_ADD_AMOUNT } from 'src/app/shared/constants';
import ClassesList from 'src/mock-data/classes.json';
import DegreesList from 'src/mock-data/degrees.json';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) matTable: MatTable<Student>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<Student>;
  public readonly columns = ['name', 'class', 'degree', 'actions'];
  public displayedColumns = this.columns;
  private _inputList: Student[];
  @Input()
  public set inputList(students: Student[]) {
    this._inputList = students;
    if (students) {
      this.dataSource.data = students;
    }
  }

  public get inputList(): Student[] {
    return this._inputList;
  }
  @Input()
  public hideControls: boolean;

  private currentFilter: Filter;
  private lastAddedStudentIndex = 1;
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    if (this.inputList) {
      this.dataSource.data = this.inputList;
    } else {
      this.studentsService.getOriginalStudentsList().then((students) => {
        this.dataSource.data = students;
      });
    }
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.currentFilter) {
        return (
          (!this.currentFilter.classId || this.currentFilter.classId === data.class.id) &&
          (!this.currentFilter.degreeId || this.currentFilter.degreeId === data.degree.id)
        );
      }
      return true;
    };
    if (this.hideControls) {
      this.displayedColumns = this.displayedColumns.filter((col) => col !== 'actions');
    }
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
    this.studentsService.saveStudents(this.dataSource.data);
    this.snackBar.open('Alterações salvas com sucesso!', 'Dispensar', { duration: 2000 });
  }

  reset() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.studentsService.getOriginalStudentsList().then((students) => {
          this.dataSource.data = students;
        });
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
}
