import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { SolutionsComponent } from './solutions/solutions.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  { path: 'home', component:HomeComponent},
  { path: 'contact', component:ContactsComponent},
  { path: 'about', component:AboutComponent},
  { path: 'product', component:ProductsComponent},
  { path: 'solution', component:SolutionsComponent},
  { path: 'career', loadChildren: ()=> import('./career/career.module').then(m=>m.CareerModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
