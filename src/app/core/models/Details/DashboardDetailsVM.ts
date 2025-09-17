export interface DashboardDetailsVM {
  // KPIs
  totalStudents: number;
  totalTeachers: number;
  activeEnrollments: number;
  totalRevenue: number;
  totalTeacherPayout: number;

  // Charts
  enrollmentTrends: EnrollmentTrendVM[];
  revenueVsPayout: RevenueVsPayoutVM[];
  sessionsByStatus: SessionsByStatusVM[];
  studentsPerPlan: StudentsPerPlanVM[];
  studentsPerSpecialization: StudentsPerSpecializationVM[];

  // Latest Data
  latestStudents: StudentLatestVM[];
  latestPayments: PaymentLatestVM[];
}

export interface EnrollmentTrendVM {
  month: string;   // DateTime → string (ISO format from backend)
  count: number;
}

export interface RevenueVsPayoutVM {
  month: string;   // DateTime → string
  revenue: number;
  payout: number;
}

export interface SessionsByStatusVM {
  status: string;
  count: number;
}

export interface StudentsPerPlanVM {
  planName: string;
  count: number;
}

export interface StudentsPerSpecializationVM {
  specialization: string;
  count: number;
}

export interface StudentLatestVM {
  studentName: string;
  studentImg?: string;
  joinedAt?: string; // DateTime? → string | null
}

export interface PaymentLatestVM {
  studentName: string;
  studentImg?: string;
  amount: number;
  date: string; // DateTime → string
}
