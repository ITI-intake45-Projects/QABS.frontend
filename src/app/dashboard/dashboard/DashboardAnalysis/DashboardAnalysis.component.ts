import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import {
  DashboardDetailsVM,
  EnrollmentTrendVM,
  PaymentLatestVM,
  RevenueVsPayoutVM,
  SessionsByStatusVM,
  StudentLatestVM,
  StudentsPerPlanVM,
  StudentsPerSpecializationVM
} from '../../../core/models/Details/DashboardDetailsVM';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ChartComponent,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexGrid,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-DashboardAnalysis',
  templateUrl: './DashboardAnalysis.component.html',
  styleUrls: ['./DashboardAnalysis.component.css'],
  standalone: false
})
export class DashboardAnalysisComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | null = null;
  isLoading = false;

  // KPIs
  dashboardData!: DashboardDetailsVM;

  // Charts data
  enrollmentTrends: EnrollmentTrendVM[] = [];
  revenueVsPayouts: RevenueVsPayoutVM[] = [];
  sessionsByStatus: SessionsByStatusVM[] = [];
  studentsPerPlan: StudentsPerPlanVM[] = [];
  studentsPerSpecialization: StudentsPerSpecializationVM[] = [];

  // Latest Data
  latestStudents: StudentLatestVM[] = [];
  latestPayments: PaymentLatestVM[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.dashboardService.loadDashboardData().subscribe({
      next: (res) => {
        console.log('Dashboard data:', res.data);

        this.dashboardData = res.data || [];
        this.enrollmentTrends = res.data.enrollmentTrends || [];
        this.revenueVsPayouts = res.data.revenueVsPayouts || [];
        this.sessionsByStatus = res.data.sessionsByStatus || [];
        this.studentsPerPlan = res.data.studentsPerPlan || [];
        this.studentsPerSpecialization = res.data.studentsPerSpecialization || [];
        this.latestStudents = res.data.latestStudents || [];
        this.latestPayments = res.data.latestPayments || [];

        this.enrollmentsChart();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('خطأ أثناء جلب بيانات لوحة التحكم:', err);
        this.isLoading = false;
      }
    });
  }

enrollmentsChart() {
 this.chartOptions = {
  series: [
    {
      name: "الاشتراكات",
      data: this.enrollmentTrends.map(x => x.count)
    }
  ],
  chart: {
    type: "line",
    height: 400,
    toolbar: { show: false },
    animations: {
      enabled: true,
      speed: 2000, // ⏳ أبطأ من الافتراضي (800ms)
      animateGradually: {
        enabled: true,
        delay: 500 // ✅ تأخير بين النقاط
      },
      dynamicAnimation: {
        enabled: true,
        speed: 1200
      }
    }
  },
  stroke: {
    curve: "smooth",
    width: 6
  },
  dataLabels: {
    enabled: true
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5
    }
  },
  xaxis: {
    categories: this.enrollmentTrends.map(x =>
      new Date(x.month).toLocaleDateString("ar-EG", {
        month: "long",
        year: "numeric"
      })
    ),
    labels: {
      style: {
        fontSize: "16px",
        fontWeight: 600,
        colors: "#000"
      }
    }
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} طالب`
    }
  }
};

}

}
