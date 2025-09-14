import { Gender } from "../Enums/Gender.enum";
import { Enrollment } from "./Enrollment";
import { StudentPayment } from "./StudentPayment";

export interface Student {
   studentId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  profileImg?: string;
  dateCreated?: string;
  lastLoginDate?: string;
  studentpayments?: StudentPayment[];
  // enrollments?: Enrollment[];
}
