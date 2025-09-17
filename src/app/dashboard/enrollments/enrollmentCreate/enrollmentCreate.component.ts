import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationType } from '../../../core/models/Enums/SpecializationType.enum';
import { Student } from '../../../core/models/Details/Student';
import { Teacher } from '../../../core/models/Details/Teacher';
import { StudentService } from '../../../core/services/student.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { SubscribtionPlan } from '../../../core/models/Details/SubscribtionPlan';
import { SubscribtionPlanService } from '../../../core/services/subscribtionPlan.service';
import { StudentPaymentStatus } from '../../../core/models/Enums/StudentPaymentStatus.enum';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { SubscriptionType } from '../../../core/models/Enums/SubscriptionType.enum';
import { StudentList } from '../../../core/models/Details/StudentList';
import { TeacherList } from '../../../core/models/Details/TeacherList';
import { EnrollmentStatus } from '../../../core/models/Enums/EnrollmentStatus.enum';

@Component({
  selector: 'app-enrollmentCreate',
  templateUrl: './enrollmentCreate.component.html',
  styleUrls: ['./enrollmentCreate.component.css'],
  standalone: false
})
export class EnrollmentCreateComponent implements OnInit {
  enrollmentForm: FormGroup;
  dropdownSpecializationOpen = false;
  isLoading = false;
  isLoadingsubmit = false;
  students: StudentList[] = [];
  teachers: TeacherList[] = [];
  subscriptionPlans: SubscribtionPlan[] = [];
  studentSearchTerm: string = '';   // الكلمة اللي المستخدم بيكتبها
  teacherSearchTerm: string = '';
  weekDays: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  requiredDaysCount: number = 0;




  specializations = [
    { id: SpecializationType.Foundation, label: 'تأسيس' },
    { id: SpecializationType.QuranMemorization, label: 'حفظ القرآن' },
    { id: SpecializationType.Qiraat, label: 'قراءات' }
  ];

