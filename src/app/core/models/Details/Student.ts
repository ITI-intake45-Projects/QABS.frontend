import { StudentPayment } from "./StudentPayment";

export interface Student {
   studentId: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | null;
  age: number;
  profileImg?: string;
  dateCreated?: string;
  lastLoginDate?: string;
  studentpayments?: StudentPayment[];
}
