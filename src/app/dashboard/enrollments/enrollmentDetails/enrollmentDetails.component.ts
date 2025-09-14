import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { Enrollment } from '../../../core/models/Details/Enrollment';
import { SessionCreateVM } from '../../../core/models/Create/SessionCreateVM';
import { SessionStatus } from '../../../core/models/Enums/SessionStatus.enum';
import { SessionService } from '../../../core/services/session.service';
import { SessionEnrollmentDetailsVM } from '../../../core/models/Details/SessionEnrollmentDetailsVM';
import { SessionEditVM } from '../../../core/models/Edit/SessionEditVM';
import { Session } from '../../../core/models/Details/Session';

@Component({
  selector: 'app-enrollmentDetails',
  templateUrl: './enrollmentDetails.component.html',
  styleUrls: ['./enrollmentDetails.component.css'],
  standalone: false

})
export class EnrollmentDetailsComponent implements OnInit {

  enrollmentId!: number;
  isLoading = false;
  enrollment!: Enrollment;
  SessionStatus = SessionStatus;

    showModal = false;
  newSession: SessionCreateVM = {
    startTime: new Date(),
    status: SessionStatus.Scheduled,
    amount: null,
    enrollmentId: 0
  };


  constructor(
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    private sessionService : SessionService

  ) { }


  ngOnInit(): void {
    // 👇 كده هتاخد id من URL
    this.enrollmentId = Number(this.route.snapshot.paramMap.get('id'));

    this.getEnrollmentById();

  }

  getEnrollmentById() {
    this.isLoading = true;
    this.enrollmentService.getEnrollmentById(this.enrollmentId).subscribe({
      next: (res) => {
        console.log('Enrollment data:', res);
        // حسب شكل الـ API response
        this.enrollment = res.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching enrollment:', err);
        this.isLoading = false;
      }
    });
  }

  openCreateSessionModal(): void {
    this.showModal = true;
  }

  closeCreateSessionModal(): void {
    this.showModal = false;
    // Reset the form data
    this.newSession = {
      startTime: new Date(),
      status: SessionStatus.Scheduled,
      amount: null,
      enrollmentId: 0
    };
  }

  createSession(): void {

    this.isLoading = true;
    this.newSession.enrollmentId = this.enrollmentId;
    this.newSession.status = SessionStatus.Scheduled;
    this.showModal = false;

    // Here you would call your service to create the session
    console.log('Creating session with data:', this.newSession);

    // This is a placeholder for your service call

    this.sessionService.createSession(this.newSession).subscribe({
      next: (res) => {
        console.log('Session created successfully:', res);
        // Optional: refresh the data
        this.getEnrollmentById();
        // this.closeCreateSessionModal();
      },
      error: (err) => {
        console.error('Error creating session:', err);
        // Display error message to user
        // this.isLoading = false;
      }
    });

  }

  showConfirmModal = false;
  sessionToCancel?: Session;

  openModal(session: Session) {
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
    Id: this.sessionToCancel.id,
    StartTime: this.sessionToCancel.startTime,
    SessionStatus: SessionStatus.Cancelled
  };

  this.sessionService.CancelSession(editSession).subscribe({
    next: (res) => {
      console.log(res);
      this.closeModal();
      // this.currentPage = 1;
      // this.loadSessions();
      this.getEnrollmentById();
    },
    error: (err) => {
      console.log(err.message);
      this.isLoading = false;
      this.closeModal();
    }
  });
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


get remainingSessions(): number {
  if (!this.enrollment || !this.enrollment.sessions) {
    return 0;
  }
  const completedOrCancelledSessions = this.enrollment.sessions.filter(s => s.status === SessionStatus.Completed || s.status === SessionStatus.Cancelled).length;
  return this.enrollment.totalSessions - completedOrCancelledSessions;
}

}




