import { Component, HostListener, Input } from '@angular/core';
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
  // isMobile = false;
  constructor(private sanitizer: DomSanitizer) { }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.userMenuOpen = false;
  }

  toggleItem(item: any) {
    if (item.children) {
      item.open = !item.open;
    }
  }

  getIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  // @HostListener('window:resize')
  // checkScreenSize() {
  //   this.isMobile = window.innerWidth < 768; // Mobile breakpoint
  //   if (this.isMobile) {
  //     this.collapsed = true; // Sidebar collapsed by default on mobile
  //   } else {
  //     this.collapsed = false; // Expanded by default on desktop
  //   }
  // }

  userMenuOpen = false;

toggleUserMenu() {
  this.userMenuOpen = !this.userMenuOpen;
}

}
