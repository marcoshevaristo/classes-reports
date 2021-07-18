import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'hub',
    loadChildren: () => import('./hub/hub.module').then((m) => m.HubModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then((m) => m.TeachersModule),
  },
];
@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class FeaturesModule {}
