import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegisterComponent } from './students/studentRegister/studentRegister.component';
import { TeacherRegisterComponent } from './teachers/teacherRegister/teacherRegister.component';
import { TeacherListComponent } from './teachers/teacherList/teacherList.component';
import { CoreLayoutComponent } from '../core/coreLayout/coreLayout.component';
import { StudentListComponent } from './students/studentList/studentList.component';
import { StudentDetailsComponent } from './students/studentDetails/studentDetails.component';
import { EnrollmentCreateComponent } from './enrollments/enrollmentCreate/enrollmentCreate.component';
import { EnrollmentListComponent } from './enrollments/enrollmentList/enrollmentList.component';
import { EnrollmentDetailsComponent } from './enrollments/enrollmentDetails/enrollmentDetails.component';
import { SessionsDetailsComponent } from './sessions/sessionsDetails/sessionsDetails.component';
import { DashboardAnalysisComponent } from './dashboard/DashboardAnalysis/DashboardAnalysis.component';
import { AdminGuard } from '../core/guards/admin-guard';


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
    path: 'dashboard', canActivate: [AdminGuard], component: CoreLayoutComponent, children: [
      {
        path: '', component: DashboardAnalysisComponent
      },
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
      },
      {
        path: 'enrollments', children: [
          { path: 'create', component: EnrollmentCreateComponent },
          { path: 'list', component: EnrollmentListComponent },
          {path: 'details/:id' , component: EnrollmentDetailsComponent}
        ]
      },
      {
          path: 'sessions', children: [
          { path: 'details', component: SessionsDetailsComponent },

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
