import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models/Details/Teacher';
import { StudentList } from '../../../core/models/Details/StudentList';
import { AccountService } from '../../../core/services/Account.service';
import { SpecializationType } from '../../../core/models/Enums/SpecializationType.enum';
import { TeacherPayout } from '../../../core/models/Details/TeacherPayout';
import { Session } from '../../../core/models/Details/Session';
import { SessionService } from '../../../core/services/session.service';
import { SessionStatus } from '../../../core/models/Enums/SessionStatus.enum';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TeacherAvailabilityCreateVM } from '../../../core/models/Create/TeacherAvailabilityCreateVM';
import { TeacherAvailability } from '../../../core/models/Details/TeacherAvailability';
import { DayOfWeek } from '../../../core/models/Enums/DayOfWeek.enum';



@Component({
  selector: 'app-teacherList',
  templateUrl: './teacherList.component.html',
  styleUrls: ['./teacherList.component.css'],
  standalone: false
})
export class TeacherListComponent implements OnInit {

  constructor(
    private teacherService: TeacherService,
    private sessionService: SessionService

  ) { }

  ngOnInit() {
    this.loadTeachers();

  }





  completedSessions: Session[] = [];
  students: StudentList[] = [];
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  searchTerm: string = '';
  isLoading = false;
  selectedSpecializations: number[] = []; // الـ id المختارة

  teacher: Teacher | null = null; // يبدأ Null مش {}
  teacherPayouts: TeacherPayout[] = []; // تبدأ فاضية
  teacherAvailability: TeacherAvailability[] = [];
  DayOfWeek = DayOfWeek;



  specializations = [
    { id: SpecializationType.Foundation, label: 'تأسيس' },
    { id: SpecializationType.QuranMemorization, label: 'حفظ القرآن' },
    { id: SpecializationType.Qiraat, label: 'قراءات' }
  ];

  getSpecializationLabels(ids: any): string {
    if (!ids || ids.length === 0) return '—';
    return (ids as number[])
      .map(id => this.specializations.find(s => s.id === id)?.label)
      .filter(label => !!label)
      .join(' ، ');
  }



  getCompletedSessionByTeacherId() {

    console.log('this is teacher id :', this.teacher?.teacherId)
    this.sessionService.getCompletedSessionByTeacherId(this.teacher!.teacherId).subscribe({
      next: (res) => {
        console.log('Completed sessions:', res.data);
        this.completedSessions = res.data;
        this.openModalPayout();
        // this.students = res.data || [];
      },
      error: (err) => {
        console.error('Error fetching enrolled students:', err);
      }
    });
  }



  getEnrolledStudents(teacherId: string) {
    console.log('this is teacherPayouts :', this.teacherPayouts)

    this.teacher = this.teachers.find(t => t.teacherId == teacherId) || null;
    if (this.teacher) {
      // حدّث الـ payouts بعد ما تختار teacher
      this.teacherPayouts = this.teacher.payouts ?? [];
      this.teacherAvailability = this.teacher.availability ?? [];

    }
    console.log('teacher.spec :', this.teacher?.specializations)
    console.log('teacher', this.teacher)

    console.log('teacheid : ', teacherId)
    this.teacherService.getStudentsByTeacherId(teacherId).subscribe({
      next: (res) => {
        console.log('Enrolled students:', res);
        this.students = res.data || [];
        this.initPagination();
      },
      error: (err) => {
        console.error('Error fetching enrolled students:', err);
      }
    });
  }

  loadTeachers() {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe({
      next: (res) => {
        console.log('Teachers data:', res.data);
        this.teachers = res.data || [];
        this.filteredTeachers = this.teachers;
        this.isLoading = false;


      },
      error: (err) => {
        console.error('Error fetching teachers:', err);
        this.isLoading = false;

      }
    });
  }

  currentIndex = 0;
  itemsPerView = 4; // lg: 4, md: 3, sm: 2 (tailwind classes handle responsiveness)


  // component.ts
  direction: 'rtl' | 'ltr' = 'rtl'; // خليها dynamic لو عايز

  getTransform() {
    const movePercent = (this.currentIndex * (100 / this.itemsPerView));
    return this.direction === 'rtl'
      ? `translateX(${movePercent}%)`
      : `translateX(-${movePercent}%)`;
  }


  deleteTeacher(teacherId: string) {
    this.teacherService.DeleteTeacher(teacherId).subscribe({
      next: (res) => {
        console.log('Teachers data:', res);
        this.loadTeachers();


      },
      error: (err) => {
        console.error('Error fetching teachers:', err);
      }
    });
  }



