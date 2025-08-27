import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    SidebarComponent
  ]
  , exports: [
    LoginComponent,
    RegisterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
