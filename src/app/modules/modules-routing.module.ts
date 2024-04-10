import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { SpokenyComponent } from './products/spokeny/spokeny.component';
import { VaniganComponent } from './products/vanigan/vanigan.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  { path: 'home', component:HomeComponent},
  { path: 'contact', component:ContactsComponent},
  { path: 'about', component:AboutComponent},
  { path: 'solution', component:SolutionsComponent},
  { path: 'career', loadChildren: ()=> import('./career/career.module').then(m=>m.CareerModule)},
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
