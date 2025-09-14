import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/session.service';
import { SessionEnrollmentDetailsVM } from '../../../core/models/Details/SessionEnrollmentDetailsVM';
import { SessionEditVM } from '../../../core/models/Edit/SessionEditVM';
import { SessionStatus } from '../../../core/models/Enums/SessionStatus.enum';
import { Session } from '../../../core/models/Details/Session';

@Component({
  selector: 'app-sessionsDetails',
  templateUrl: './sessionsDetails.component.html',
  styleUrls: ['./sessionsDetails.component.css'],
  standalone: false
})
export class SessionsDetailsComponent implements OnInit {

  sessions: SessionEnrollmentDetailsVM[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalCount: number = 0;
  startDate: string = ''; // للفلترة بالتاريخ
  isLoading = false;
  today: Date = new Date();
  SessionStatus = SessionStatus;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.isLoading = true;

    this.sessionService.getSessionsByStartDate(this.currentPage, this.pageSize, this.startDate).subscribe({
      next: (res) => {
        this.sessions = res.data.data;
        this.currentPage = res.data.pageNumber;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err.message);
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    this.currentPage = 1;
    this.loadSessions();
  }
  clearFilter(): void {
    this.startDate = '';
    this.currentPage = 1;
    this.loadSessions(); // يرجع كل الداتا تاني
  }

  getSessionStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'مجدولة';
      case 2:
        return 'مكتملة';
      case 3:
        return 'ملغية';
      case 4:
        return 'مدفوعة';
      default:
        return 'غير معروف';
    }
  }

showConfirmModal = false;
sessionToCancel?: SessionEnrollmentDetailsVM;

openModal(session: SessionEnrollmentDetailsVM) {
  this.sessionToCancel = session;
  this.showConfirmModal = true;
}

closeModal() {
  this.showConfirmModal = false;
  this.sessionToCancel = undefined;
}

confirmCancel() {
  if (!this.sessionToCancel) return;

  this.isLoading = true;
  const editSession: SessionEditVM = {
    Id: this.sessionToCancel.sessionId,
    StartTime: this.sessionToCancel.startTime,
    SessionStatus: SessionStatus.Cancelled
  };

  this.sessionService.CancelSession(editSession).subscribe({
    next: (res) => {
      console.log(res);
      this.closeModal();
      this.currentPage = 1;
      this.loadSessions();
    },
    error: (err) => {
      console.log(err.message);
      this.isLoading = false;
      this.closeModal();
    }
  });
}





// pagination control
goToPage(page: number): void {
  if(page >= 1 && page <= this.totalPages) {
  this.currentPage = page;
  this.loadSessions();
}
  }

previousPage(): void {
  if(this.currentPage > 1) {
  this.currentPage--;
  this.loadSessions();
}
  }

nextPage(): void {
  if(this.currentPage < this.totalPages) {
  this.currentPage++;
  this.loadSessions();
}
  }

getVisiblePages(): number[] {
  const pages: number[] = [];
  for (let i = 1; i <= this.totalPages; i++) {
    pages.push(i);
  }
  return pages;
}

// showing range text
getShowingRange(): string {
  const start = (this.currentPage - 1) * this.pageSize + 1;
  const end = Math.min(start + this.pageSize - 1, this.totalCount);
  return `${start}-${end}`;
}
}
