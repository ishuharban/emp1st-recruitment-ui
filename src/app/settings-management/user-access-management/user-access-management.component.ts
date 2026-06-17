import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-access-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-access-management.component.html',
  styleUrl: './user-access-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserAccessManagementComponent {
 trackByIndex(i: number, _: any) { return i; }

  uiSearchQuery    = '';
  uiShowInviteForm = false;
  uiSelectedRole   = 'Recruiter';

  uiSummary = { total: 42, active: 35, pending: 4, expired: 2, disabled: 1 };

  uiUsers = [
    { name: 'Rahul Sharma', email: 'rahul@company.com',  dept: 'Information Technology', role: 'Recruiter',      scope: ['Requisitions', 'Candidates', 'Interviews'], status: 'Active',  lastLogin: '10 Jun 2026' },
    { name: 'Priya Gupta',  email: 'priya@company.com',  dept: 'Human Resources',        role: 'Hiring Manager', scope: ['Requisitions', 'Candidates'],               status: 'Active',  lastLogin: '09 Jun 2026' },
    { name: 'Amit Verma',   email: 'amit@company.com',   dept: 'Information Technology', role: 'Interviewer',    scope: ['Interviews'],                               status: 'Pending', lastLogin: '—' },
    { name: 'John Smith',   email: 'john@company.com',   dept: 'Human Resources',        role: 'HR Admin',       scope: ['All Modules'],                              status: 'Active',  lastLogin: '05 Jun 2026' },
    { name: 'Sneha Thakur', email: 'sneha@company.com',  dept: 'Human Resources',        role: 'Recruiter',      scope: ['Requisitions', 'Candidates', 'Interviews'], status: 'Active',  lastLogin: '11 Jun 2026' },
    { name: 'Vikram Singh', email: 'vikram@company.com', dept: 'Information Technology', role: 'Interviewer',    scope: ['Interviews'],                               status: 'Active',  lastLogin: '08 Jun 2026' },
  ];

  uiInvite = {
    firstName: '', lastName: '', email: '', department: 'Information Technology', role: 'Recruiter', reportingTo: 'HR Manager',
    scope: { requisitions: true, candidates: true, interviews: true, offers: true, config: false, reports: false },
    expiryDays: 7, sendWelcomeEmail: true, forcePasswordSetup: true, enableSSO: false, mfaRequired: false,
  };

  uiDeptOptions   = ['Information Technology', 'Human Resources', 'Finance', 'Marketing', 'Operations'];
  uiRoleOptions   = ['HR Administrator', 'Recruiter', 'Hiring Manager', 'Interviewer', 'Department Head'];
  uiReportingOpts = ['HR Manager', 'Senior Recruiter', 'VP HR', 'CTO'];

  readonly uiRolePermissions: Record<string, { perm: string; allowed: boolean }[]> = {
    'HR Administrator': [
      { perm: 'View Candidates', allowed: true }, { perm: 'Manage Users', allowed: true }, { perm: 'Configure Recruitment', allowed: true },
      { perm: 'Create Offers', allowed: true }, { perm: 'View Reports', allowed: true }, { perm: 'Manage Integrations', allowed: true },
    ],
    'Recruiter': [
      { perm: 'View Candidates', allowed: true }, { perm: 'Create Candidate', allowed: true }, { perm: 'Move Pipeline Stages', allowed: true },
      { perm: 'Schedule Interviews', allowed: true }, { perm: 'Create Offers', allowed: true },
      { perm: 'Configure Recruitment', allowed: false }, { perm: 'Manage Users', allowed: false },
    ],
    'Hiring Manager': [
      { perm: 'View Candidates', allowed: true }, { perm: 'Approve Requisitions', allowed: true }, { perm: 'Approve Offers', allowed: true },
      { perm: 'Review Feedback', allowed: true }, { perm: 'Create Candidate', allowed: false }, { perm: 'Manage Users', allowed: false },
    ],
    'Interviewer': [
      { perm: 'View Interview Schedule', allowed: true }, { perm: 'Submit Feedback', allowed: true }, { perm: 'View Candidate Profile', allowed: true },
      { perm: 'Create Offers', allowed: false }, { perm: 'Manage Users', allowed: false },
    ],
    'Department Head': [
      { perm: 'Approve Requisitions', allowed: true }, { perm: 'Approve Offers', allowed: true },
      { perm: 'View Reports', allowed: true }, { perm: 'Manage Users', allowed: false },
    ],
  };

  get uiSelectedRolePerms() { return this.uiRolePermissions[this.uiSelectedRole] || []; }

  get filteredUiUsers() {
    const q = this.uiSearchQuery.toLowerCase();
    if (!q) return this.uiUsers;
    return this.uiUsers.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q));
  }

  sendInvitation(): void {
    if (!this.uiInvite.firstName || !this.uiInvite.email) return;
    this.uiUsers.unshift({ name: `${this.uiInvite.firstName} ${this.uiInvite.lastName}`, email: this.uiInvite.email, dept: this.uiInvite.department, role: this.uiInvite.role, scope: ['Candidates'], status: 'Pending', lastLogin: '—' });
    this.uiShowInviteForm = false;
    this.uiInvite = { firstName: '', lastName: '', email: '', department: 'Information Technology', role: 'Recruiter', reportingTo: 'HR Manager', scope: { requisitions: true, candidates: true, interviews: true, offers: true, config: false, reports: false }, expiryDays: 7, sendWelcomeEmail: true, forcePasswordSetup: true, enableSSO: false, mfaRequired: false };
  }
}