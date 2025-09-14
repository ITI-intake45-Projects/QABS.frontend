import { SessionStatus } from "../Enums/SessionStatus.enum";

export interface SessionCreateVM {
  startTime: Date;
  status: SessionStatus;
  amount: number | null;
  enrollmentId: number;
}
