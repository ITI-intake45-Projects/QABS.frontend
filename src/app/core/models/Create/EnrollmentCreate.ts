import { SpecializationType } from "../Enums/SpecializationType.enum";
import { StudentPaymentCreate } from "./StudentPaymentCreate";

export interface EnrollmentCreate {
  studentId: string;                 // Required
  teacherId: string;                 // Required
  subscriptionPlanId: number;        // Required
  specialization: SpecializationType; // Required (enum in TS)
  enrollmentFee: number;             // Required (monthly fee)
  discount?: number;                 // Optional (subscription discount)
  startDate: string;                 // Required (ISO Date string)
  endDate?: string;                  // Optional (ISO Date string)
  studentPayment?: StudentPaymentCreate; // Optional nested object
  daysOfWeek: number[];              // Required (0=Sunday ... 6=Saturday)
  startTime: string;                 // Required (HH:mm:ss format)
}



