export interface UserStats {
  totalTenants: number;
  totalStudents: number;
  totalGuardians: number;
  totalStaff: number;
  totalAuditLogs: number;
  auditLogsByMonth: MonthlyAuditLog[];
}

export interface MonthlyAuditLog {
  month: string;
  count: number;
}

export interface AcademicsStats {
  totalPublishedReports: number;
  totalDraftReports: number;
  totalUnpublishedReports: number;
  totalActiveEnrolledStudents: number;
  totalClasses: number;
  totalCourses: number;
  totalActiveClassCourses: number;
  totalOutboxNotifications: number;
}



export interface FinanceStats {
  invoicesGeneratedCount: number;
  monthlyStats: MonthlySystemStats[];

}

export interface MonthlySystemStats {
  month: string;
  journalLinesCount: number;
  studentFeeTransactionsCount: number;
  totalStudentFeeTransactionAmount: number;
}


export interface DashboardStats {
  users: UserStats;
  academics: AcademicsStats;
  billing: FinanceStats;
}
