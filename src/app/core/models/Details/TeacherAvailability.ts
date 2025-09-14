import { DayOfWeek } from "../Enums/DayOfWeek.enum";

export interface TeacherAvailability {
  teacherAvailabilityId: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;

  teacherId: string;

}
