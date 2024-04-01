import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareersComponent } from './careers/careers.component';
import { CareerApplyComponent } from './career-apply/career-apply.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';

const routes: Routes = [
  {path:'', component:CareersComponent},
  {path:'a/:id', component:CareerApplyComponent},
  {path:'d/:id', component:CareerDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
