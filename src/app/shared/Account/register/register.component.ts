import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SpecializationType } from '../../../core/models/Enums/SpecializationType.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../../core/models/Enums/Gender.enum';
import { Role } from '../../../core/models/Enums/Role.enum';
import { AccountService } from '../../../core/services/Account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent implements OnInit {

  userRegisterForm: FormGroup;
  dropdownOpen = false;
  dropdownSpecializationOpen = false;
  // genders = Object.values(Gender) as Gender[];
  Gender = Gender;
  // specializations = Object.values(SpecializationType) as SpecializationType[];
  specializations = [
    { id: SpecializationType.Foundation, label: 'تأسيس' },
    { id: SpecializationType.QuranMemorization, label: 'حفظ القرآن' },
    { id: SpecializationType.Qiraat, label: 'قراءات' }
  ];

  genders = [
    { id: Gender.Male, label: 'ذكر' },
    { id: Gender.Female, label: 'أنثى' }
  ];

  selectedSpecializations: number[] = []; // نحفظ IDs (الأرقام)


  roles = Object.values(Role);
  // selectedSpecializations: SpecializationType[] = [];

  constructor(private fb: FormBuilder, private eRef: ElementRef, private renderer: Renderer2, private accountSrv: AccountService) {
    this.userRegisterForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2)]],
      LastName: ['', [Validators.required, Validators.minLength(2)]],
      Email: ['', [Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Gender: ['', Validators.required],
      Age: [null, [Validators.required]],
      Role: Role.Admin,
      HourlyRate: [null],
      // Specializations: [[], Validators.required],
      Specializations: [[null]],
      ImageFile: [null]
    });


    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
        this.dropdownSpecializationOpen = false;
      }
    });
  }

  // لما المستخدم يضغط في أي مكان
  //  @HostListener('window:click', ['$event'])
  //   clickOutside(event: Event) {
  //     if (!this.eRef.nativeElement.contains(event.target)) {
  //       this.dropdownOpen = false;
  //       this.dropdownSpecializationOpen = false;
  //     }
  //   }


  ngOnInit() { }

  get formControls() {
    return this.userRegisterForm.controls;
  }

  // Gender dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectGender(option: Gender) {
    this.userRegisterForm.get('Gender')?.setValue(option); // نخزن الرقم (1 أو 2)
    this.dropdownOpen = false;
  }

  // get selectedGenderLabel(): string {
  //   const g = this.userRegisterForm.get('Gender')?.value;
  //   if (g === this.genders[0].id) return 'ذكر';
  //   if (g === this.genders[1].id) return 'أنثى';
  //   return '';
  // }

  // Specializations dropdown
  toggleDropdownSpecialization() {
    this.dropdownSpecializationOpen = !this.dropdownSpecializationOpen;
  }

  onSpecializationChange(event: any) {
    const value = +event.target.value; // رقم
    if (event.target.checked) {
      this.selectedSpecializations.push(value);
    } else {
      this.selectedSpecializations = this.selectedSpecializations.filter(s => s !== value);
    }
    this.userRegisterForm.patchValue({ Specializations: this.selectedSpecializations });
  }

  get selectedSpecializationsLabels(): string {
    return this.specializations
      .filter(s => this.selectedSpecializations.includes(s.id))
      .map(s => s.label)
      .join(', ');
  }

  get selectedGenderLabel(): string {
    const selectedId = this.userRegisterForm.get('Gender')?.value;
    const selected = this.genders.find(g => g.id === selectedId);
    return selected ? selected.label : '';
  }





  isSpecializationSelected(id: number): boolean {
    return this.selectedSpecializations.includes(id);
  }


  // File change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userRegisterForm.patchValue({ ImageFile: file });
    }
  }

  // Submit
  onSubmit() {
    if (this.userRegisterForm.valid) {
      console.log(this.userRegisterForm.value);
      // alert('Form Submitted Successfully!');

      this.accountSrv.Register(this.userRegisterForm.value).subscribe({
        next: () => console.log(`User "${this.userRegisterForm.value.FirstName + " " + this.userRegisterForm.value.LastName}" registered successfully.`),
        error: err => console.error(`Error Registering User  "${this.userRegisterForm.value}"`, err)
      });
    }


  }

}

