import { Gender } from "../Enums/Gender.enum";
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
}
