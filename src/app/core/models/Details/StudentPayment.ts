import { Enrollment } from "./Enrollment";

export interface StudentPayment {
  id: number;
  amount: number;              // المبلغ المدفوع
  paymentDate: Date;           // أو ممكن تخليها string لو جايالك ISO string من الـ API
  imageUrl?: string;           // صورة من إيصال الدفع (اختياري)

  studentName: string;         // اسم الطالب

  enrollmentDetails: Enrollment; // تفاصيل التسجيل المرتبط بالدفع
}
