import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/Account/login/login.component';
import { RegisterComponent } from './shared/Account/register/register.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardAnalysisComponent } from './dashboard/dashboard/DashboardAnalysis/DashboardAnalysis.component';
import { AdminGuard } from './core/guards/admin-guard';

export const routes: Routes = [


  { path: 'register', component: RegisterComponent },

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'dashboardd', component: DashboardAnalysisComponent },
  // { path: 'sidebar', component: SidebarComponent },

  { path: '', canActivate: [AdminGuard], loadChildren: () => import('./dashboard/dashboard-routes.module').then(m => m.DashboardRoutesModule) },



];


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ApproutesModule { }

