import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { SolutionsComponent } from './modules/solutions/solutions.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { TermsComponent } from './modules/terms/terms.component';
import { SpokenyComponent } from './modules/products/spokeny/spokeny.component';
import { VaniganComponent } from './modules/products/vanigan/vanigan.component';
import { TmsTaskyComponent } from './modules/products/tms-tasky/tms-tasky.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
