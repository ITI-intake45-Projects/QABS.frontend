import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/services/Account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;

    // رسالة الخطأ أو النجاح
  message = '';
  messageType: 'success' | 'error' = 'success';
  showMessage = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
     private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  Send() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.toastr.warning('⚠️ Please fill all required fields correctly.', 'Validation Error');
    return;
  }
    console.log(this.loginForm.value)

    this.isLoading = true;

    this.accountService.Login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('✅ Login successful:', res);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
      console.error('❌ Login failed:', err);
      this.isLoading = false;

      // رسالة خطأ واضحة للمستخدم
      this.showToast(
          err?.error?.message || 'الإيميل أو كلمة المرور خاطئة، حاول مرة أخرى',
          'error'
        );
    }
  });
  }



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