  StudentPaymentStatus = [
    { id: StudentPaymentStatus.NotRecieved, label: 'لم يتم الاستلام' },
    { id: StudentPaymentStatus.Recieved, label: 'تم الاستلام' }
  ];

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private eRef: ElementRef,
    private renderer: Renderer2,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private plan: SubscribtionPlanService,
    private enrollmentService: EnrollmentService
  ) {
    this.enrollmentForm = this.fb.group({
      StudentId: ['', Validators.required],
      TeacherId: ['', Validators.required],
      SubscriptionPlanId: ['', Validators.required],
      Specialization: [null, Validators.required],
      EnrollmentFee: [null, Validators.required],
      Discount: [null],
      EnrollmentStatus: [EnrollmentStatus.Active],
      StartDate: ['', Validators.required],
      EndDate: [''],
      daysOfWeek: [[], Validators.required],   // جديد
      startTime: ['', Validators.required],
      studentPayment: this.fb.group({
        Amount: [null, [Validators.required, Validators.min(0.01)]],
        PaymentDate: [new Date().toISOString(), Validators.required],
        ImageUrl: [''],
        StudentPaymentStatus: ['NotRecieved'],
        StudentId: [''],
        EnrollmentId: [null],
        ImageFile: [null]
      })
    });

    // Close dropdown on outside click
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.dropdownSpecializationOpen = false;
      }
    });
  }

  ngOnInit() {

    this.isLoading = true;
    this.loadStudents();
    this.loadTeachers();
    this.getSubscriptionPlans();
    this.handleSubscriptionPlanChange();
  }


  handleSubscriptionPlanChange() {

    this.enrollmentForm.get('SubscriptionPlanId')?.valueChanges.subscribe(planId => {
      const plan = this.subscriptionPlans.find(p => p.id == planId);
      if (!plan) return;

      switch (plan.type as SubscriptionType) {
        case SubscriptionType.EightSessions:
          this.requiredDaysCount = 2;
          break;
        case SubscriptionType.TwelveSessions:
          this.requiredDaysCount = 3;
          break;
        case SubscriptionType.SixteenSessions:
          this.requiredDaysCount = 4;
          break;
        default:
          this.requiredDaysCount = 0;
          break;
      }


      // reset الاختيارات القديمة
      this.enrollmentForm.patchValue({ daysOfWeek: [] });
    });
  }



  // handle checkbox selection
  toggleDaySelection(dayIndex: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const currentDays = this.enrollmentForm.value.daysOfWeek || [];

    if (checked) {
      if (currentDays.length < this.requiredDaysCount) {
        this.enrollmentForm.patchValue({
          daysOfWeek: [...currentDays, dayIndex]
        });
      } else {
        // لو حاول يختار أكتر من المسموح
        (event.target as HTMLInputElement).checked = false;
        this.showToast(`مسموح فقط باختيار ${this.requiredDaysCount} أيام`, 'error');
      }
    } else {
      this.enrollmentForm.patchValue({
        daysOfWeek: currentDays.filter((d: number) => d !== dayIndex)
      });
    }
  }

  get formControls() {
    return this.enrollmentForm.controls;
  }

  getSubscriptionPlans() {
    this.plan.getSubscriptionPlans().subscribe({
      next: (res) => {
        console.log("Subscription Plans:", res.data);
        this.subscriptionPlans = res.data;
      }
      ,
      error: (err) => {
        console.log(err.message);
      }
    });
  }

  studentDropdownOpen = false;
  teacherDropdownOpen = false;

  selectedStudent: StudentList | null = null;
  selectedTeacher: TeacherList | null = null;

  selectStudent(student: StudentList) {
    this.selectedStudent = student;

    // Set StudentId in main enrollment form
    this.enrollmentForm.get('StudentId')?.setValue(student.studentId);

    // Sync it automatically to studentPayment.StudentId
    this.enrollmentForm.get('studentPayment')?.patchValue({
      StudentId: student.studentId
    });
    this.studentDropdownOpen = false;
  }

  selectTeacher(teacher: TeacherList) {
    this.selectedTeacher = teacher;
    console.log("Teacher object:", teacher); // ✅ بيعرض teacherId الصح

    this.enrollmentForm.get('TeacherId')?.setValue(teacher.teacherId); // 👈 عدلتها
    this.teacherDropdownOpen = false;
  }


  // filteredStudents() {
  //   console.log(this.studentSearchTerm)
  //   if (!this.studentSearchTerm) {
  //     return this.students;
  //   }
  //   const term = this.studentSearchTerm.toLowerCase();
  //   return this.students.filter(s =>
  //     (s.firstName + ' ' + s.lastName).toLowerCase().includes(term)
  //   );
  // }

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
        console.log(res.data);
        this.teachers = res.data;
        this.isLoading = false;
      }
      ,
      error: (err) => {
        console.log(err.message);
        this.isLoading = false;
      }
    });
  }

  toggleDropdownSpecialization() {
    this.dropdownSpecializationOpen = !this.dropdownSpecializationOpen;
  }

  selectSpecialization(option: number) {
    this.enrollmentForm.get('Specialization')?.setValue(option);
    this.dropdownSpecializationOpen = false;
  }

  get selectedSpecializationLabel(): string {
    const id = this.enrollmentForm.get('Specialization')?.value;
    const selected = this.specializations.find(s => s.id === id);
    return selected ? selected.label : 'اختر التخصص';
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      if (this.selectedFile.size > 10 * 1024 * 1024) {
        alert('File is too large! Max size is 10MB.');
        this.removeFile();
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);

      this.enrollmentForm.get('studentPayment.ImageFile')?.setValue(this.selectedFile);
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.enrollmentForm.get('studentPayment.ImageFile')?.reset();
  }

  get fileSize(): string {
    if (!this.selectedFile) return '';
    const sizeInKB = this.selectedFile.size / 1024;
    return sizeInKB < 1024
      ? `${sizeInKB.toFixed(1)} KB`
      : `${(sizeInKB / 1024).toFixed(1)} MB`;
  }




  onSubmit() {
    this.isLoadingsubmit = true;
    Object.keys(this.enrollmentForm.controls).forEach(key => {
      const controlErrors = this.enrollmentForm.get(key)?.errors;
      if (controlErrors) {
        console.log(key, controlErrors);
      }
    });


    // ✅ تحقق من عدد الأيام قبل ما نبعت الفورم
    const selectedDays = this.enrollmentForm.value.daysOfWeek || [];
    if (selectedDays.length !== this.requiredDaysCount) {
      this.isLoadingsubmit = false;
      this.showToast(`يجب اختيار ${this.requiredDaysCount} أيام في الأسبوع لهذه الخطة`, 'error');
      return; // وقف الفورم هنا
    }

    console.log('enrollmentform valid :', this.enrollmentForm.valid)
    console.log(this.enrollmentForm.value);   // يطبع القيم كلها
    console.log(this.enrollmentForm.errors);

    if (this.enrollmentForm.valid) {
      const formData = new FormData();
      const formValue = this.enrollmentForm.value;

      // القيم الأساسية
      formData.append('StudentId', formValue.StudentId);
      formData.append('TeacherId', formValue.TeacherId);
      formData.append('SubscriptionPlanId', formValue.SubscriptionPlanId);
      formData.append('Specialization', formValue.Specialization);
      formData.append('EnrollmentStatus', formValue.EnrollmentStatus);

      formData.append('EnrollmentFee', formValue.EnrollmentFee.toString());

      if (formValue.Discount) {
        formData.append('Discount', formValue.Discount.toString());
      }

      formData.append('StartDate', formValue.StartDate);
      if (formValue.EndDate) {
        formData.append('EndDate', formValue.EndDate);
      }

      // القيم الداخلية الخاصة بالـ studentPayment
      const payment = formValue.studentPayment;
      formData.append('studentPayment.Amount', payment.Amount.toString());
      if (payment.PaymentDate) {
        const date = new Date(payment.PaymentDate);
        formData.append('studentPayment.PaymentDate', date.toISOString());
      }
      formData.append('studentPayment.StudentPaymentStatus', payment.StudentPaymentStatus);
      formData.append('studentPayment.StudentId', payment.StudentId);
      if (payment.EnrollmentId) {
        formData.append('studentPayment.EnrollmentId', payment.EnrollmentId.toString());
      }

      // الملف (صورة الدفع)
      if (payment.ImageFile) {
        formData.append('studentPayment.ImageFile', payment.ImageFile, payment.ImageFile.name);
      }

      // ... بعد append studentPayment fields & file
      if (payment.ImageFile) {
        formData.append('studentPayment.ImageFile', payment.ImageFile, payment.ImageFile.name);
      }

      // ========= هنا نضيف الأيام والوقت =========
      const days: number[] = formValue.daysOfWeek || [];
      days.forEach(d => formData.append('DaysOfWeek', d.toString()));

      let startTimeStr = formValue.startTime; // "10:11"
      if (startTimeStr && startTimeStr.split(':').length === 2) {
        startTimeStr = `${startTimeStr}:00`; // make it "HH:mm:ss"
      }
      if (startTimeStr) {
        formData.append('StartTime', startTimeStr);
      }

      // ==========================================

      // call service
      this.enrollmentService.createEnrollment(formData).subscribe({
        next: (res) => {
          console.log('Enrollment created:', res);
          this.showToast('تم تسجيل الاشتراك بنجاح ✅', 'success');

          // Reset form + selections
          this.enrollmentForm.reset();
          this.selectedStudent = null;
          this.selectedTeacher = null;
          this.selectedFile = null;
          this.previewUrl = null;
          this.enrollmentForm.patchValue({
            studentPayment: {
              StudentPaymentStatus: 'NotRecieved',
              PaymentDate: new Date()
            }
          });



          this.isLoadingsubmit = false;
        },
        error: (err) => {
          this.isLoadingsubmit = false;
          this.showToast('حدث خطأ أثناء إنشاء الاشتراك ❌', 'error');
          console.error('Error creating enrollment', err);
        }
      });
    } else {
      this.isLoadingsubmit = false;
      this.showToast('برجاء ملء جميع الحقول المطلوبة', 'error');
    }
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

}


