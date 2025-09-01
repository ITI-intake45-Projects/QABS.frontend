import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { StudentRegisterComponent } from './students/studentRegister/studentRegister.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { TeacherRegisterComponent } from './teachers/teacherRegister/teacherRegister.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutesModule,
    ReactiveFormsModule,


  ],
  declarations: [
    StudentRegisterComponent,
    DashboardlayoutComponent,
    TeacherRegisterComponent
  ],
  exports: [
    DashboardlayoutComponent
  ]
})
export class DashboardpagesModule { }
