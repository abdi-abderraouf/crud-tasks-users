import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [

  {
    path:'', component:LoginComponent,},
  {path:'dashboard',
  loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule)
  },
  {
    path:'auth',
  loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
