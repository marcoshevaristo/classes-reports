import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsByClassModalComponent } from 'src/app/features/teachers/students-by-class-degree/students-by-class-degree-modal.component';
import { TeachersListComponent } from 'src/app/features/teachers/teachers-list/teachers-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TeachersListComponent,
  },
];

@NgModule({
  declarations: [TeachersListComponent, StudentsByClassModalComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class TeachersModule {}
