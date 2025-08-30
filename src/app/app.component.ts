import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarItem } from './shared/sidebar/sidebar.component';
import { Icons } from './shared/icons';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QABS-front';


   sidebarItems: SidebarItem[] = [
    { label: 'لوحة التحكم', icon:  Icons['dashboard'], route: '/register' },
    { label: 'المعلمين', icon: Icons['teachers'], route: '/users' },
    {
      label: 'الطلاب', icon: Icons['students'], route: '/settings' , children: [
        { label: 'تسجيل طالب جديد+', route: '/settings/profile' },
        { label: 'Security', route: '/settings/security' }
      ]
    },
    { label: 'الاشتراكات', icon: Icons['enrollment'], route: '/users' },
  ];
}

