import { Component, Input, OnInit } from '@angular/core';
import { Icons } from '../../shared/icons';
import { SidebarItem } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-coreLayout',
  templateUrl: './coreLayout.component.html',
  styleUrls: ['./coreLayout.component.css'],
  standalone: false
})
export class CoreLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  collapsed = false;

  sidebarItems: SidebarItem[] = [
    { label: 'لوحة التحكم', icon: Icons['dashboard'], route: '' },
    { label: 'المعلمين', icon: Icons['teachers'], route: '' , children: [
      { label: 'تسجيل معلم جديد+', route: '/teachers/register-teacher' },
      { label: 'Security', route: 'register-teacher' }
    ] },
    {
      label: 'الطلاب', icon: Icons['students'], route: '', children: [
        { label: 'تسجيل طالب جديد+', route: '/students/register-student' },
        { label: 'Security', route: 'register-student' }
      ]
    },
    { label: 'الاشتراكات', icon: Icons['enrollment'], route: '/users' },
  ];




}
