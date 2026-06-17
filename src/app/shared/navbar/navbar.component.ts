import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

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


  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  constructor(private router: Router) {}

  private readonly viewToPath: Record<string, string> = {
    'dashboard':              '/dashboard',
    'requisition':            '/hr/requisition',
    'requisition-approval':   '/hr/requisition',
    'recruitment-settings':   '/setting/settings',
    'pipeline-setup':         '/setting/pipeline-setup',
    'candidate-form-builder': '/setting/candidate-form',
    'match-analysis-setup':   '/setting/match-analysis',
    'email-templates':        '/setting/email-templates',
    'interview-templates':    '/setting/interview-templates',
    'user-invitation':        '/setting/user-invitation',
    'access-control':         '/setting/access-control',
    'workflow-config':        '/setting/workflow',
    'integrations':           '/setting/integrations',
    'automation-rules':       '/setting/automation-rules',
    'req-dashboard':          '/dashboard',
    'job-posting':            '/hr/jobs',
    'candidate-pipeline':     '/hr/candidate-pipeline',
    'interview-management':   '/hr/interviews',
    'candidate-documents':    '/hr/documents',
    'offer-management':       '/hr/offers',
    'reports-analytics':      '/hr/reports',
    'candidate-timeline':     '/hr/timeline',
  };

  private routeTo(view: string) {
    const path = this.viewToPath[view] || '/' + view;
    this.router.navigate([path]);
  }

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
    this.routeTo(view);
    this.closeAllMenus();
  }

  onRecruitmentItemClick(view: string): void {
    this.activeId = 'recruitment-menu';
    this.routeTo(view);
    this.closeAllMenus();
  }

  onRequisitionClick(): void {
    this.activeId = 'requisition';
    this.routeTo('requisition');
    this.closeAllMenus();
  }

  onRequisitionApprovalClick(): void {
    this.activeId = 'approvals-menu';
    this.routeTo('requisition-approval');
    this.closeAllMenus();
  }

  onApprovalLinkClick(view: string): void {
    this.activeId = 'approvals-menu';
    this.routeTo(view);
    this.closeAllMenus();
  }

  onLinkClick(link: MegaLink): void {
    if (link.navigateTo) {
      this.routeTo(link.navigateTo);
    }
    this.closeAllMenus();
  }

  onLogoClick(): void {
    this.activeId = 'dashboard';
    this.routeTo('dashboard');
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

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}
