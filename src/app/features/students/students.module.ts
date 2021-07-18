import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsChartModalComponent } from 'src/app/features/students/students-chart-modal/students-chart-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentEditModalComponent } from './student-edit-modal/student-edit-modal.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent,
  },
];

@NgModule({
  declarations: [StudentsListComponent, StudentEditModalComponent, StudentsChartModalComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class StudentsModule {}
