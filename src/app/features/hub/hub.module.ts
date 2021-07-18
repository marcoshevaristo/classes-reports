import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HubComponent } from './hub/hub.component';

const routes: Routes = [
  {
    path: '',
    component: HubComponent,
  },
];

@NgModule({
  declarations: [HubComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class HubModule {}
