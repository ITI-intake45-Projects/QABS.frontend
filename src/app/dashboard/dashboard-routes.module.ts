import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './students/studentRegister/studentRegister.component';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { TeacherRegisterComponent } from './teachers/teacherRegister/teacherRegister.component';


const routes: Routes = [
  { path: 'students',  children: [
    { path: 'register-student', component: StudentRegisterComponent }
  ] },

  { path: 'teachers', children: [
    { path: 'register-teacher', component: TeacherRegisterComponent }
  ] },


  // {
  //   path: '',

  //   children: [
  //     { path: '', },
  //     { path: 'home', },
  //     { path: 'contact', },
  //     { path: 'news/:id', },
  //   ]
  // },
];


@NgModule({
  imports: [

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
