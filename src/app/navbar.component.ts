import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MegaLink {
  label: string;
  sub?: string;
  icon: string;
  route: string;
  navigateTo?: string;
}

export interface MegaSection {
  title: string;
  links: MegaLink[];
}

export interface NavItem {
  id: string;
  label: string;
  type: 'mega' | 'simple';
  cta?: boolean;
  sections?: MegaSection[];
  links?: MegaLink[];
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Output() navigate = new EventEmitter<string>();
  openId: string | null = null;
  activeId = 'dashboard';
  mobileMenuOpen = false;
  settingsOpen = false;

  readonly recruitmentItems = [
    { label: 'Dashboard',                view: 'req-dashboard',        sub: 'Recruitment overview & KPIs',        icon: 'chart' },
    { label: 'Requisition Management',   view: 'requisition',           sub: 'Create & manage requisitions',       icon: 'file' },
    { label: 'Job Posting',              view: 'job-posting',           sub: 'Publish & manage job listings',      icon: 'file' },
    { label: 'Candidate Pipeline',       view: 'candidate-pipeline',    sub: 'Kanban candidate tracking',          icon: 'settings' },
    { label: 'Interview Management',     view: 'interview-management',  sub: 'Schedule & evaluate interviews',     icon: 'calendar' },
    { label: 'Candidate Documents',      view: 'candidate-documents',   sub: 'Verify & manage documents',          icon: 'file' },
    { label: 'Offer Management',         view: 'offer-management',      sub: 'Release & track offers',             icon: 'star' },
    { label: 'Reports & Analytics',      view: 'reports-analytics',     sub: 'Recruitment insights & reports',     icon: 'chart' },
  ];

  readonly configSection1 = [
    { label: 'Recruitment Settings',    view: 'recruitment-settings',  sub: 'Localisation & global settings',     icon: 'settings' },
    { label: 'Pipeline Setup',          view: 'pipeline-setup',         sub: 'Configure hiring stages',            icon: 'settings' },
    { label: 'Candidate Form Builder',  view: 'candidate-form-builder', sub: 'Customise application forms',        icon: 'settings' },
    { label: 'Match Analysis Setup',    view: 'match-analysis-setup',   sub: 'Scoring parameters & rules',         icon: 'chart' },
  ];

  readonly configSection2 = [
    { label: 'Email & Notification Setup', view: 'email-templates',    sub: 'Templates, channels & reminders',    icon: 'bell' },
    { label: 'Interview Templates',        view: 'interview-templates', sub: 'Competencies & scorecards',          icon: 'file' },
  ];

  readonly configSection3 = [
    { label: 'User Invitation',          view: 'user-invitation',       sub: 'Invite & manage access',             icon: 'user' },
    { label: 'Access Control',           view: 'access-control',        sub: 'Roles & permissions',                icon: 'user' },
    { label: 'Workflow Configuration',   view: 'workflow-config',       sub: 'Approval & process rules',           icon: 'clock' },
    { label: 'Integrations',             view: 'integrations',          sub: 'Third-party connections',            icon: 'settings' },
    { label: 'Automation Rules',         view: 'automation-rules',      sub: 'Trigger-based automation',           icon: 'clock' },
  ];

  readonly settingsItems = [
    { label: 'Recruitment Settings',        view: 'recruitment-settings',  icon: 'gear' },
    { label: 'Pipeline Setup',              view: 'pipeline-setup',         icon: 'pipeline' },
    { label: 'Candidate Form Builder',      view: 'candidate-form-builder', icon: 'form' },
    { label: 'Match Analysis Setup',        view: 'match-analysis-setup',   icon: 'analysis' },
    { label: 'Email & Notification Setup',  view: 'email-templates',        icon: 'email' },
    { label: 'Interview Templates',         view: 'interview-templates',    icon: 'interview' },
    { label: 'User Invitation',             view: 'user-invitation',        icon: 'user' },
    { label: 'Access Control',              view: 'access-control',         icon: 'lock' },
    { label: 'Workflow Configuration',      view: 'workflow-config',        icon: 'workflow' },
    { label: 'Integrations',               view: 'integrations',            icon: 'integration' },
    { label: 'Automation Rules',            view: 'automation-rules',       icon: 'automation' },
  ];

