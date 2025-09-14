import { SessionStatus } from "../Enums/SessionStatus.enum";

export interface SessionEditVM {

  Id:Number ,
  StartTime : Date | null ,
  SessionStatus : SessionStatus | null

}
