import { StudentPaymentStatus } from "../Enums/StudentPaymentStatus.enum";

export interface StudentPaymentCreate {
  amount: number;                          // Required (must be > 0)
  paymentDate: string;                     // Required (ISO Date string, default now)
  imageUrl?: string;                       // Optional (receipt image URL)
  studentPaymentStatus: StudentPaymentStatus; // Default: NotReceived
  imageFile?: File;                        // Optional (uploaded file in Angular)
  studentId: string;                       // Required
  enrollmentId?: number;                   // Optional
}
