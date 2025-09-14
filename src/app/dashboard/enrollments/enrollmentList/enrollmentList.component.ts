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
  templateUrl:'./enrollmentList.component.html',
  styleUrls: ['./enrollmentList.component.css'],
  standalone: false
})
export class EnrollmentListComponent implements OnInit {

  constructor(
    private enrollmentService: EnrollmentService,
    private studentService : StudentService,
    private teacherService : TeacherService,
    private router: Router
  ) { }

  isLoading = false;
  currentPage = 1;
  pageSize = 4;
  totalPages: number = 0;
  totalCount: number = 0;

  ngOnInit() {
    this.isLoading = true;
    this.loadStudents();
    this.loadTeachers();

    this.loadEnrollments();
  }

  enrollments: Enrollment[] = [];
  studentId:string  = '';
  teacherId:string = '';
  startDate! : Date ;




  specializations = [
    { id: SpecializationType.Foundation, label: 'تأسيس' },
    { id: SpecializationType.QuranMemorization, label: 'حفظ القرآن' },
    { id: SpecializationType.Qiraat, label: 'قراءات' }
  ];
  EnrollmentStatuses = [
    { id: 1, label: 'مفعل' },
    { id: 2, label: 'ملغي' },
    { id: 3, label: 'قيد الانتظار' },
    { id: 0, label: 'غير معروف' }
  ];

  getSpecializationLabel(id: number): string {
    return this.specializations.find(s => s.id === id)?.label || 'غير محدد';
  }
  getEnrollmentStatusLabel(id: number): string {
    return this.EnrollmentStatuses.find(s => s.id === id)?.label || 'غير معروف';
  }

  loadEnrollments() {
    // this.isLoading = true;
      if (this.selectedStudent) {
      this.studentId = this.selectedStudent.studentId;

    }
     if ( this.selectedTeacher) {

      this.teacherId = this.selectedTeacher.teacherId;
    }



    this.enrollmentService.getAllEnrollments(this.currentPage, this.pageSize, this.studentId, this.teacherId, this.startDate).subscribe({
      next: (res) => {
        // Handle the response and display student details
        console.log(`Enrollment data:`, res.data);
        this.enrollments = res.data.data;
        // this.loadStudents();
        // this.loadTeachers();

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

  // استدعاء الباك اند بالقيم المختارة
  searchByStudentAndTeacher() {
    if (!this.selectedStudent || !this.selectedTeacher) {
      console.warn('لازم تختار طالب ومعلم');
      return;
    }

    const studentId = this.selectedStudent.studentId;
    const teacherId = this.selectedTeacher.teacherId;

    console.log('Sending to backend:', { studentId, teacherId });

    // مثال استدعاء خدمة API
    // this.enrollmentService.searchByStudentAndTeacher(studentId, teacherId).subscribe({
    //   next: (res) => {
    //     console.log('نتائج البحث:', res);
    //   },
    //   error: (err) => {
    //     console.error('Error:', err);
    //   }
    // });
  }

  clearSelections(): void {
    this.selectedStudent = null;
    this.selectedTeacher = null;
  }

}
