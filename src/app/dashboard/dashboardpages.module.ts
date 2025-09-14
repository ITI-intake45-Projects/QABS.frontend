import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { StudentRegisterComponent } from './students/studentRegister/studentRegister.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardlayoutComponent } from './dashboardlayout/dashboardlayout.component';
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
    MatButtonModule



  ],
  declarations: [
    StudentRegisterComponent,
    StudentListComponent,
    DashboardlayoutComponent,
    TeacherRegisterComponent,
    TeacherListComponent,
    EnrollmentCreateComponent,
    EnrollmentListComponent,
    EnrollmentDetailsComponent,
    SessionsDetailsComponent
  ],
  exports: [
    DashboardlayoutComponent
  ],
    providers: [
    // { provide: NGX_MAT_TIMEPICKER_LOCALE, useValue: 'ar-EG' }
        { provide: LOCALE_ID, useValue: 'ar-EG' }

  ]
})
export class DashboardpagesModule { }
