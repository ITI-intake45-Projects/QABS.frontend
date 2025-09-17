import { Data } from "@angular/router";
import { SessionStatus } from "../Enums/SessionStatus.enum";

export interface Session {

  id: number;
  startTime: Date | null;       // DateTime? -> string | undefined (JSON ISO date)
  status?: SessionStatus;   // enum
  amount?: number;
  enrollmentId: number;
  duration : number;

}
