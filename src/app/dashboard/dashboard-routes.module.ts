import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './students/studentRegister/studentRegister.component';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';
import { TeacherRegisterComponent } from './teachers/teacherRegister/teacherRegister.component';
import { TeacherListComponent } from './teachers/teacherList/teacherList.component';
import { CoreLayoutComponent } from '../core/coreLayout/coreLayout.component';
import { StudentListComponent } from './students/studentList/studentList.component';
import { StudentDetailsComponent } from './students/studentDetails/studentDetails.component';


// const routes: Routes = [
//   { path: 'students',  children: [
//     { path: 'register-student', component: StudentRegisterComponent }
//   ] },

//   { path: 'teachers', children: [
//     { path: 'register-teacher', component: TeacherRegisterComponent },
//     { path: 'list-teachers', component: TeacherListComponent }
//   ] },

const routes: Routes = [

  {
    path: 'dashboard', component: CoreLayoutComponent, children: [
      {
        path: 'students', children: [
          { path: 'register-student', component: StudentRegisterComponent },
          { path: 'list-students', component: StudentListComponent },
          { path: 'details/:id', component: StudentDetailsComponent }
        ]
      },

      {
        path: 'teachers', children: [
          { path: 'register-teacher', component: TeacherRegisterComponent },
          { path: 'list-teachers', component: TeacherListComponent }
        ]
      }

    ]
  },


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
