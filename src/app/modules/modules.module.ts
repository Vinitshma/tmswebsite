import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProductsComponent } from './products/products.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    ProductsComponent,
    SolutionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModulesRoutingModule,
    NgxCaptchaModule,
    HttpClientModule,
  ]
})
export class ModulesModule { }
