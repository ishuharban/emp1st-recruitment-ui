import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FormField {
  id: number;
  name: string;
  type: string;
  mandatory: boolean;
  visible: boolean;
  placeholder: string;
  helpText: string;
  validation: string;
  defaultValue: string;
  key: string;
}

export interface FormSection {
  id: number;
  name: string;
  collapsed: boolean;
  fields: FormField[];
}

export interface PipelineStage {
  id: number;
  seq: number;
  name: string;
  description: string;
  color: string;
  mandatoryAction: string;
  sla: number;
  notificationsEnabled: boolean;
  status: 'Active' | 'Inactive';
  editing?: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  @Input() view: string = 'recruitment-settings';

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string | number }) { return item.id; }

  // ── Recruitment Settings state ────────────────────────────────────────
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

  // ── Pipeline Setup state ─────────────────────────────────────────────
  stages: PipelineStage[] = [
    { id: 1, seq: 1, name: 'Applied',             description: 'Candidate has applied for the job',     color: '#4A90E2', mandatoryAction: 'None',                   sla: 0, notificationsEnabled: true, status: 'Active' },
    { id: 2, seq: 2, name: 'Screening',           description: 'Initial screening of candidate profile', color: '#F5A623', mandatoryAction: 'Screening Evaluation',   sla: 2, notificationsEnabled: true, status: 'Active' },
    { id: 3, seq: 3, name: 'Shortlisted',         description: 'Candidate qualified screening',          color: '#22B8A5', mandatoryAction: 'Shortlist Candidate',    sla: 2, notificationsEnabled: true, status: 'Active' },
    { id: 4, seq: 4, name: 'Technical Interview', description: 'Technical round(s) of interview',        color: '#7B61FF', mandatoryAction: 'Interview Feedback',     sla: 5, notificationsEnabled: true, status: 'Active' },
    { id: 5, seq: 5, name: 'HR Interview',        description: 'HR round of interview',                  color: '#E94E77', mandatoryAction: 'Interview Feedback',     sla: 3, notificationsEnabled: true, status: 'Active' },
    { id: 6, seq: 6, name: 'Documentation',       description: 'Collect and verify documents',           color: '#FF8A00', mandatoryAction: 'All Documents Verified', sla: 3, notificationsEnabled: true, status: 'Active' },
    { id: 7, seq: 7, name: 'Offered',             description: 'Offer released to candidate',            color: '#5B8DEF', mandatoryAction: 'Offer Approval',         sla: 2, notificationsEnabled: true, status: 'Active' },
    { id: 8, seq: 8, name: 'Hired',               description: 'Candidate has accepted the offer',       color: '#28C76F', mandatoryAction: 'Offer Accepted',         sla: 0, notificationsEnabled: true, status: 'Active' },
    { id: 9, seq: 9, name: 'Rejected',            description: 'Candidate not moving forward',           color: '#EA5455', mandatoryAction: 'Rejection Reason',       sla: 0, notificationsEnabled: true, status: 'Active' },
  ];

  mandatoryActionOptions = ['None', 'Screening Evaluation', 'Shortlist Candidate', 'Interview Feedback', 'All Documents Verified', 'Offer Approval', 'Offer Accepted', 'Rejection Reason'];

  get totalStages()    { return this.stages.length; }
  get activeStagesCnt(){ return this.stages.filter(s => s.status === 'Active').length; }
  get inactiveStagesCnt(){ return this.stages.filter(s => s.status === 'Inactive').length; }

  addStage(): void {
    const newId = this.stages.length ? Math.max(...this.stages.map(s => s.id)) + 1 : 1;
    this.stages.push({ id: newId, seq: this.stages.length + 1, name: 'New Stage', description: '', color: '#6b7280', mandatoryAction: 'None', sla: 0, notificationsEnabled: true, status: 'Active', editing: true });
  }

  deleteStage(id: number): void {
    this.stages = this.stages.filter(s => s.id !== id);
    this.stages.forEach((s, i) => { s.seq = i + 1; });
  }

  toggleEdit(stage: PipelineStage): void { stage.editing = !stage.editing; }

  // ── Candidate Form Builder ───────────────────────────────────────────
  formTab: 'fields' | 'settings' = 'fields';
  selectedFormField: FormField | null = null;
  nextFieldId = 100;

  fieldTypes = [
    { type: 'Text Box',     icon: 'A' },
    { type: 'Text Area',    icon: '☰' },
    { type: 'Number',       icon: '#' },
    { type: 'Email',        icon: '@' },
    { type: 'Phone',        icon: '☎' },
    { type: 'Date',         icon: '▦' },
    { type: 'Dropdown',     icon: '▾' },
    { type: 'Radio Button', icon: '◉' },
    { type: 'Checkbox',     icon: '☑' },
    { type: 'File Upload',  icon: '⬆' },
  ];

  formSections: FormSection[] = [
    {
      id: 1, name: 'PERSONAL INFORMATION', collapsed: false,
      fields: [
        { id: 1,  name: 'Full Name',       type: 'Text Box',   mandatory: true,  visible: true,  placeholder: 'Enter full name',      helpText: 'Please enter your full name as per official documents.', validation: 'No Validation', defaultValue: '', key: 'full_name' },
        { id: 2,  name: 'Email Address',   type: 'Email',      mandatory: true,  visible: true,  placeholder: 'Enter email',          helpText: 'We will use this to contact you.', validation: 'Email Format', defaultValue: '', key: 'email_address' },
        { id: 3,  name: 'Phone Number',    type: 'Phone',      mandatory: true,  visible: true,  placeholder: 'Enter phone number',   helpText: '', validation: 'Phone Format', defaultValue: '', key: 'phone_number' },
        { id: 4,  name: 'Date of Birth',   type: 'Date',       mandatory: false, visible: true,  placeholder: '',                     helpText: '', validation: 'No Validation', defaultValue: '', key: 'date_of_birth' },
        { id: 5,  name: 'Current Location',type: 'Dropdown',   mandatory: true,  visible: true,  placeholder: 'Select location',      helpText: '', validation: 'No Validation', defaultValue: '', key: 'current_location' },
        { id: 6,  name: 'Resume / CV',     type: 'File Upload',mandatory: true,  visible: true,  placeholder: 'PDF, DOC, DOCX',       helpText: '', validation: 'No Validation', defaultValue: '', key: 'resume_cv' },
      ]
    },
    {
      id: 2, name: 'EDUCATION', collapsed: false,
      fields: [
        { id: 7,  name: 'Highest Qualification', type: 'Dropdown', mandatory: true,  visible: true, placeholder: 'Select qualification', helpText: '', validation: 'No Validation', defaultValue: '', key: 'highest_qualification' },
        { id: 8,  name: 'University / College',  type: 'Text Box', mandatory: false, visible: true, placeholder: 'Enter university name', helpText: '', validation: 'No Validation', defaultValue: '', key: 'university_college' },
      ]
    },
  ];

  selectFormField(field: FormField): void { this.selectedFormField = field; }

  addFieldToSection(type: string): void {
    const section = this.formSections[0];
    const key = type.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + this.nextFieldId;
    const field: FormField = { id: this.nextFieldId++, name: type, type, mandatory: false, visible: true, placeholder: '', helpText: '', validation: 'No Validation', defaultValue: '', key };
    section.fields.push(field);
    this.selectedFormField = field;
  }

  deleteFormField(sectionId: number, fieldId: number): void {
    const sec = this.formSections.find(s => s.id === sectionId);
    if (!sec) return;
    sec.fields = sec.fields.filter(f => f.id !== fieldId);
    if (this.selectedFormField?.id === fieldId) this.selectedFormField = null;
  }

  addFormSection(): void {
    const id = Math.max(...this.formSections.map(s => s.id)) + 1;
    this.formSections.push({ id, name: 'NEW SECTION', collapsed: false, fields: [] });
  }

  toggleSectionCollapse(section: FormSection): void { section.collapsed = !section.collapsed; }

  validationOptions = ['No Validation', 'Email Format', 'Phone Format', 'URL Format', 'Number Only', 'Min Length', 'Max Length'];

  // ── Match Analysis ───────────────────────────────────────────────────
  maJobFamily   = 'All Job Families';
  maDepartment  = 'Information Technology';
  maConfigName  = 'IT - Standard Match Analysis';
  maMinScore    = 70;
  maAutoShortlist = true;
  maAutoRejectBelow = 40;
  maAutoReject  = true;
  maScoreMethod: 'weighted' | 'custom' = 'weighted';

  maJobFamilyOpts  = ['All Job Families', 'Engineering', 'Sales', 'HR & Admin', 'Finance'];
  maDeptOpts       = ['All Departments', 'Information Technology', 'Human Resources', 'Finance', 'Marketing'];

  maParameters = [
    { id: 1, name: 'Skills Match',        color: '#22c55e', description: 'Match of candidate skills with required skills',  weightage: 35, mandatory: true,  active: true  },
    { id: 2, name: 'Experience Match',    color: '#3b82f6', description: 'Total relevant experience against requirement',    weightage: 20, mandatory: true,  active: true  },
    { id: 3, name: 'Education Match',     color: '#a855f7', description: 'Qualification level match',                       weightage: 10, mandatory: false, active: true  },
    { id: 4, name: 'Certification Match', color: '#f59e0b', description: 'Match of required certifications',                weightage: 10, mandatory: false, active: true  },
    { id: 5, name: 'Location Match',      color: '#ef4444', description: 'Preferred location match',                        weightage: 10, mandatory: false, active: false },
    { id: 6, name: 'Salary Expectation',  color: '#10b981', description: 'Expected salary vs budgeted salary',              weightage: 10, mandatory: false, active: false },
    { id: 7, name: 'Notice Period',       color: '#06b6d4', description: 'Notice period alignment',                         weightage:  5, mandatory: false, active: false },
  ];

  maPreviewScores = [
    { param: 'Skills Match',        score: 80  },
    { param: 'Experience Match',    score: 90  },
    { param: 'Education Match',     score: 100 },
    { param: 'Certification Match', score: 100 },
    { param: 'Location Match',      score: 60  },
    { param: 'Salary Expectation',  score: 90  },
    { param: 'Notice Period',       score: 70  },
  ];

  get maTotalWeightage() { return this.maParameters.reduce((s, p) => s + p.weightage, 0); }

  get maFinalScore() {
    let total = 0;
    this.maParameters.forEach((p, i) => {
      if (p.active && i < this.maPreviewScores.length) {
        total += (p.weightage / 100) * this.maPreviewScores[i].score;
      }
    });
    return Math.round(total);
  }

  get maScoreLabel() {
    const s = this.maFinalScore;
    if (s >= 80) return 'Good Fit';
    if (s >= 60) return 'Average Fit';
    return 'Poor Fit';
  }

  get maScoreColor() {
    const s = this.maFinalScore;
    if (s >= 80) return '#22c55e';
    if (s >= 60) return '#f59e0b';
    return '#ef4444';
  }

  get maCircleDash() {
    const circumference = 2 * Math.PI * 44;
    return `${(this.maFinalScore / 100) * circumference} ${circumference}`;
  }

  addMaParameter(): void {
    const id = Math.max(...this.maParameters.map(p => p.id)) + 1;
    this.maParameters.push({ id, name: 'New Parameter', color: '#6b7280', description: 'Parameter description', weightage: 0, mandatory: false, active: true });
  }

  deleteMaParameter(id: number): void { this.maParameters = this.maParameters.filter(p => p.id !== id); }

  // ── Automation Rules ─────────────────────────────────────────────────
  autoRules = [
    { id: 1, name: 'Auto Move After Interview', trigger: 'When interview feedback is submitted',       action: 'Move candidate to next stage automatically',       appliedTo: 'All Jobs', active: true  },
    { id: 2, name: 'Send Reminder - Interview', trigger: '24 hours before interview',                 action: 'Send email reminder to candidate & interviewers',  appliedTo: 'All Jobs', active: true  },
    { id: 3, name: 'Document Request',          trigger: 'When candidate moves to Documentation stage',action: 'Send document request email',                      appliedTo: 'All Jobs', active: true  },
    { id: 4, name: 'Offer Expiry Reminder',     trigger: '2 days before offer expiry',                action: 'Send reminder to candidate',                       appliedTo: 'All Jobs', active: true  },
    { id: 5, name: 'Job Expiry Alert',          trigger: '3 days before job expiry',                  action: 'Notify recruiters and hiring managers',            appliedTo: 'All Jobs', active: true  },
  ];

  newRule = { name: '', trigger: '', action: '', appliedTo: 'All Jobs', active: true };
  showAddRule = false;

  triggerOptions  = ['When candidate applies', 'When candidate is shortlisted', 'When interview feedback is submitted', '24 hours before interview', 'When candidate moves to Documentation stage', '2 days before offer expiry', '3 days before job expiry'];
  actionOptions   = ['Move candidate to next stage', 'Send email notification', 'Send reminder email', 'Send document request email', 'Notify hiring manager', 'Auto reject candidate'];
  appliedToOpts   = ['All Jobs', 'Specific Job Family', 'Specific Department', 'Specific Job'];

  saveAutoRule(): void {
    if (!this.newRule.name.trim() || !this.newRule.trigger || !this.newRule.action) return;
    const id = Math.max(...this.autoRules.map(r => r.id)) + 1;
    this.autoRules.push({ ...this.newRule, id });
    this.newRule = { name: '', trigger: '', action: '', appliedTo: 'All Jobs', active: true };
  }

  deleteAutoRule(id: number): void { this.autoRules = this.autoRules.filter(r => r.id !== id); }

  // ── Email & Notification Setup ───────────────────────────────────────
  enEvents = [
    { name: 'Candidate Applied',        iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Candidate Shortlisted',    iconBg: '#eff6ff', iconColor: '#2563eb', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Interview Scheduled',      iconBg: '#eef2ff', iconColor: '#4f46e5', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Interview Reminder',       iconBg: '#fdf2f8', iconColor: '#c026d3', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Interview Rescheduled',    iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Interview Cancelled',      iconBg: '#fef2f2', iconColor: '#dc2626', email: true,  inApp: true,  sms: false, active: false },
    { name: 'Feedback Pending Reminder',iconBg: '#fff7ed', iconColor: '#ea580c', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Offer Released',           iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Offer Accepted',           iconBg: '#ecfdf5', iconColor: '#15803d', email: true,  inApp: false, sms: false, active: true  },
    { name: 'Offer Rejected',           iconBg: '#fef2f2', iconColor: '#dc2626', email: true,  inApp: false, sms: false, active: false },
    { name: 'Document Request',         iconBg: '#eff6ff', iconColor: '#1d4ed8', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Document Verified',        iconBg: '#eff6ff', iconColor: '#1e40af', email: true,  inApp: false, sms: false, active: true  },
    { name: 'Candidate Hired',          iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: false, active: true  },
  ];
  enSelectedTemplate = 'Interview Invitation';
  enTemplateOptions  = ['Application Received','Shortlist Notification','Interview Invitation','Interview Reminder','Offer Letter','Document Request','Joining Confirmation'];
  enSubject          = 'Interview Invitation - {{JobTitle}}';
  enBody             = `Dear {{CandidateName}},\n\nCongratulations! You have been shortlisted for the position of {{JobTitle}}.\n\nInterview Date    : {{InterviewDate}}\nInterview Time    : {{InterviewTime}}\nInterview Type    : {{InterviewType}}\nInterviewer       : {{InterviewerName}}\nMeeting Link      : {{MeetingLink}}\n\nPlease make sure you are available at the scheduled time.\n\nRegards,\n{{RecruiterName}}\n{{CompanyName}}`;
  enMergeFields      = ['{{CandidateName}}','{{JobTitle}}','{{InterviewDate}}','{{InterviewTime}}','{{InterviewType}}','{{InterviewerName}}','{{MeetingLink}}','{{RecruiterName}}','{{CompanyName}}','{{OfferAmount}}','{{JoiningDate}}'];
  enReminderValue    = 24; enReminderUnit = 'Hours';
  enEscalationValue  = 48; enEscalationUnit = 'Hours';
  enMaxEscalation    = '2 Levels';
  enRecipients       = { candidate: true, recruiter: true, hiringManager: true, interviewPanel: true, hrManager: true, admin: false, customEmail: false };
  enCustomEmail      = '';
  enAttachDetails    = true; enAllowUnsubscribe = true; enInAppNotif = true; enSmsNotif = false;
  enUnitOptions      = ['Minutes','Hours','Days'];
  enMaxEscalationOpts= ['1 Level','2 Levels','3 Levels','No Escalation'];

  // ── Interview Templates ──────────────────────────────────────────────
  itTemplateName  = 'Software Engineer - L2 Technical Interview';
  itDepartment    = 'Information Technology';
  itInterviewType = 'Technical Interview';
  itStatus        = 'Active';
  itDeptOptions   = ['Information Technology','Human Resources','Finance','Marketing','Operations'];
  itTypeOptions   = ['Technical Interview','HR Interview','Behavioural Interview','Case Study'];
  itStatusOptions = ['Active','Inactive','Draft'];

  itCompetencies = [
    { id:1, name:'Technical Skills',        description:'Core technical knowledge required for the role',    weightage:35, mandatory:true,  active:true  },
    { id:2, name:'Problem Solving',         description:'Analytical and problem solving ability',            weightage:20, mandatory:true,  active:true  },
    { id:3, name:'Coding Ability',          description:'Coding efficiency, accuracy and best practices',   weightage:20, mandatory:true,  active:true  },
    { id:4, name:'Communication Skills',    description:'Verbal & written communication',                   weightage:10, mandatory:false, active:true  },
    { id:5, name:'Team Collaboration',      description:'Teamwork and collaboration approach',              weightage:10, mandatory:false, active:false },
    { id:6, name:'Cultural Fit',            description:'Alignment with organization values and culture',   weightage: 5, mandatory:false, active:false },
  ];

  itQuestions = [
    { id:1, question:'Explain OOPS Principles.',                type:'Technical',  maxScore:10, mandatory:true  },
    { id:2, question:'Difference between REST and SOAP.',       type:'Technical',  maxScore:10, mandatory:true  },
    { id:3, question:'Write SQL Query for Employee Report.',     type:'Practical',  maxScore:20, mandatory:true  },
    { id:4, question:'Explain Spring Boot Architecture.',        type:'Technical',  maxScore:20, mandatory:true  },
  ];
  itQuestionTypes = ['Technical','Practical','Behavioural','Case Study'];

  itRules = [
    { range:'85 - 100', recommendation:'Strong Hire', color:'#22c55e', description:'Outstanding performance. Highly recommended.' },
    { range:'70 - 84',  recommendation:'Hire',        color:'#86efac', description:'Good performance. Recommended to hire.' },
    { range:'50 - 69',  recommendation:'Hold',        color:'#fbbf24', description:'Average performance. Further evaluation needed.' },
    { range:'Below 50', recommendation:'Reject',      color:'#ef4444', description:'Does not meet the requirements.' },
  ];
  itRecommendationOpts = ['Strong Hire','Hire','Hold','Reject'];

  itSettings = { allowComments:true, showScore:true, allowAttachment:true, enableRecommendation:true, autoCalcRecommendation:true, passingScore:50 };

  itPreviewRatings = [
    { competency:'Technical Skills',     selected:4, maxScore:35 },
    { competency:'Problem Solving',      selected:3, maxScore:20 },
    { competency:'Coding Ability',       selected:4, maxScore:20 },
    { competency:'Communication Skills', selected:4, maxScore:10 },
    { competency:'Team Collaboration',   selected:4, maxScore:10 },
    { competency:'Cultural Fit',         selected:4, maxScore: 5 },
  ];
  itPreviewRecommendation = 'Hire';
  itPreviewComment = '';

  get itTotalWeightage()     { return this.itCompetencies.reduce((s,c)=>s+c.weightage,0); }
  get itTotalScore()         { return Math.round(this.itPreviewRatings.reduce((s,r)=>s+(r.selected/5)*r.maxScore,0)); }
  get itQuestionsScore()     { return this.itQuestions.reduce((s,q)=>s+q.maxScore,0); }

  ratingScore(r:{selected:number;maxScore:number}):number { return Math.round((r.selected/5)*r.maxScore); }

  // ── User Invitation ──────────────────────────────────────────────────
  uiSearchQuery = '';
  uiShowInviteForm = false;
  uiSelectedRole = 'Recruiter';

  uiSummary = { total:42, active:35, pending:4, expired:2, disabled:1 };

  uiUsers = [
    { name:'Rahul Sharma', email:'rahul@company.com', dept:'Information Technology', role:'Recruiter',       scope:['Requisitions','Candidates','Interviews'], status:'Active',   lastLogin:'10 Jun 2026' },
    { name:'Priya Gupta',  email:'priya@company.com', dept:'Human Resources',        role:'Hiring Manager',  scope:['Requisitions','Candidates'],             status:'Active',   lastLogin:'09 Jun 2026' },
    { name:'Amit Verma',   email:'amit@company.com',  dept:'Information Technology', role:'Interviewer',     scope:['Interviews'],                            status:'Pending',  lastLogin:'—' },
    { name:'John Smith',   email:'john@company.com',  dept:'Human Resources',        role:'HR Admin',        scope:['All Modules'],                           status:'Active',   lastLogin:'05 Jun 2026' },
    { name:'Sneha Thakur', email:'sneha@company.com', dept:'Human Resources',        role:'Recruiter',       scope:['Requisitions','Candidates','Interviews'], status:'Active',   lastLogin:'11 Jun 2026' },
    { name:'Vikram Singh', email:'vikram@company.com',dept:'Information Technology', role:'Interviewer',     scope:['Interviews'],                            status:'Active',   lastLogin:'08 Jun 2026' },
  ];

  uiInvite = { firstName:'', lastName:'', email:'', department:'Information Technology', role:'Recruiter', reportingTo:'HR Manager',
    scope:{ requisitions:true, candidates:true, interviews:true, offers:true, config:false, reports:false },
    expiryDays:7, sendWelcomeEmail:true, forcePasswordSetup:true, enableSSO:false, mfaRequired:false };

  uiDeptOptions     = ['Information Technology','Human Resources','Finance','Marketing','Operations'];
  uiRoleOptions     = ['HR Administrator','Recruiter','Hiring Manager','Interviewer','Department Head'];
  uiReportingOpts   = ['HR Manager','Senior Recruiter','VP HR','CTO'];

  readonly uiRolePermissions: Record<string,{perm:string;allowed:boolean}[]> = {
    'HR Administrator': [
      {perm:'View Candidates',allowed:true},{perm:'Manage Users',allowed:true},{perm:'Configure Recruitment',allowed:true},
      {perm:'Create Offers',allowed:true},{perm:'View Reports',allowed:true},{perm:'Manage Integrations',allowed:true},
    ],
    'Recruiter': [
      {perm:'View Candidates',allowed:true},{perm:'Create Candidate',allowed:true},{perm:'Move Pipeline Stages',allowed:true},
      {perm:'Schedule Interviews',allowed:true},{perm:'Create Offers',allowed:true},
      {perm:'Configure Recruitment',allowed:false},{perm:'Manage Users',allowed:false},
    ],
    'Hiring Manager': [
      {perm:'View Candidates',allowed:true},{perm:'Approve Requisitions',allowed:true},{perm:'Approve Offers',allowed:true},
      {perm:'Review Feedback',allowed:true},{perm:'Create Candidate',allowed:false},{perm:'Manage Users',allowed:false},
    ],
    'Interviewer': [
      {perm:'View Interview Schedule',allowed:true},{perm:'Submit Feedback',allowed:true},{perm:'View Candidate Profile',allowed:true},
      {perm:'Create Offers',allowed:false},{perm:'Manage Users',allowed:false},
    ],
    'Department Head': [
      {perm:'Approve Requisitions',allowed:true},{perm:'Approve Offers',allowed:true},
      {perm:'View Reports',allowed:true},{perm:'Manage Users',allowed:false},
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
    this.uiUsers.unshift({ name:`${this.uiInvite.firstName} ${this.uiInvite.lastName}`, email:this.uiInvite.email, dept:this.uiInvite.department, role:this.uiInvite.role, scope:['Candidates'], status:'Pending', lastLogin:'—' });
    this.uiShowInviteForm = false;
    this.uiInvite = { firstName:'', lastName:'', email:'', department:'Information Technology', role:'Recruiter', reportingTo:'HR Manager', scope:{requisitions:true,candidates:true,interviews:true,offers:true,config:false,reports:false}, expiryDays:7, sendWelcomeEmail:true, forcePasswordSetup:true, enableSSO:false, mfaRequired:false };
  }
}

