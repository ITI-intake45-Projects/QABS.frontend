import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { StudentRegisterComponent } from './students/studentRegister/studentRegister.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { TeacherRegisterComponent } from './teachers/teacherRegister/teacherRegister.component';
import { TeacherListComponent } from './teachers/teacherList/teacherList.component';
import { StudentListComponent } from './students/studentList/studentList.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutesModule,
    ReactiveFormsModule,
    FormsModule


  ],
  declarations: [
    StudentRegisterComponent,
    StudentListComponent,
    DashboardlayoutComponent,
    TeacherRegisterComponent,
    TeacherListComponent
  ],
  exports: [
    DashboardlayoutComponent
  ]
})
export class DashboardpagesModule { }
