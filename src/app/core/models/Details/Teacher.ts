import { Gender } from "../Enums/Gender.enum";
import { SpecializationType } from "../Enums/SpecializationType.enum";
import { TeacherAvailability } from "./TeacherAvailability";
import { TeacherPayout } from "./TeacherPayout";

export interface Teacher {
  teacherId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  profileImg?: string;
  phoneNumber?: string;
  dateCreated?: string;
  hourlyRate?: number;
  lastLoginDate?: string;
  specializations?: SpecializationType[];
  availability?: TeacherAvailability[];
  payouts?:TeacherPayout[];
  enrollmentsCount : number

}
