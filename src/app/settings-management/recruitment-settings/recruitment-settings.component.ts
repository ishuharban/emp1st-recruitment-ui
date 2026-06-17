import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruitment-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recruitment-settings.component.html',
  styleUrls: ['./recruitment-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RecruitmentSettingsComponent {
  trackByIndex(i: number, _: any) { return i; }

  rs = {
    timezone: '(GMT+05:30) Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12 Hour (AM/PM)',
    currency: 'INR (₹)',
    language: 'English',
    decimalFormat: '1,234.56',
    numberFormat: '1,234.56',
    weekStartOn: 'Sunday',
    fiscalYearStart: 'April',
    defaultJobExpiry: 30,
    allowJobReposting: true,
    autoCloseRequisition: true,
    autoCloseAfterDays: 90,
    reqIdPrefix: 'REQ-',
    reqIdSequence: 1001,
    allowMultipleOpenings: false,
    maxOpeningsPerReq: 50,
    requireHMApproval: true,
    candidateSelfReg: true,
    duplicateCheck: true,
    dataMasking: false,
    defaultAppSource: 'Company Career Page',
    autoSave: true,
    sessionTimeout: 30,
    resumeSizeLimit: 10,
    coverLetterMandatory: false,
    interviewReminder1: '24 Hours Before',
    interviewReminder2: '1 Hour Before',
    allowReschedule: false,
    feedbackMandatory: true,
    feedbackDays: 2,
    allowWalkIn: false,
    interviewDuration: 60,
    maxInterviewers: 6,
    calendarSync: true,
    allowDocUpload: true,
    docSizeLimit: 10,
    docExpiryTracking: true,
    mandatoryDocCheck: true,
    autoDeleteAfter: 7,
    careerPortalVisibility: 'Public',
    showSalaryRange: true,
    enableAnalytics: true,
    gdprConsent: true,
    enableAuditTrail: true,
    enableApiAccess: false,
  };

  timezoneOptions   = ['(GMT+05:30) Asia/Kolkata', '(GMT+00:00) UTC', '(GMT-05:00) US/Eastern', '(GMT+01:00) Europe/London'];
  dateFormatOptions = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
  timeFormatOptions = ['12 Hour (AM/PM)', '24 Hour'];
  currencyOptions   = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'];
  languageOptions   = ['English', 'Hindi', 'French', 'German'];
  decimalOptions    = ['1,234.56', '1.234,56'];
  weekStartOptions  = ['Sunday', 'Monday'];
  fiscalYearOptions = ['April', 'January', 'July', 'October'];
  appSourceOptions  = ['Company Career Page', 'LinkedIn', 'Indeed', 'Naukri', 'Referral'];
  reminder1Options  = ['15 Min Before', '30 Min Before', '1 Hour Before', '2 Hours Before', '24 Hours Before'];
  reminder2Options  = ['15 Min Before', '30 Min Before', '1 Hour Before', '2 Hours Before'];
  visibilityOptions = ['Public', 'Private', 'Internal Only'];

  tips: Record<string, string> = {
    timezone:         'Timezone used for all scheduling and notifications.',
    dateFormat:       'How dates are displayed across the recruitment module.',
    timeFormat:       '12-hour (AM/PM) or 24-hour clock format.',
    currency:         'Default currency for salary budgets and CTC values.',
    language:         'Default language for the recruitment interface.',
    decimalFormat:    'How decimal numbers are formatted in reports.',
    numberFormat:     'How large numbers display (thousands separator).',
    weekStartOn:      'Day considered the start of the work week.',
    fiscalYearStart:  'First month of your organisation\'s fiscal year.',
    defaultJobExpiry: 'Days before a job posting automatically expires.',
    allowJobReposting:'Allow HR to repost closed or expired job openings.',
    autoCloseReq:     'Automatically close requisitions when hiring completes.',
    autoCloseAfter:   'Days of inactivity before an open requisition auto-closes.',
    reqIdPrefix:      'Text prefix added to all requisition IDs (e.g. REQ-).',
    reqIdSequence:    'Starting number for the requisition ID auto-sequence.',
    multipleOpenings: 'Allow a single requisition to cover multiple positions.',
    maxOpenings:      'Maximum number of positions per single requisition.',
    hmApproval:       'Require hiring manager sign-off before publishing.',
    selfReg:          'Allow candidates to self-register on the career portal.',
    dupCheck:         'Flag duplicate candidate profiles by email or phone.',
    dataMasking:      'Mask sensitive PII data in candidate profiles.',
    appSource:        'Default source assigned to new applications.',
    autoSave:         'Auto-save candidate application forms periodically.',
    sessionTimeout:   'Minutes of inactivity before the session expires.',
    resumeSize:       'Maximum file size for uploaded resumes, in MB.',
    coverLetter:      'Make cover letter submission mandatory for all applications.',
    reminder1:        'First reminder sent to interviewers before interview.',
    reminder2:        'Second (closer) reminder sent to interviewers.',
    reschedule:       'Allow candidates to reschedule their own interviews.',
    feedbackMandatory:'Require feedback before moving candidates forward.',
    feedbackDays:     'Days interviewers have to submit post-interview feedback.',
    walkIn:           'Allow walk-in candidates without prior appointment.',
    duration:         'Default interview slot duration in minutes.',
    maxInterviewers:  'Max number of interviewers on a single panel.',
    calendarSync:     'Sync interviews with external calendars (Google/Outlook).',
    allowDocUpload:   'Allow candidates to upload supporting documents.',
    docSize:          'Maximum file size for document uploads, in MB.',
    docExpiry:        'Alert when candidate documents are nearing expiry.',
    mandatoryDoc:     'Require all mandatory documents before making an offer.',
    autoDelete:       'Auto-delete rejected candidate documents after N years.',
    careerPortal:     'Control who can see your career portal and job listings.',
    showSalary:       'Show or hide salary ranges in public job postings.',
    analytics:        'Enable recruitment analytics and reporting dashboards.',
    gdpr:             'Enable GDPR consent checkbox on application forms.',
    auditTrail:       'Log all recruitment actions for compliance auditing.',
    apiAccess:        'Enable API access for third-party integrations.',
  };
}