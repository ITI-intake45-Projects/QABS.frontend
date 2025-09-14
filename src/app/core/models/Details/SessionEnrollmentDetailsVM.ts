import { SessionStatus } from "../Enums/SessionStatus.enum";

export interface SessionEnrollmentDetailsVM {
  sessionId: number;
  startTime: Date | null ;
  status: SessionStatus | null;
  enrollmentId: number;
  teacherName: string | null;
  studentName: string | null;
  teacherImg: string | null;
  studentImg: string | null;
}
