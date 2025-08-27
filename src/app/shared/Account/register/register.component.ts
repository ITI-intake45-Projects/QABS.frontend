import { Component, OnInit } from '@angular/core';
import { SpecializationType } from '../../../core/models/Enums/SpecializationType.enum';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Gender } from '../../../core/models/Enums/Gender.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent implements OnInit {
  ngOnInit() {}

   userRegisterForm: FormGroup;

  genders = Object.values(Gender);
  specializations = Object.values(SpecializationType) as SpecializationType[];
  selectedSpecializations: SpecializationType[] = [];

  constructor(private fb: FormBuilder) {
    this.userRegisterForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2)]],
      LastName: ['', [Validators.required, Validators.minLength(2)]],
      Email: ['', [Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Gender: ['', Validators.required],
      Age: [null, [Validators.required, Validators.min(10)]],
      Role: ['', Validators.required],
      HourlyRate: [null],
      Specializations: [[]],
      ImageFile: [null]
    });
  }

  get formControls() {
    return this.userRegisterForm.controls;
  }

  onSpecializationChange(event: any) {
    const value = event.target.value as SpecializationType;
    if (event.target.checked) {
      this.selectedSpecializations.push(value);
    } else {
      this.selectedSpecializations = this.selectedSpecializations.filter(s => s !== value);
    }
    this.userRegisterForm.patchValue({ Specializations: this.selectedSpecializations });
  }

  isSpecializationSelected(s: SpecializationType): boolean {
    return this.selectedSpecializations.includes(s);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.userRegisterForm.patchValue({ ImageFile: file });
    }
  }

  onSubmit() {
    if (this.userRegisterForm.valid) {
      console.log(this.userRegisterForm.value);
      alert('Form Submitted Successfully!');
    }
  }
}
