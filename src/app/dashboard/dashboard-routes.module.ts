import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    
    children: [
      { path: '',   },
      { path: 'home',  },
      { path: 'contact',  },
      { path: 'news/:id',   },
    ]
  }
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
