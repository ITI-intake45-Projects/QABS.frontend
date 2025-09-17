export interface TeacherPayoutCreateVM {
  teacherId: string;
  paidAt: Date;
  imageUrl?: string;
  totalHours?: number;
  totalAmount?: number;
  imageFile?: File;         // مقابل IFormFile
  sessionIds?: number[];
}
