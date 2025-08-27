import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/Account/login/login.component';
import { RegisterComponent } from './shared/Account/register/register.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [


  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', loadChildren: () => import('./dashboard/dashboardpages.module').then(m => m.DashboardpagesModule) },



];


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ApproutesModule { }

