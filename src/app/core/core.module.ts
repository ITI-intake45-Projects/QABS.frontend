import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardpagesModule } from '../dashboard/dashboardpages.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { CoreLayoutComponent } from './coreLayout/coreLayout.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(),
    BrowserModule,
    DashboardpagesModule,
    SharedModule,
    DashboardRoutesModule
],
  declarations: [
    CoreLayoutComponent

  ],
  exports: [ CoreLayoutComponent ]
})
export class CoreModule { }
