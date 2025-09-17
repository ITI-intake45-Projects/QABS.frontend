import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { Enrollment } from '../../../core/models/Details/Enrollment';
import { SpecializationType } from '../../../core/models/Enums/SpecializationType.enum';
import { Router } from '@angular/router';
import { Student } from '../../../core/models/Details/Student';
import { Teacher } from '../../../core/models/Details/Teacher';
import { StudentList } from '../../../core/models/Details/StudentList';
import { TeacherList } from '../../../core/models/Details/TeacherList';
import { StudentService } from '../../../core/services/student.service';
import { TeacherService } from '../../../core/services/teacher.service';

@Component({
  selector: 'app-enrollmentList',
  templateUrl: './enrollmentList.component.html',
  styleUrls: ['./enrollmentList.component.css'],
  standalone: false
})
export class EnrollmentListComponent implements OnInit {

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  isLoading = false;
  currentPage = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalCount: number = 0;
  selectedEnrollmentStatus: number | null = null;


  ngOnInit() {

  const startYear = 2025;
  const futureYears = 15; // عدد السنين اللي عايز تعرضها (غيره حسب احتياجك)
  this.years = Array.from({ length: futureYears }, (_, i) => startYear + i);
    this.isLoading = true;
    this.loadStudents();
    this.loadTeachers();

    this.loadEnrollments();
  }

  enrollments: Enrollment[] = [];
  studentId: string = '';
  teacherId: string = '';
  startDate!: Date;




  specializations = [
    { id: SpecializationType.Foundation, label: 'تأسيس' },
    { id: SpecializationType.QuranMemorization, label: 'حفظ القرآن' },
    { id: SpecializationType.Qiraat, label: 'قراءات' }
  ];
  EnrollmentStatuses = [
    { id: 1, label: 'مفعل' },
    { id: 2, label: 'مكتمل' },
    { id: 3, label: 'ملغى' },
    { id: 0, label: 'غير معروف' }
  ];

  getSpecializationLabel(id: number): string {
    return this.specializations.find(s => s.id === id)?.label || 'غير محدد';
  }
  getEnrollmentStatusLabel(id: number): string {
    return this.EnrollmentStatuses.find(s => s.id === id)?.label || 'غير معروف';
  }

  loadEnrollments() {
    this.isLoading = true;

    let query: any = {
      studentId: this.selectedStudent?.studentId || "",
      teacherId: this.selectedTeacher?.teacherId || "",
      status : this.selectedEnrollmentStatus || "" ,
      pageSize: this.pageSize,
      pageIndex: this.currentPage
    };

    // لو الشهر متحدد
    if (this.selectedMonth) {
      const year = this.selectedYear || new Date().getFullYear();

      // نبعت السنة والشهر
      query.startDate = `${year}-${this.selectedMonth}-01`;  // ندي default اليوم 1

      // لو اليوم متحدد كمان
      if (this.selectedDay) {
        query.day = this.selectedDay;
      }
    }

    // فلترة بالحالة 👈
    if (this.selectedEnrollmentStatus !== null) {
      query.enrollmentStatus = this.selectedEnrollmentStatus;
    }


    this.enrollmentService.getAllEnrollments(query).subscribe({
      next: (res) => {
        console.log(`Enrollment data:`, res.data);
        this.enrollments = res.data.data;
        this.currentPage = res.data.pageNumber;
        this.pageSize = res.data.pageSize;
        this.totalCount = res.data.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching enrollments:', err);
        this.isLoading = false;
      }
    });
  }


  loadStudents() {
    this.studentService.getStudentList().subscribe({
      next: (res) => {
        console.log('students : ', res.data);
        this.students = res.data;
      }
      ,
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  loadTeachers() {
    this.teacherService.getTeacherList().subscribe({
      next: (res) => {
        console.log('Teachers : ', res.data);
        this.teachers = res.data;
        // this.isLoading=false;
      }
      ,
      error: (err) => {
        console.log(err.message);
        // this.isLoading = false;
      }
    });
  }


  // Helper method to format dates
  formatDate(dateString?: string): string {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }


  goToDetails(id: number) {
    this.router.navigate(['/dashboard/enrollments/details', id]);
  }


  //search with student , teacher
  students: StudentList[] = [];
  teachers: TeacherList[] = [];

  studentSearchTerm: string = '';
  teacherSearchTerm: string = '';

  studentDropdownOpen = false;
  teacherDropdownOpen = false;

  selectedStudent: StudentList | null = null;
  selectedTeacher: TeacherList | null = null;

  // فلترة الطلاب
  getFilteredStudents(): StudentList[] {
    if (!this.studentSearchTerm.trim()) return this.students;

    const term = this.studentSearchTerm.toLowerCase();
    return this.students.filter(s =>
      s.studentId.toLowerCase().includes(term) ||
      s.fullName.toLowerCase().includes(term)
    );
  }

  // فلترة المعلمين
  getFilteredTeachers(): TeacherList[] {
    if (!this.teacherSearchTerm.trim()) return this.teachers;

    const term = this.teacherSearchTerm.toLowerCase();
    return this.teachers.filter(t =>
      t.teacherId.toLowerCase().includes(term) ||
      t.fullName.toLowerCase().includes(term)
    );
  }



  // اختيار الطالب
  selectStudent(student: StudentList) {
    this.selectedStudent = student;
    this.studentDropdownOpen = false;

    console.log('StudentId Selected:', student.studentId); // هيتبعت للباك اند
  }

  // اختيار المعلم
  selectTeacher(teacher: TeacherList) {
    this.selectedTeacher = teacher;
    this.teacherDropdownOpen = false;

    console.log('TeacherId Selected:', teacher.teacherId); // هيتبعت للباك اند
  }


  clearSelections(): void {
    this.selectedStudent = null;
    this.selectedTeacher = null;
    this.studentId = '';
    this.teacherId = '';
    this.selectedDay = null;
    this.selectedMonth = null;
    this.selectedYear = null;
    this.selectedEnrollmentStatus = null; // 👈 هنا

  }


  // pagination control
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEnrollments();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEnrollments();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEnrollments();
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



}
