import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentsService } from 'src/app/features/students/students.service';
import { StudentsByClassModalComponent } from 'src/app/features/teachers/students-by-class-degree/students-by-class-degree-modal.component';
import { TeacherFormModalComponent } from 'src/app/features/teachers/teacher-form-modal/teacher-form-modal.component';
import { TeachersService } from 'src/app/features/teachers/teachers.service';
import { Filter } from 'src/app/models';
import { ClassDegreePosition } from 'src/app/models/class-degree-position';
import { TeacherPosition } from 'src/app/models/teacher-position';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import ClassesList from 'src/mock-data/classes.json';
import DegreesList from 'src/mock-data/degrees.json';
import MattersList from 'src/mock-data/matters.json';
import RelationshipsMock from 'src/mock-data/relationships.json';
import TeachersList from 'src/mock-data/teachers.json';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeachersListComponent implements OnInit {
  @ViewChild(MatTable) matTable: MatTable<TeacherPosition>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<TeacherPosition>;
  public readonly columns = ['teacherName', 'matterName', 'actions'];
  public expandedItem: TeacherPosition;
  public currentFilter: Filter;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private teachersService: TeachersService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getOriginalTeachersList().then((teachersItems) => {
      this.dataSource = new MatTableDataSource(teachersItems);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data, filter) => {
        if (this.currentFilter) {
          return (
            (!this.currentFilter.classId ||
              data.positions.some((item) => item.class.id === this.currentFilter.classId)) &&
            (!this.currentFilter.degreeId ||
              data.positions.some((item) => item.degree.id === this.currentFilter.degreeId))
          );
        }
        return true;
      };
    });
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
      this.dataSource.filter = 'filter';
    }
  }

  openStudentsListModal(item: ClassDegreePosition) {
    this.dialog.open(StudentsByClassModalComponent, { data: item.students, width: '600px' });
  }

  addItem() {
    const addModal = this.dialog.open(TeacherFormModalComponent, { width: '800px' });
    addModal.afterClosed().subscribe((newItem) => {
      if (newItem) {
        this.dataSource.data = [...this.dataSource.data, newItem];
        this.matTable.renderRows();
        this.snackBar.open('Nova definição de turmas adicionada!', 'Dispensar', { duration: 2000 });
      }
    });
  }

  openEditDialog($event, item: TeacherPosition, index) {
    $event.stopPropagation();
    const editModal = this.dialog.open(TeacherFormModalComponent, { data: item, width: '800px' });
    editModal.afterClosed().subscribe((editedItem) => {
      if (editedItem) {
        this.dataSource.data[index] = editedItem;
        this.matTable.renderRows();
        this.snackBar.open('Turma do professor editada com sucesso!', 'Dispensar', { duration: 2000 });
      }
    });
  }

  saveDefinitions() {
    this.teachersService.saveTeacherPositions(this.dataSource.data);
    this.snackBar.open('Alterações salvas com sucesso!', 'Dispensar', { duration: 2000 });
  }

  reset() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        this.dataSource.data = await this.getOriginalTeachersList();
      }
    });
  }

  private async getOriginalTeachersList(): Promise<TeacherPosition[]> {
    return new Promise<TeacherPosition[]>((resolve) => {
      this.studentsService.getStudents().then((originalStudents) => {
        resolve(
          RelationshipsMock.map((relationship) => {
            const positions = [];
            relationship.degrees.forEach((relationshipDegree) => {
              positions.push(
                ...relationshipDegree.classes.map((clazz) => {
                  const degreeFound = DegreesList.find((degree) => degree.id === relationshipDegree.degreeId);
                  const classFound = ClassesList.classes.find(
                    (classListItem) => classListItem.id === (clazz.classPosition || clazz.classId)
                  );
                  return {
                    degree: degreeFound,
                    class: classFound,
                    students: originalStudents.filter(
                      (student) => student.class.id === classFound.id && student.degree.id === degreeFound.id
                    ),
                  };
                })
              );
            });

            return {
              teacher: TeachersList.find((teacher) => teacher.id === relationship.teacherId),
              matter: MattersList.find((matter) => matter.id === relationship.matterId),
              positions,
            };
          })
        );
      });
    });
  }
}
