import { EnrollmentStatus } from "../Enums/EnrollmentStatus.enum";
import { SpecializationType } from "../Enums/SpecializationType.enum";
import { Session } from "./Session";
import { SubscribtionPlan } from "./SubscribtionPlan";

export interface Enrollment {
   id: number;
  studentId?: string;
  studentName?: string;
  teacherId?: string;
  teacherName?: string;
  studentImg?: string;
  teacherImg?: string;
  enrollmentFee: number;          // السعر الشهري
  discount?: number;              // الخصم على الاشتراك
  actualFee?: number;             // السعر الفعلي بعد الخصم

  specializationType: SpecializationType;
  enrollmentStatus: EnrollmentStatus;
  startDate?: string;             // في TS بنخليها string عشان JSON بيجي كـ ISO date
  endDate?: string;

  studentPaymentAmount: number;
  remainingSessions: number;

  totalSessions: number;          // بيجي من الـ backend كـ property
  subscriptionPlanDetails: SubscribtionPlan;
  sessions?: Session[];
}