  navItems: NavItem[] = [
    {
      id: 'attendance',
      label: 'Attendance',
      type: 'mega',
      sections: [
        {
          title: 'Attendance',
          links: [
            { label: 'Attendance Log', icon: 'calendar', route: '/attendance/log' },
            { label: 'Remote Log', icon: 'search', route: '/attendance/remote' },
            { label: 'Timesheet', icon: 'clock', route: '/attendance/timesheet' },
            { label: 'Shift & Weekly Off', icon: 'settings', route: '/attendance/shift' },
          ],
        },
        {
          title: 'Leave',
          links: [
            { label: 'New Request', icon: 'bell', route: '/leave/new' },
            { label: 'Status', icon: 'file', route: '/leave/status' },
          ],
        },
      ],
    },
    {
      id: 'self-review',
      label: 'Self Review',
      type: 'simple',
      links: [
        { label: 'Performance Review', icon: 'star', route: '/review/performance' },
        { label: 'Goals', icon: 'target', route: '/review/goals' },
      ],
    },
    {
      id: 'travel-expenditure',
      label: 'Travel & Expenditure',
      type: 'mega',
      sections: [
        {
          title: 'Travel',
          links: [
            { label: 'New Request', icon: 'plane', route: '/travel/new' },
            { label: 'Status', icon: 'file', route: '/travel/status' },
          ],
        },
        {
          title: 'Expenditure',
          links: [
            { label: 'New Request', icon: 'dollar', route: '/expenditure/new' },
            { label: 'Status', icon: 'chart', route: '/expenditure/status' },
          ],
        },
      ],
    },
    {
      id: 'asset',
      label: 'Asset',
      type: 'simple',
      links: [
        { label: 'My Assets', icon: 'laptop', route: '/asset/my' },
        { label: 'Request Asset', icon: 'file', route: '/asset/request' },
      ],
    },
    {
      id: 'approvals',
      label: 'Approvals',
      type: 'mega',
      sections: [
        {
          title: 'Work & Attendance',
          links: [
            { label: 'Leave', icon: 'calendar', route: '/approvals/leave' },
            { label: 'Attendance', icon: 'file', route: '/approvals/attendance' },
            { label: 'Remote Log', icon: 'search', route: '/approvals/remote' },
            { label: 'Timesheet', icon: 'clock', route: '/approvals/timesheet' },
          ],
        },
        {
          title: 'Financial Requests',
          links: [
            { label: 'Travel', icon: 'plane', route: '/approvals/travel' },
            { label: 'Expenditure', icon: 'dollar', route: '/approvals/expenditure' },
          ],
        },
        {
          title: 'Employee Actions',
          links: [
            { label: 'Employee', icon: 'user', route: '/approvals/employee' },
            { label: 'Resignation', icon: 'file', route: '/approvals/resignation' },
          ],
        },
        {
          title: 'Assets & Resources',
          links: [{ label: 'Asset', icon: 'laptop', route: '/approvals/asset' }],
        },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      type: 'simple',
      links: [
        { label: 'Analytics', icon: 'chart', route: '/reports/analytics' },
        { label: 'Export', icon: 'file', route: '/reports/export' },
      ],
    },
  ];

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  toggle(id: string): void {
    this.openId = this.openId === id ? null : id;
  }

  onNavClick(item: NavItem): void {
    this.activeId = item.id;
    this.toggle(item.id);
  }

  toggleSettings(e: MouseEvent): void {
    e.stopPropagation();
    this.settingsOpen = !this.settingsOpen;
    this.openId = null;
  }

  onSettingsItemClick(view: string): void {
    this.activeId = 'settings';
    this.navigate.emit(view);
    this.settingsOpen = false;
  }

  onRecruitmentItemClick(view: string): void {
    this.activeId = 'recruitment-menu';
    this.navigate.emit(view);
    this.closeAllMenus();
  }

  onRequisitionClick(): void {
    this.activeId = 'requisition';
    this.navigate.emit('requisition');
    this.closeAllMenus();
  }

  onRequisitionApprovalClick(): void {
    this.activeId = 'approvals-menu';
    this.navigate.emit('requisition-approval');
    this.closeAllMenus();
  }

  onApprovalLinkClick(view: string): void {
    this.activeId = 'approvals-menu';
    this.navigate.emit(view);
    this.closeAllMenus();
  }

  onLinkClick(link: MegaLink): void {
    if (link.navigateTo) {
      this.navigate.emit(link.navigateTo);
    }
    this.closeAllMenus();
  }

  onLogoClick(): void {
    this.activeId = 'dashboard';
    this.navigate.emit('dashboard');
    this.closeAllMenus();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.mobileMenuOpen) {
      this.openId = null;
    }
  }

  isOpen(id: string): boolean {
    return this.openId === id;
  }

  closeAllMenus(): void {
    this.openId = null;
    this.mobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(e: MouseEvent): void {
    if (!(e.target as HTMLElement).closest('.navbar')) {
      this.openId = null;
      this.settingsOpen = false;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 1024 && this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }
}
