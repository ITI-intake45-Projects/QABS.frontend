export interface TeacherAvailabilityCreateVM {
  dayOfWeek: number;      // matches DayOfWeek enum in C#
  startTime: string;      // TimeSpan → string (e.g., "09:00:00")
  endTime: string;        // TimeSpan → string (e.g., "11:30:00")
  teacherId?: string;     // optional because you didn't mark it [Required]
}

