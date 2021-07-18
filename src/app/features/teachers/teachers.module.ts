import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsByClassModalComponent } from 'src/app/features/teachers/students-by-class-degree/students-by-class-degree-modal.component';
import { TeacherFormModalComponent } from 'src/app/features/teachers/teacher-form-modal/teacher-form-modal.component';
import { FilterPipe } from 'src/app/features/teachers/teachers-list/filter.pipe';
import { TeachersListComponent } from 'src/app/features/teachers/teachers-list/teachers-list.component';
import { TeachersService } from 'src/app/features/teachers/teachers.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassDegreePositionEditModalComponent } from './teacher-form-modal/class-degree-position-edit-modal/class-degree-position-edit-modal.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersListComponent,
  },
];

@NgModule({
  declarations: [
    TeachersListComponent,
    StudentsByClassModalComponent,
    TeacherFormModalComponent,
    ClassDegreePositionEditModalComponent,
    FilterPipe,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [TeachersService],
})
export class TeachersModule {}