  previousStudent() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextStudent() {

    console.log(this.currentIndex)
    console.log(this.students.length - this.itemsPerView)
    if (this.currentIndex < this.students.length - this.itemsPerView) {
      this.currentIndex++;
    }
  }



  // جدول المواعيد
  availability = [
    { day: 'الاثنين', start: '10:00', end: '12:00' },
    { day: 'الأربعاء', start: '14:00', end: '16:00' },
    { day: 'الجمعة', start: '09:00', end: '11:00' }
  ];

  showAddModal = false;
  showEditModal = false;




  openAddModal() {
    this.showAddModal = true;
  }
  openEditModal() {
    this.showEditModal = true;
  }




  // saveNewSlot() {
  //   if (this.newSlot.day && this.newSlot.start && this.newSlot.end) {
  //     this.availability.push({ ...this.newSlot });
  //     this.closeAddModal();
  //   }
  // }


  // دوال التحكم
  // editSlot(slot: any) {
  //   console.log('Edit clicked:', slot);
  //   // تفتح مودال أو فورم للتعديل
  // }

  // deleteSlot(index: number) {
  //   console.log('Delete clicked:', this.availability[index]);
  //   this.availability.splice(index, 1); // تمسح العنصر من الجدول
  // }

  toggleSpecialization(id: number, event: any) {
    if (event.target.checked) {
      this.selectedSpecializations.push(id);
    } else {
      this.selectedSpecializations = this.selectedSpecializations.filter(s => s !== id);
    }
    this.onSearch();
  }


  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredTeachers = this.teachers.filter(t => {
      const fullName = (t.firstName + ' ' + t.lastName).toLowerCase();

      const matchesName = !term || fullName.includes(term);

      // لازم يكون عنده كل التخصصات المختارة
      const matchesSpecialization =
        this.selectedSpecializations.length === 0 ||
        this.selectedSpecializations.every(sel =>
          (t.specializations || []).includes(sel)
        );

      return matchesName && matchesSpecialization;
    });
  }



  addPayout() {

  }


  selectedPayout: any | null = null;
  showPayoutModal = false;
  showPayoutModalDetails = false;

  openDetails(payout: any) {
    this.selectedPayout = payout;
    this.showPayoutModalDetails = true;
  }
  openModalPayout() {
    this.showPayoutModal = true;
  }

  closeModal() {
    this.selectedPayout = null;
    this.showPayoutModalDetails = false;
  }

  closeModalPayout() {
    this.showPayoutModal = false;

  }



  // في داخل الكلاس TeacherListComponent
  get totalDuration(): number {
    return this.completedSessions.reduce((sum, session) => sum + (session.duration || 0), 0);
  }

  get totalAmount(): number {
    return this.completedSessions.reduce((sum, session) => sum + (session.amount || 0), 0);
  }

  // لو حابب تضبط تاريخ الدفع من الـ selectedPayout
  get paymentDate(): string {

    return new Date().toLocaleString(); // أو تستخدم format اللي تحبه
  }



  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', file);
    }
  }


  payNow() {

    this.isLoading = true;
    if (!this.teacher) return;

    const formData = new FormData();
    formData.append('TeacherId', this.teacher.teacherId);
    formData.append('PaidAt', new Date().toISOString());
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }
    // formData.append('TotalHours', this.totalDuration.toString());
    // formData.append('TotalAmount', this.totalAmount.toString());

    // يمكن إرسال قائمة الجلسات إذا تحتاج
    // const sessions = this.completedSessions.map(s => ({
    //   Id: s.id,
    //   EnrollmentId: s.enrollmentId,
    //   StartTime: s.startTime,
    //   Duration: s.duration,
    //   Amount: s.amount,
    //   Status: s.status
    // }));
    // formData.append('sessionDetails', JSON.stringify(sessions));

    // استدعاء الـ service لإرسال البيانات للباك اند
    this.teacherService.createTeacherPayout(formData).subscribe({
      next: (res) => {
        console.log('Payment created:', res);

        this.showPayoutModal = false;
        this.isLoading = false;
        this.showToast('تم الدفع للمعلم بنجاح ✅ سيتم تحديث البيانات خلال 3 ثوان ...', 'success');

        setTimeout(() => {
          this.loadTeachers(); // أو location.reload();
        }, 4000);

      },
      error: (err) => {
        this.showPayoutModal = false;
        this.isLoading = false;
        this.showToast('حدث خطأ أثناء دفع المبلغ ❌', 'error');
        console.error('Error creating payment:', err);
      }
    });
  }


  getSessionStatusLabel(status: SessionStatus | undefined): string {
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

  // // تحميل الصورة
  // downloadModalAsPDF() {
  //   const modalElement = document.querySelector('.modal-content') as HTMLElement;

  //   if (!modalElement) return;

  //   html2canvas(modalElement, {
  //     useCORS: true,
  //     allowTaint: true,
  //     scrollX: 0,
  //     scrollY: -window.scrollY,
  //     ignoreElements: (el) => {
  //       // تجاهل أي عنصر فيه لون غير مدعوم (oklch)
  //       return getComputedStyle(el).color.includes('oklch');
  //     }
  //   })
  //   .then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');

  //     const pdf = new jsPDF('p', 'mm', 'a4');

  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = 210; // عرض A4 بالملم
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('payout-details.pdf');
  //   })
  //   .catch(err => console.error('Error generating PDF:', err));
  // }
  getDayLabel(day: number): string {
    const days = [
      'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء',
      'الخميس', 'الجمعة', 'السبت'
    ];
    return days[day] || '';
  }

  // private dayMap: { [key: string]: number } = {
  //   'الأحد': 0,
  //   'الاثنين': 1,
  //   'الثلاثاء': 2,
  //   'الأربعاء': 3,
  //   'الخميس': 4,
  //   'الجمعة': 5,
  //   'السبت': 6
  // };

  newSlot = {
    day: DayOfWeek.Sunday, // default value
    start: '',
    end: ''
  };

  closeAddModal() {
    this.showAddModal = false;
    this.newSlot = { day: DayOfWeek.Sunday, start: '', end: '' }; // reset
  }
  closeEditModal() {
    this.showEditModal = false;
    this.newSlot = { day: DayOfWeek.Sunday, start: '', end: '' }; // reset
  }


  saveNewSlot() {


    const slot: TeacherAvailabilityCreateVM = {
      dayOfWeek: Number(this.newSlot.day), // تحويل من string → number
      startTime: this.newSlot.start + ':00',
      endTime: this.newSlot.end + ':00',
      teacherId: this.teacher?.teacherId
    };

    console.log('this is new slot: ', slot);
    this.isLoading = true;

    // استدعاء الـ service
    this.teacherService.addAvailability(slot).subscribe({
      next: (res) => {
        console.log('Enrollment created:', res);
        this.showAddModal = false;
        this.isLoading = false;
        this.teacher = null;
        this.showToast('تم إضافة وقت متاح للمعلم بنجاح ✅ سيتم تحديث البيانات خلال 3 ثوان ...', 'success');

        setTimeout(() => {
          this.loadTeachers(); // أو location.reload();
        }, 4000);



      },
      error: (err) => {
        this.showAddModal = false;
        this.isLoading = false;
        this.showToast('حدث خطأ أثناء إنشاء الاشتراك ❌', 'error');
        console.error('Error creating enrollment', err);
      }
    });
  }


  deleteAvailability(id: number) {
    this.isLoading = true;

    this.teacherService.deleteAvailability(id).subscribe({
      next: (res) => {
        console.log('delete Availability:', res);
        this.teacher = null;
        this.isLoading = false;

        this.showToast('تم حذف  الموعد المتاح للمعلم بنجاح ✅ سيتم تحديث البيانات خلال 3 ثوان ...', 'success');

        setTimeout(() => {
          this.loadTeachers(); // أو location.reload();
        }, 4000);



      },
      error: (err) => {
        // this.showAddModal = false;
        this.isLoading = false;
        this.showToast('حدث خطأ أثناء حذف الموعد ❌', 'error');
        console.error('Error creating enrollment', err);
      }
    });
  }








  message = '';
  messageType: 'success' | 'error' = 'success';
  showMessage = false;

  showToast(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    this.showMessage = true;

    // تختفي تلقائياً بعد 3 ثواني
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }



  formatTime(time: string): string {
    if (!time) return '';

    // نفصل الساعات والدقايق
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr.padStart(2, '0');

    const suffix = hours >= 12 ? 'م' : 'ص';
    if (hours === 0) {
      hours = 12; // 00 → 12 ص
    } else if (hours > 12) {
      hours -= 12; // 13 → 1 م
    }

    return `${hours}:${minutes} ${suffix}`;
  }



  // pagination


  // pagination vars
  pageSize: number = 5;        // عدد العناصر في الصفحة
  currentPage: number = 1;
  totalPages: number = 0;
  totalCount: number = 0;

  // array للعرض فقط
  paginatedPayouts: any[] = [];

  // استدعاء بعد ما تيجي الداتا من السيرفر
  initPagination(): void {
    this.totalCount = this.teacherPayouts.length;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.updatePaginatedData();
  }

  // تحديث الداتا اللي بتتعرض
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPayouts = this.teacherPayouts.slice(startIndex, endIndex);
  }

  // pagination control
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
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




