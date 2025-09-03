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
      { label: 'تسجيل معلم جديد+', route: '/dashboard/teachers/register-teacher' },
      { label: 'قائمة المعلمين', route: '/dashboard/teachers/list-teachers' }
    ] },
    {
      label: 'الطلاب', icon: Icons['students'], route: '', children: [
        { label: 'تسجيل طالب جديد+', route: '/dashboard/students/register-student' },
        { label: 'قائمة الطلاب', route: '/dashboard/students/list-students' }
      ]
    },
    { label: 'الاشتراكات', icon: Icons['enrollment'], route: '/users' },
  ];




}
