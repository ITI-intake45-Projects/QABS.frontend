import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/services/Account.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';


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
  // @ViewChild(ToastContainerDirective, { static: true }) toastContainer!: ToastContainerDirective;

  // رسالة الخطأ أو النجاح
  message = '';
  messageType: 'success' | 'error' = 'success';
  showMessage = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private cookieService: CookieService,
     private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserNameOrEmail: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });

    //  this.toastr.overlayContainer = this.toastContainer;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  Send() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    this.toastr.warning(
  ' رجاءا ملء جميع الحقول المطلوبة بشكل صحيح');
    return;
  }
    console.log(this.loginForm.value)

    this.isLoading = true;

    this.accountService.Login(this.loginForm.value).subscribe({
      next: (res) => {
        if(res == null){
          console.error('❌ Login failed:');
          this.isLoading = false;

          // رسالة خطأ واضحة للمستخدم
          this.showToast('الإيميل أو كلمة المرور خاطئة، حاول مرة أخرى',
              'error'
            );
        }
        console.log('✅ Login successful:', res);
        this.cookieService.set('Token', res.token);
        this.cookieService.set('Role', res.role);

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
