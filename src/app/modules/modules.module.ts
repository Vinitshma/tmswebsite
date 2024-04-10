import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { SpokenyComponent } from './products/spokeny/spokeny.component';
import { VaniganComponent } from './products/vanigan/vanigan.component';
import { TmsTaskyComponent } from './products/tms-tasky/tms-tasky.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactsComponent,
    SolutionsComponent,
    PrivacyComponent,
    TermsComponent,
    SpokenyComponent,
    VaniganComponent,
    TmsTaskyComponent
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
