import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';
import { DashboardComponent } from './dashboard.component';
import { RequisitionComponent } from './requisition.component';
import { SettingsComponent } from './settings.component';
import { CandidatePipelineComponent } from './candidate-pipeline.component';
import { CandidateTimelineComponent } from './candidate-timeline.component';
import { JobPostingComponent } from './job-posting.component';
import { InterviewManagementComponent } from './interview-management.component';
import { CandidateDocumentsComponent } from './candidate-documents.component';
import { OfferManagementComponent } from './offer-management.component';
import { AccessControlComponent } from './access-control.component';

type AppView =
  | 'dashboard'
  | 'requisition'
  | 'requisition-approval'
  | 'recruitment-settings'
  | 'pipeline-setup'
  | 'candidate-form-builder'
  | 'match-analysis-setup'
  | 'email-templates'
  | 'interview-templates'
  | 'user-invitation'
  | 'access-control'
  | 'workflow-config'
  | 'integrations'
  | 'automation-rules'
  | 'req-dashboard'
  | 'job-posting'
  | 'candidate-pipeline'
  | 'interview-management'
  | 'candidate-documents'
  | 'offer-management'
  | 'reports-analytics'
  | 'candidate-timeline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    DashboardComponent,
    RequisitionComponent,
    SettingsComponent,
    CandidatePipelineComponent,
    CandidateTimelineComponent,
    JobPostingComponent,
    InterviewManagementComponent,
    CandidateDocumentsComponent,
    OfferManagementComponent,
    AccessControlComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  currentView: AppView = 'dashboard';

  private readonly viewToHash: Record<AppView, string> = {
    'dashboard':              '#/dashboard',
    'requisition':            '#/requisition',
    'requisition-approval':   '#/requisition-approval',
    'recruitment-settings':   '#/settings/recruitment',
    'pipeline-setup':         '#/settings/pipeline',
    'candidate-form-builder': '#/settings/candidate-form',
    'match-analysis-setup':   '#/settings/match-analysis',
    'email-templates':        '#/settings/email-templates',
    'interview-templates':    '#/settings/interview-templates',
    'user-invitation':        '#/settings/user-invitation',
    'access-control':         '#/settings/access-control',
    'workflow-config':        '#/settings/workflow',
    'integrations':           '#/settings/integrations',
    'automation-rules':       '#/settings/automation',
    'req-dashboard':          '#/recruitment/dashboard',
    'job-posting':            '#/recruitment/jobs',
    'candidate-pipeline':     '#/recruitment/pipeline',
    'interview-management':   '#/recruitment/interviews',
    'candidate-documents':    '#/recruitment/documents',
    'offer-management':       '#/recruitment/offers',
    'reports-analytics':      '#/recruitment/reports',
    'candidate-timeline':     '#/recruitment/timeline',
  };

  private readonly hashToView: Record<string, AppView> = {
    '#/dashboard':                   'dashboard',
    '#/requisition':                 'requisition',
    '#/requisition-approval':        'requisition-approval',
    '#/settings/recruitment':        'recruitment-settings',
    '#/settings/pipeline':           'pipeline-setup',
    '#/settings/candidate-form':     'candidate-form-builder',
    '#/settings/match-analysis':     'match-analysis-setup',
    '#/settings/email-templates':    'email-templates',
    '#/settings/interview-templates':'interview-templates',
    '#/settings/user-invitation':    'user-invitation',
    '#/settings/access-control':     'access-control',
    '#/settings/workflow':           'workflow-config',
    '#/settings/integrations':       'integrations',
    '#/settings/automation':         'automation-rules',
    '#/recruitment/dashboard':       'req-dashboard',
    '#/recruitment/jobs':            'job-posting',
    '#/recruitment/pipeline':        'candidate-pipeline',
    '#/recruitment/interviews':      'interview-management',
    '#/recruitment/documents':       'candidate-documents',
    '#/recruitment/offers':          'offer-management',
    '#/recruitment/reports':         'reports-analytics',
    '#/recruitment/timeline':        'candidate-timeline',
  };

  ngOnInit(): void {
    this.applyViewFromHash();
  }

  handleNavigation(view: string): void {
    const known = Object.values(this.hashToView) as AppView[];
    if (known.includes(view as AppView)) {
      this.setView(view as AppView);
    }
  }

  @HostListener('window:hashchange')
  onHashChange(): void {
    this.applyViewFromHash();
  }

  private applyViewFromHash(): void {
    const hash = window.location.hash || '#/dashboard';
    const mapped = this.hashToView[hash];
    if (mapped) {
      this.currentView = mapped;
    } else {
      this.currentView = 'dashboard';
      window.location.hash = this.viewToHash['dashboard'];
    }
  }

  private setView(view: AppView): void {
    this.currentView = view;
    const targetHash = this.viewToHash[view];
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }
}
