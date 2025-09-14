import { Component, OnInit } from '@angular/core';
import { Student } from '../../../core/models/Details/Student';
import { StudentService } from '../../../core/services/student.service';
import { Gender } from '../../../core/models/Enums/Gender.enum';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/services/Account.service';

@Component({
  selector: 'app-studentList',
  templateUrl: './studentList.component.html',
  styleUrls: ['./studentList.component.css'],
  standalone: false
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages: number = 0;
  totalCount: number = 0;
  searchTerm: string = '';

  genders = [
    { id: Gender.Male, label: 'ذكر' },
    { id: Gender.Female, label: 'أنثى' }
  ];

  // modal states (simulate)
  selectedStudent?: Student;
  showViewModal = false;
  showEditModal = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private accountService: AccountService
  ) { }

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

  // load all students (paged)
  loadStudents() {
    this.isLoading = true;
    console.log('cuurent page: ', this.currentPage)

    this.studentService.getStudents(this.currentPage, this.pageSize, this.searchTerm).subscribe({
      next: (res) => {
        console.log(res.data);

        this.students = res.data.data;              // تمام
        this.currentPage = res.data.pageNumber;     // بدل currentIndex
        this.pageSize = res.data.pageSize;          // تمام
        this.totalCount = res.data.totalCount;      // تمام
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.isLoading = false;

      },
      error: (err) => {
        console.log(err.message);
        this.isLoading = false;

      }
    });
  }

  resetSearch() {
    this.searchTerm = '';
    this.loadStudents();
  }
  goToStudentDetails(studentId: string) {
    // Navigate to the student details page
    // Assuming you have a router set up
    this.router.navigate(['/dashboard/students/details', studentId]);
    console.log(`Navigating to details of student ID: ${studentId}`);
  }

  // pagination
  // get totalPages(): number {
  //   return Math.ceil(this.students.length / this.pageSize);
  // }

  // get paginatedStudents(): Student[] {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   return this.students.slice(startIndex, startIndex + this.pageSize);
  // }

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

  // deleteStudent(student: Student) {
  //   if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
  //     this.students = this.students.filter(s => s.studentId !== student.studentId);
  //   }
  // }



  // modal delete state
  showDeleteModal = false;
  studentToDelete?: Student;
  isLoading = false;

  openDeleteModal(student: Student, event: MouseEvent) {
    event.stopPropagation(); // عشان مايفتحش تفاصيل الطالب
    this.studentToDelete = student;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.studentToDelete) {
      this.isLoading = true
      // this.students = this.students.filter(s => s.studentId !== this.studentToDelete!.studentId);
      this.accountService.DeleteAccount(this.studentToDelete.studentId).subscribe({
        next: (res) => {

          this.loadStudents();
        },
        error: (err) => {
          console.log(err.message);
          this.isLoading = false;

        }
      });
      this.studentToDelete = undefined;
      this.showDeleteModal = false;
    }
  }

  cancelDelete() {
    this.studentToDelete = undefined;
    this.showDeleteModal = false;
  }



  // pagination control
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadStudents();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadStudents();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadStudents();
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
