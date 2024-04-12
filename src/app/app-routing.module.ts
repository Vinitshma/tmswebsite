import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { AboutComponent } from './modules/about/about.component';
import { SolutionsComponent } from './modules/solutions/solutions.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { TermsComponent } from './modules/terms/terms.component';
import { SpokenyComponent } from './modules/products/spokeny/spokeny.component';
import { VaniganComponent } from './modules/products/vanigan/vanigan.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  { path: 'home', component:HomeComponent},
  { path: 'contact', component:ContactsComponent},
  { path: 'about', component:AboutComponent},
  { path: 'solution', component:SolutionsComponent},
  { path: 'career', loadChildren: ()=> import('./modules/career/career.module').then(m=>m.CareerModule)},
  { path: 'privacy', component:PrivacyComponent},
  { path: 'terms', component:TermsComponent},
  { path:'pd', 
    children:[
      {path:'', pathMatch:'full', redirectTo:'spokeny'},
      {path:'spokeny', component:SpokenyComponent},
      {path:'vanigan', component:VaniganComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
