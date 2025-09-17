import { Gender } from "../Enums/Gender.enum";

export interface StudentListMoreInfo {
  studentId: string
  fullName: string
  profileImg: string
  gender: Gender;
  age: number;

}

