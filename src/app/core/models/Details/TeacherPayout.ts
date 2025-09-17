import { Session } from "./Session";

export interface TeacherPayout {
  id: number;
  teacherId: string;
  teacherName: string;
  paidAt: Date; 
  totalHours: number;
  totalAmount: number;
  hourlyRate?: number;
  teacherImage?: string;
  imageUrl?: string;
  sessions?: Session[];
}
