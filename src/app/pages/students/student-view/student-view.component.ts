import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { StudentDTO, StudentStatus, GuardianDTO } from '../student.model';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  standalone: false,
})
export class StudentViewComponent implements OnInit {
  student: StudentDTO | null = null;
  tenantId = '';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.tenantId = this.route.snapshot.paramMap.get('tenantId')!;
    const studentId = +this.route.snapshot.paramMap.get('studentId')!;
    this.studentService.getStudentDetails(this.tenantId, studentId).subscribe({
      next: (res) => {
        this.student = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  getInitial(): string {
    return (this.student?.firstName?.charAt(0) ?? '?').toUpperCase();
  }

  getStatusStyle(status: StudentStatus): Record<string, string> {
    const map: Record<string, Record<string, string>> = {
      ACTIVE: { color: '#00796b', 'background-color': '#e0f7fa' },
      INACTIVE: { color: '#c62828', 'background-color': '#ffebee' },
    };
    return map[status] ?? { color: '#555', 'background-color': '#f0f0f0' };
  }

  getPrimaryGuardian(): GuardianDTO | undefined {
    return this.student?.guardians?.find((g) => g.isPrimary);
  }

  goBack(): void {
    this.router.navigate(['/students/search']);
  }
}
