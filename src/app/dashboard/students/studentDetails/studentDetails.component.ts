import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/Details/Student';
import { StudentPayment } from '../../../core/models/Details/StudentPayment';

@Component({
  selector: 'app-studentDetails',
  templateUrl: './studentDetails.component.html',
  styleUrls: ['./studentDetails.component.css'],
  standalone: false
})
export class StudentDetailsComponent implements OnInit {

  studentId: string = '';
  student?: Student;
  studentPayments: StudentPayment[] = [];
  isLoading = false;




  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';

    this.getStudentDetails();
    const startYear = 2025;
    const futureYears = 15; // عدد السنين اللي عايز تعرضها (غيره حسب احتياجك)
    this.years = Array.from({ length: futureYears }, (_, i) => startYear + i);

  }

  getStudentDetails() {
    this.isLoading = true; // Show loader
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (res) => {
        // Handle the response and display student details
        console.log('response data:', res.data);
        this.student = res.data;
        this.studentPayments = res.data.studentpayments || [];
        this.filteredPayments = [...this.studentPayments]; // نسخة أولية
        console.log('student payments:', this.studentPayments);
        this.initPagination();

        this.isLoading = false; // Hide loader


      },
      error: (err) => {
        console.error('Error fetching student details:', err);
        this.isLoading = false; // Hide loader
      }
    });
  }

  goToEnrollmentDetails(student: Student) {

  }


  deletePayment(paymentId: number) {
    // Implement deletion logic here
    console.log(`Deleting payment with ID: ${paymentId}`);
  }


  // array الفلتر النهائي
  filteredPayments: StudentPayment[] = [];
  // فلترة
  // filterPayments() {
  //   this.filteredPayments = this.studentPayments.filter(p => {
  //     const date = new Date(p.paymentDate);

  //     // فلترة باليوم
  //     if (this.filterDate) {
  //       const selectedDate = new Date(this.filterDate);
  //       if (date.toDateString() !== selectedDate.toDateString()) return false;
  //     }

  //     // فلترة بالشهر
  //     if (this.filterMonth) {
  //       const [year, month] = this.filterMonth.split('-').map(Number);
  //       if (date.getFullYear() !== year || (date.getMonth() + 1) !== month) return false;
  //     }

  //     // فلترة بالسنة
  //     if (this.filterYear) {
  //       if (date.getFullYear() !== this.filterYear) return false;
  //     }

  //     return true;
  //   });
  // }

  // pagination vars
  pageSize: number = 5;        // عدد العناصر في الصفحة
  currentPage: number = 1;
  totalPages: number = 0;
  totalCount: number = 0;

  // array للعرض فقط
  paginatedPayments: StudentPayment[] = [];

  // استدعاء بعد ما تيجي الداتا من السيرفر
  initPagination(): void {
    this.totalCount = this.filteredPayments.length;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.updateFilteredPaginatedData();
  }

  // // تحديث الداتا اللي بتتعرض
  // updatePaginatedData(): void {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.paginatedPayments = this.studentPayments.slice(startIndex, endIndex);
  // }

  // pagination control
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateFilteredPaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredPaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredPaginatedData();
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


  trackByPaymentId(index: number, item: StudentPayment): string | number {
    return item?.id ?? index;
  }

  getPayments(): void {
    let filtered = [...this.studentPayments];

    filtered = filtered.filter(payment => {
      const date = new Date(payment.paymentDate);

      // تأكد إن selectedYear/Month/Day أرقام
      if (this.selectedYear && date.getFullYear() !== Number(this.selectedYear)) {
        return false;
      }

      if (this.selectedMonth && (date.getMonth() + 1) !== Number(this.selectedMonth)) {
        return false;
      }

      if (this.selectedDay && date.getDate() !== Number(this.selectedDay)) {
        return false;
      }

      return true;
    });

    this.filteredPayments = filtered;
    this.totalCount = this.filteredPayments.length;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.currentPage = 1;
    this.updateFilteredPaginatedData();
  }

  // تعديل للـ update بحيث تستخدم filteredPayments بدل studentPayments
  updateFilteredPaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPayments = this.filteredPayments.slice(startIndex, endIndex);
  }

  //filter

  selectedMonth: number | null = null;
  selectedYear: number | null = null;
  selectedDay: number | null = null;

  months = [
    { value: 1, name: 'يناير' },
    { value: 2, name: 'فبراير' },
    { value: 3, name: 'مارس' },
    { value: 4, name: 'أبريل' },
    { value: 5, name: 'مايو' },
    { value: 6, name: 'يونيو' },
    { value: 7, name: 'يوليو' },
    { value: 8, name: 'أغسطس' },
    { value: 9, name: 'سبتمبر' },
    { value: 10, name: 'أكتوبر' },
    { value: 11, name: 'نوفمبر' },
    { value: 12, name: 'ديسمبر' },
  ];

  years: number[] = [];

  clearSelections(): void {
    this.selectedDay = null;
    this.selectedMonth = null;
    this.selectedYear = null;

    // رجّع كل البيانات
    this.filteredPayments = [...this.studentPayments];
    this.totalCount = this.filteredPayments.length;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.currentPage = 1;
    this.updateFilteredPaginatedData();
  }


  showPaymentModal: boolean = false;
selectedPayment: any = null; // يفضل تعمله interface

openPaymentModal(payment: any): void {
  this.selectedPayment = payment;
  this.showPaymentModal = true;
}

closePaymentModal(): void {
  this.showPaymentModal = false;
  this.selectedPayment = null;
}

// دالة لتحويل حالة الجلسة
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


 
}
