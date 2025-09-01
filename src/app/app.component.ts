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



}

