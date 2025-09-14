import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models/Details/Teacher';
import { StudentList } from '../../../core/models/Details/StudentList';
import { AccountService } from '../../../core/services/Account.service';
import { SpecializationType } from '../../../core/models/Enums/SpecializationType.enum';

@Component({
  selector: 'app-teacherList',
  templateUrl: './teacherList.component.html',
  styleUrls: ['./teacherList.component.css'],
  standalone: false
})
export class TeacherListComponent implements OnInit {

  constructor(
    private teacherService: TeacherService,
    private AccService: AccountService
  ) { }

  ngOnInit() {
    this.loadTeachers();
    console.log('teacher is  : ', this.teacher)
  }


  students: StudentList[] = [];
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  searchTerm: string = '';
  isLoading = false;
  selectedSpecializations: number[] = []; // الـ id المختارة

  teacher: Teacher | null = null; // يبدأ Null مش {}

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



  getEnrolledStudents(teacherId: string) {

    this.teacher = this.teachers.find(t => t.teacherId == teacherId) || null;
    console.log('teacher.spec :', this.teacher?.specializations)
    console.log('teacher', this.teacher)

    console.log('teacheid : ', teacherId)
    this.teacherService.getStudentsByTeacherId(teacherId).subscribe({
      next: (res) => {
        console.log('Enrolled students:', res);
        this.students = res.data || [];
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
    this.AccService.DeleteAccount(teacherId).subscribe({
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

  newSlot = {
    day: '',
    start: '',
    end: ''
  };

  openAddModal() {
    this.showAddModal = true;
  }
  openEditModal() {
    this.showEditModal = true;
  }


  closeAddModal() {
    this.showAddModal = false;
    this.newSlot = { day: '', start: '', end: '' }; // reset
  }
  closeEditModal() {
    this.showEditModal = false;
    this.newSlot = { day: '', start: '', end: '' }; // reset
  }

  saveNewSlot() {
    if (this.newSlot.day && this.newSlot.start && this.newSlot.end) {
      this.availability.push({ ...this.newSlot });
      this.closeAddModal();
    }
  }


  // دوال التحكم
  editSlot(slot: any) {
    console.log('Edit clicked:', slot);
    // تفتح مودال أو فورم للتعديل
  }

  deleteSlot(index: number) {
    console.log('Delete clicked:', this.availability[index]);
    this.availability.splice(index, 1); // تمسح العنصر من الجدول
  }

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



}


