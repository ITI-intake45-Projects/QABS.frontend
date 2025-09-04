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
  student? : Student ;
  studentPayments: StudentPayment[] = [];
    currentPage = 1;
  pageSize = 1;

  constructor(private route: ActivatedRoute , private studentService: StudentService) { }

  ngOnInit() {
      this.studentId = this.route.snapshot.paramMap.get('id') || '';

    this.getStudentDetails();
  }

  getStudentDetails() {
    // Use this.studentId to fetch and display student details
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (res) => {
        // Handle the response and display student details
        console.log(res.data);
        this.student = res.data;
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
      }
    });
  }

  goToEnrollmentDetails(student: Student) {

  }


  deletePayment(paymentId: string) {
    // Implement deletion logic here
    console.log(`Deleting payment with ID: ${paymentId}`);
  }

  // pagination
  get totalPages(): number {
    return Math.ceil(this.studentPayments.length / this.pageSize);
  }

  get paginatedStudentPayments(): StudentPayment[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.studentPayments.slice(startIndex, startIndex + this.pageSize);
  }

    // pagination control
  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }


  closeAddModal(){
    
  }

}
