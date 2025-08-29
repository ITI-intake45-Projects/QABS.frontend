import { Gender } from "../Enums/Gender.enum";
import { SpecializationType } from "../Enums/SpecializationType.enum";

export interface UserRegister {
  FirstName : string;
  LastName : string;
  Email? : string;
  Password : string;
  Gender : Gender;
  Age : number;
  // ProfileImg? : string;
  // DateCreated? : Date;
  // ImageFile? : File;
  Role : string;
  HourlyRate? : number;
  Specializations? : SpecializationType[];
}

