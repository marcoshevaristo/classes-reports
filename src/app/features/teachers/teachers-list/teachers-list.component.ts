import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StudentsByClassModalComponent } from 'src/app/features/teachers/students-by-class-degree/students-by-class-degree-modal.component';
import { Filter } from 'src/app/models';
import { TeacherPosition } from 'src/app/models/teacher-position';
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
export class TeachersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) matTable: MatTable<TeacherPosition>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<TeacherPosition>;
  public readonly columns = ['teacherName', 'matterName'];
  public expandedItem: TeacherPosition;
  private currentFilter: Filter;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.getOriginalTeachersList());
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
  }

  openStudentsListModal(item: TeacherPosition) {
    this.dialog.open(StudentsByClassModalComponent, { data: item, width: '600px' });
  }

  private getOriginalTeachersList(): TeacherPosition[] {
    return RelationshipsMock.map((relationship) => {
      const positions = [];
      relationship.degrees.forEach((relationshipDegree) => {
        positions.push(
          ...relationshipDegree.classes.map((clazz) => {
            return {
              degree: DegreesList.find((degree) => degree.id === relationshipDegree.degreeId),
              class: ClassesList.classes.find(
                (classListItem) => classListItem.id === (clazz.classPosition || clazz.classId)
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
    });
  }
}
