import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/Account.service';
import { Gender } from '../../../core/models/Enums/Gender.enum';
import { Role } from '../../../core/models/Enums/Role.enum';
import { SpecializationType } from '../../../core/models/Enums/SpecializationType.enum';
import { UserRegister } from '../../../core/models/Create/UserRegister';

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

  Gender = Gender;
  genders = [
    { id: Gender.Male, label: 'ذكر' },
    { id: Gender.Female, label: 'أنثى' }
  ];

  roles = Object.values(Role);

  specializations = [
    { id: SpecializationType.Foundation, label: 'تأسيس' },
    { id: SpecializationType.QuranMemorization, label: 'حفظ القرآن' },
    { id: SpecializationType.Qiraat, label: 'قراءات' }
  ];

  selectedSpecializations: number[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private eRef: ElementRef,
    private renderer: Renderer2,
    private accountSrv: AccountService
  ) {
    this.userRegisterForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2)]],
      LastName: ['', [Validators.required, Validators.minLength(2)]],
      Email: ['', [Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Gender: ['', Validators.required],
      Age: [null, [Validators.required]],
      Role: [Role.Admin, Validators.required],
      HourlyRate: [null],
      Specializations: [[]],
      ImageFile: [null]
    });

    // Close dropdown on outside click
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
        this.dropdownSpecializationOpen = false;
      }
    });
  }

  ngOnInit() {}

  get formControls() {
    return this.userRegisterForm.controls;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectGender(option: Gender) {
    this.userRegisterForm.get('Gender')?.setValue(option);
    this.dropdownOpen = false;
  }

  toggleDropdownSpecialization() {
    this.dropdownSpecializationOpen = !this.dropdownSpecializationOpen;
  }

  onSpecializationChange(event: any) {
    const value = +event.target.value;
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.userRegisterForm.patchValue({ ImageFile: file });
    }
  }

  onSubmit() {
    if (this.userRegisterForm.valid) {
      const formData = new FormData();

      const formValue: UserRegister = this.userRegisterForm.value;

      formData.append('FirstName', formValue.FirstName);
      formData.append('LastName', formValue.LastName);
      if (formValue.Email) formData.append('Email', formValue.Email);
      formData.append('Password', formValue.Password);
      formData.append('Gender', formValue.Gender.toString());
      formData.append('Age', formValue.Age.toString());
      formData.append('Role', formValue.Role);
      if (formValue.HourlyRate) formData.append('HourlyRate', formValue.HourlyRate.toString());

      if (this.selectedSpecializations.length > 0) {
        this.selectedSpecializations.forEach(s => formData.append('Specializations', s.toString()));
      }

      if (this.selectedFile) {
        formData.append('ImageFile', this.selectedFile);
      }

      this.accountSrv.Register(formData).subscribe({
        next: (res) =>{
          console.log(res);
          if(res.succeeded){
            console.log(
              `User "${formValue.FirstName + ' ' + formValue.LastName}" registered successfully.✅`
            )
          }
          else{
            console.log(
              `User "${formValue.FirstName + ' ' + formValue.LastName}" registered Failed. ❌`
            )
          }

        }
          ,
        error: err => console.error('Error Registering User', err)
      });
    }
  }
}
