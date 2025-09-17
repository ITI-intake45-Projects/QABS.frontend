import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { StudentRegisterComponent } from './students/studentRegister/studentRegister.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherRegisterComponent } from './teachers/teacherRegister/teacherRegister.component';
import { TeacherListComponent } from './teachers/teacherList/teacherList.component';
import { StudentListComponent } from './students/studentList/studentList.component';
import { EnrollmentCreateComponent } from './enrollments/enrollmentCreate/enrollmentCreate.component';
import { EnrollmentListComponent } from './enrollments/enrollmentList/enrollmentList.component';
import { FilterPipe } from '../shared/Pipes/filter.pipe';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LOCALE_ID } from '@angular/core';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { EnrollmentDetailsComponent } from './enrollments/enrollmentDetails/enrollmentDetails.component';
import { SessionsDetailsComponent } from './sessions/sessionsDetails/sessionsDetails.component';
import { StudentDetailsComponent } from './students/studentDetails/studentDetails.component';
import { DashboardAnalysisComponent } from './dashboard/DashboardAnalysis/DashboardAnalysis.component';
import { NgApexchartsModule } from "ng-apexcharts";





registerLocaleData(localeAr);

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutesModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipe,
    NgxMaterialTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgApexchartsModule




  ],
  declarations: [
    StudentRegisterComponent,
    StudentListComponent,
    StudentDetailsComponent,
    TeacherRegisterComponent,
    TeacherListComponent,
    EnrollmentCreateComponent,
    EnrollmentListComponent,
    EnrollmentDetailsComponent,
    SessionsDetailsComponent,
    DashboardAnalysisComponent
  ],
  exports: [

  ],
    providers: [
    // { provide: NGX_MAT_TIMEPICKER_LOCALE, useValue: 'ar-EG' }
        { provide: LOCALE_ID, useValue: 'ar-EG' },
        DatePipe

  ]
})
export class DashboardpagesModule { }
