import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacherList',
  templateUrl: './teacherList.component.html',
  styleUrls: ['./teacherList.component.css'],
  standalone: false
})
export class TeacherListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   students = [
     { name: 'Omar Khaled', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'Alice Johnson', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'Mark Smith', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'John Doe', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'Sarah Ali', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
       { name: 'Omar Khaled', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'Alice Johnson', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'Mark Smith', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'John Doe', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
    { name: 'Sarah Ali', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ahmed_el-Tayeb_1.jpg/640px-Ahmed_el-Tayeb_1.jpg' },
  ];

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


}


