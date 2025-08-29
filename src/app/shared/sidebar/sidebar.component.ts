import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface SidebarItem {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  open?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];

  collapsed = false;
  constructor(private sanitizer: DomSanitizer) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  toggleItem(item: any) {
    if (item.children) {
      item.open = !item.open;
    }
  }

  getIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
