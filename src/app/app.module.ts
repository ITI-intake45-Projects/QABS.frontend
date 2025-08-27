import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';




@NgModule({

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SharedModule,
    // FontAwesomeModule,
  ],
  declarations: [
    AppComponent
  ] ,
  bootstrap: [AppComponent],
})
export class AppModule { }
