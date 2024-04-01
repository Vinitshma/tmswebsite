import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareersComponent } from './careers/careers.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { CareerApplyComponent } from './career-apply/career-apply.component';
import { ApisService } from '../services/apis.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CareersComponent,
    CareerDetailComponent,
    CareerApplyComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[
    ApisService
  ]
})
export class CareerModule { }
