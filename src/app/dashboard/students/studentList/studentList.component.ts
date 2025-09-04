import { Component, OnInit } from '@angular/core';
import { Student } from '../../../core/models/Details/Student';
import { StudentService } from '../../../core/services/student.service';
import { Gender } from '../../../core/models/Enums/Gender.enum';

@Component({
  selector: 'app-studentList',
  templateUrl: './studentList.component.html',
  styleUrls: ['./studentList.component.css'],
  standalone: false
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  currentPage = 1;
  pageSize = 5;

  genders = [
    { id: Gender.Male, label: 'ذكر' },
    { id: Gender.Female, label: 'أنثى' }
  ];
  
  // modal states (simulate)
  selectedStudent?: Student;
  showViewModal = false;
  showEditModal = false;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.loadStudents();
  }

  menuOpenFor: string | null = null;
  menuPosition = { x: 0, y: 0 };
  
  toggleMenu(studentId: string, event: MouseEvent) {
    event.stopPropagation();
    this.menuOpenFor = this.menuOpenFor === studentId ? null : studentId;
  
    if (this.menuOpenFor) {
      // موقع الزر بالنسبة للصفحة
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      this.menuPosition = {
        x: rect.left,
        y: rect.bottom + window.scrollY
      };
    }
  }
  
  closeMenu() {
    this.menuOpenFor = null;
  }

  // load all students
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (res) => {
        // this.isLoading = false;
        // console.log(res);
        console.log(res.data);
        this.students = res.data.data;
        // this.showToast(`تم إنشاء حساب الطالب "${formValue.FirstName + ' ' + formValue.LastName}" بنجاح ✅`,
        //     'success'
        //   );
        // if (res.succeeded) {
        //   console.log(`تم إنشاء حساب الطالب "${formValue.FirstName + ' ' + formValue.LastName}" بنجاح ✅`)
        // }
        // else {
        //   console.log(`للأسف فشل إنشاء حساب الطالب "${formValue.FirstName + ' ' + formValue.LastName}" ❌`)
        // }

      }
      ,
      error: (err) => {
        // this.isLoading = false;
        // this.showToast('حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى',
        //     'error'
        //   );
        //   console.error('Error Registering User', err);
        console.log(err.message);
      }
    });
  }

  // pagination
  get totalPages(): number {
    return Math.ceil(this.students.length / this.pageSize);
  }

  get paginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.students.slice(startIndex, startIndex + this.pageSize);
  }

  // trackBy for ngFor
  trackByStudentId(index: number, student: Student): string {
    return student.studentId;
  }

  // ===== CRUD ACTIONS =====
  viewStudent(student: Student) {
    this.selectedStudent = student;
    this.showViewModal = true;
  }

  editStudent(student: Student) {
    this.selectedStudent = { ...student }; // copy to edit
    this.showEditModal = true;
  }

  saveEditStudent() {
    if (!this.selectedStudent) return;
    const index = this.students.findIndex(s => s.studentId === this.selectedStudent!.studentId);
    if (index !== -1) {
      this.students[index] = this.selectedStudent;
    }
    this.showEditModal = false;
  }

  deleteStudent(student: Student) {
    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      this.students = this.students.filter(s => s.studentId !== student.studentId);
    }
  }

  // pagination control
  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
