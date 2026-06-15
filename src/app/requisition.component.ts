import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type RequisitionStatus =
  | 'Draft' | 'Pending Approval' | 'Under Review'
  | 'Approved' | 'Rejected' | 'Sent Back'
  | 'Closed' | 'Cancelled' | 'Expired';

export interface Requisition {
  id: string;
  jobTitle: string;
  company: string;
  department: string;
  businessUnit: string;
  designation: string;
  location: string;
  city: string;
  vacancy: number;
  employmentType: string;
  employeeType: string;
  budget: number;
  hiringManager: string;
  expectedJoiningDate: string;
  replacementOrNew: string;
  costCentre: string;
  priority: 'High' | 'Medium' | 'Low';
  skills: string[];
  experience: string;
  qualification: string;
  remarks: string;
  isTravelRequired: boolean;
  workMode: string;
  jdContent: string;
  jobRequirementSummary: string;
  benefitOfHiring: string;
  status: RequisitionStatus;
  requestedBy: string;
  requestedOn: string;
}

export interface WorkflowStep {
  step: number;
  label: string;
  group: string;
  status: 'completed' | 'active' | 'rejected' | 'returned' | 'pending';
  approver?: string;
  timestamp?: string;
}

@Component({
  selector: 'app-requisition',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitionComponent {
  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  /** 'request' = listing+form  |  'approval' = approval listing+modal */
  @Input() mode: 'request' | 'approval' = 'request';
  @Output() navigateBack = new EventEmitter<string>();

  activeTab: 'all' | 'pending' | 'approved' | 'rejected' = 'all';
  searchTerm = '';
  showForm = false;
  isEditMode = false;
  isViewOnly = false;
  viewingRequisition: Requisition | null = null;
  form: Partial<Requisition> = {};
  formSkillInput = '';
  formShowSkillDropdown = false;

  showApprovalModal = false;
  selectedRequisition: Requisition | null = null;
  approvalAction: 'approve' | 'reject' | 'delegate' | 'return' | null = null;
  approvalRemarks = '';
  approvalCommentError = false;
  delegateTo = '';

  private nextId = 6;

  readonly employmentTypeOptions = ['Permanent', 'Contract', 'Intern'];
  readonly employeeTypeOptions = ['Full Time', 'Part Time', 'Consultant'];
  readonly replacementOptions = ['New', 'Replacement'];
  readonly priorityOptions = ['High', 'Medium', 'Low'];
  readonly workModeOptions = ['Work from Office', 'Remote', 'Hybrid'];
  readonly hiringManagerOptions = ['Sneha Thakur', 'Gaurav Rohilla', 'Vikram Saigal', 'Neeraj Yadav', 'Ishu Harban'];
  readonly allSkillOptions = [
    'Angular', 'React', 'Vue.js', 'Node.js', 'TypeScript', 'Python', 'Java', 'SQL',
    'Power BI', 'AWS', 'DevOps', 'HR Operations', 'Recruitment', 'Payroll',
    'B2B Sales', 'CRM', 'Agile', 'Product Strategy', 'Data Analysis', 'Machine Learning',
  ];
  readonly delegateOptions = ['Gaurav Rohilla', 'Sneha Thakur', 'Vikram Saigal', 'Neeraj Yadav'];

  requisitions: Requisition[] = [
    {
      id: 'REQ-2026-001', jobTitle: 'Senior Software Engineer', company: 'Ingenx Technology Pvt Ltd',
      department: 'Engineering', businessUnit: 'Product', designation: 'Senior Engineer',
      location: 'Gurugram', city: 'Gurugram', vacancy: 2, employmentType: 'Permanent',
      employeeType: 'Full Time', budget: 1200000, hiringManager: 'Sneha Thakur',
      expectedJoiningDate: '2026-08-01', replacementOrNew: 'New', costCentre: 'CC-ENG-001',
      priority: 'High', skills: ['Angular', 'Node.js', 'TypeScript'], experience: '4-6 years',
      qualification: 'B.Tech / MCA', remarks: 'Urgent requirement', isTravelRequired: false,
      workMode: 'Hybrid', jdContent: 'Looking for a Senior Software Engineer with 4-6 years of experience in Angular and Node.js.',
      jobRequirementSummary: 'Need experienced Angular/Node developer to scale product engineering team.',
      benefitOfHiring: 'To scale product development velocity by 40%.',
      status: 'Pending Approval', requestedBy: 'Sneha Thakur', requestedOn: '2026-06-01',
    },
    {
      id: 'REQ-2026-002', jobTitle: 'HR Business Partner', company: 'Ingenx Technology Pvt Ltd',
      department: 'Human Resources', businessUnit: 'HR', designation: 'HRBP',
      location: 'Mumbai', city: 'Mumbai', vacancy: 1, employmentType: 'Permanent',
      employeeType: 'Full Time', budget: 800000, hiringManager: 'Gaurav Rohilla',
      expectedJoiningDate: '2026-07-15', replacementOrNew: 'Replacement', costCentre: 'CC-HR-002',
      priority: 'Medium', skills: ['HR Operations', 'Recruitment', 'Payroll'], experience: '3-5 years',
      qualification: 'MBA (HR)', remarks: '', isTravelRequired: false,
      workMode: 'Work from Office', jdContent: 'Seeking an HRBP to manage employee lifecycle for 200+ employees.',
      jobRequirementSummary: 'Experienced HRBP for Mumbai region operations.',
      benefitOfHiring: 'Strengthen HR presence in Mumbai office.',
      status: 'Approved', requestedBy: 'Gaurav Rohilla', requestedOn: '2026-05-20',
    },
    {
      id: 'REQ-2026-003', jobTitle: 'Sales Executive', company: 'Ingenx Technology Pvt Ltd',
      department: 'Sales', businessUnit: 'Revenue', designation: 'Executive',
      location: 'Delhi', city: 'Delhi', vacancy: 3, employmentType: 'Permanent',
      employeeType: 'Full Time', budget: 500000, hiringManager: 'Vikram Saigal',
      expectedJoiningDate: '2026-07-01', replacementOrNew: 'New', costCentre: 'CC-SALES-001',
      priority: 'High', skills: ['B2B Sales', 'CRM'], experience: '2-4 years',
      qualification: 'Any Graduate', remarks: 'Q3 expansion plan', isTravelRequired: true,
      workMode: 'Work from Office', jdContent: 'We are looking for Sales Executives to drive revenue in Delhi NCR.',
      jobRequirementSummary: 'Drive revenue in Delhi NCR territory.',
      benefitOfHiring: 'Expand sales footprint in North India by Q3.',
      status: 'Draft', requestedBy: 'Vikram Saigal', requestedOn: '2026-06-05',
    },
    {
      id: 'REQ-2026-004', jobTitle: 'Data Analyst', company: 'Ingenx Technology Pvt Ltd',
      department: 'Analytics', businessUnit: 'Technology', designation: 'Analyst',
      location: 'Bengaluru', city: 'Bengaluru', vacancy: 1, employmentType: 'Contract',
      employeeType: 'Full Time', budget: 700000, hiringManager: 'Neeraj Yadav',
      expectedJoiningDate: '2026-08-15', replacementOrNew: 'Replacement', costCentre: 'CC-TECH-003',
      priority: 'Low', skills: ['SQL', 'Python', 'Power BI'], experience: '2-3 years',
      qualification: 'B.Tech / Statistics', remarks: '', isTravelRequired: false,
      workMode: 'Remote', jdContent: 'Looking for a Data Analyst with SQL and Python skills.',
      jobRequirementSummary: 'Analyze business data to drive strategic insights.',
      benefitOfHiring: 'Enable data-driven decision making across departments.',
      status: 'Rejected', requestedBy: 'Neeraj Yadav', requestedOn: '2026-05-15',
    },
    {
      id: 'REQ-2026-005', jobTitle: 'Product Manager', company: 'Ingenx Technology Pvt Ltd',
      department: 'Product', businessUnit: 'Product', designation: 'Senior PM',
      location: 'Gurugram', city: 'Gurugram', vacancy: 1, employmentType: 'Permanent',
      employeeType: 'Full Time', budget: 1500000, hiringManager: 'Sneha Thakur',
      expectedJoiningDate: '2026-09-01', replacementOrNew: 'New', costCentre: 'CC-PROD-001',
      priority: 'High', skills: ['Product Strategy', 'Agile'], experience: '6-8 years',
      qualification: 'MBA / B.Tech', remarks: 'Strategic hire', isTravelRequired: true,
      workMode: 'Hybrid', jdContent: 'Seeking a Senior Product Manager to lead core platform strategy.',
      jobRequirementSummary: 'Lead product strategy and roadmap for core platform.',
      benefitOfHiring: 'Accelerate product innovation and customer retention.',
      status: 'Pending Approval', requestedBy: 'Sneha Thakur', requestedOn: '2026-06-08',
    },
  ];

  /* ── Counts ── */
  get totalCount() { return this.requisitions.length; }
  get pendingCount() { return this.requisitions.filter(r => r.status === 'Pending Approval' || r.status === 'Under Review').length; }
  get approvedCount() { return this.requisitions.filter(r => r.status === 'Approved').length; }
  get rejectedCount() { return this.requisitions.filter(r => r.status === 'Rejected').length; }
  get draftCount() { return this.requisitions.filter(r => r.status === 'Draft').length; }

  /* ── Filtered list ── */
  get filteredList(): Requisition[] {
    const q = this.searchTerm.toLowerCase();
    let list = q
      ? this.requisitions.filter(r =>
          r.id.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q) ||
          r.designation.toLowerCase().includes(q) ||
          r.requestedBy.toLowerCase().includes(q)
        )
      : [...this.requisitions];

    if (this.activeTab === 'pending') return list.filter(r => r.status === 'Pending Approval' || r.status === 'Under Review');
    if (this.activeTab === 'approved') return list.filter(r => r.status === 'Approved');
    if (this.activeTab === 'rejected') return list.filter(r => r.status === 'Rejected');
    return list;
  }

  tabCount(tab: 'all' | 'pending' | 'approved' | 'rejected'): number {
    if (tab === 'all') return this.requisitions.length;
    if (tab === 'pending') return this.pendingCount;
    if (tab === 'approved') return this.approvedCount;
    return this.rejectedCount;
  }

  /* ── Form ── */
  openAdd(): void {
    this.form = {
      id: `REQ-2026-00${this.nextId}`,
      skills: [],
      isTravelRequired: false,
      priority: 'Medium',
      employmentType: 'Permanent',
      employeeType: 'Full Time',
      replacementOrNew: 'New',
      workMode: 'Hybrid',
      company: 'Ingenx Technology Pvt Ltd',
    };
    this.formSkillInput = '';
    this.formShowSkillDropdown = false;
    this.isEditMode = false;
    this.showForm = true;
  }

  openRequestDetail(r: Requisition): void {
    this.viewingRequisition = r;
    this.form = { ...r, skills: [...(r.skills || [])] };
    this.formSkillInput = '';
    this.formShowSkillDropdown = false;
    this.isEditMode = true;
    this.isViewOnly = !this.canEdit(r);
    this.showForm = true;
  }

  openEdit(r: Requisition): void {
    this.openRequestDetail(r);
  }

  closeForm(): void {
    this.showForm = false;
    this.isViewOnly = false;
    this.viewingRequisition = null;
    this.form = {};
  }

  getWorkflowSteps(r: Requisition): WorkflowStep[] {
    const steps: WorkflowStep[] = [
      { step: 1, label: 'Create Requisition', group: 'Assessment', status: 'pending' },
      { step: 2, label: 'Head Approval',       group: 'Review',     status: 'pending' },
      { step: 3, label: 'HR Approval',          group: 'Review',     status: 'pending' },
      { step: 4, label: 'Completed',            group: 'Completion', status: 'pending' },
    ];

    steps[0].status = 'completed';
    steps[0].approver = r.requestedBy;
    steps[0].timestamp = r.requestedOn;

    if (r.status === 'Draft') {
      steps[0].status = 'active';
      steps[0].approver = r.requestedBy;
      return steps;
    }
    if (r.status === 'Pending Approval') {
      steps[1].status = 'active';
      return steps;
    }
    if (r.status === 'Rejected') {
      steps[1].status = 'rejected';
      steps[1].approver = r.hiringManager;
      steps[1].timestamp = this.addDays(r.requestedOn, 2);
      return steps;
    }
    if (r.status === 'Sent Back') {
      steps[1].status = 'returned';
      steps[1].approver = r.hiringManager;
      steps[1].timestamp = this.addDays(r.requestedOn, 2);
      return steps;
    }
    if (r.status === 'Under Review') {
      steps[1].status = 'completed';
      steps[1].approver = r.hiringManager;
      steps[1].timestamp = this.addDays(r.requestedOn, 2);
      steps[2].status = 'active';
      return steps;
    }
    if (r.status === 'Approved') {
      steps[1].status = 'completed';
      steps[1].approver = r.hiringManager;
      steps[1].timestamp = this.addDays(r.requestedOn, 2);
      steps[2].status = 'completed';
      steps[2].approver = 'HR Team';
      steps[2].timestamp = this.addDays(r.requestedOn, 4);
      steps[3].status = 'completed';
      steps[3].timestamp = this.addDays(r.requestedOn, 5);
    }
    return steps;
  }

  private addDays(dateStr: string, days: number): string {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  }

  saveDraft(): void { this.saveRequisition('Draft'); }
  submitForApproval(): void { this.saveRequisition('Pending Approval'); }

  private saveRequisition(status: RequisitionStatus): void {
    const req = { ...this.form, status } as Requisition;
    if (this.isEditMode) {
      const idx = this.requisitions.findIndex(r => r.id === req.id);
      if (idx !== -1) this.requisitions[idx] = req;
    } else {
      req.requestedBy = 'Sneha Thakur';
      req.requestedOn = new Date().toISOString().split('T')[0];
      this.nextId++;
      this.requisitions.unshift(req);
    }
    this.showForm = false;
    this.form = {};
  }

  resetForm(): void {
    this.form = {
      id: this.form.id,
      skills: [],
      isTravelRequired: false,
      priority: 'Medium',
      employmentType: 'Permanent',
      employeeType: 'Full Time',
      replacementOrNew: 'New',
      workMode: 'Hybrid',
      company: 'Ingenx Technology Pvt Ltd',
    };
    this.formSkillInput = '';
  }

  addSkill(skill: string): void {
    if (!this.form.skills) this.form.skills = [];
    if (!this.form.skills.includes(skill)) this.form.skills.push(skill);
    this.formShowSkillDropdown = false;
    this.formSkillInput = '';
  }

  removeSkill(skill: string): void {
    if (!this.form.skills) return;
    this.form.skills = this.form.skills.filter(s => s !== skill);
  }

  get filteredSkillOptions(): string[] {
    const q = this.formSkillInput.toLowerCase();
    return this.allSkillOptions.filter(s =>
      s.toLowerCase().includes(q) && !(this.form.skills || []).includes(s)
    );
  }

  generateJD(): void {
    if (!this.form.jobTitle || !this.form.department) return;
    this.form.jdContent = `We are looking for a ${this.form.jobTitle} to join our ${this.form.department} team at ${this.form.company || 'Ingenx Technology Pvt Ltd'}.

Key Responsibilities:
• Collaborate with cross-functional teams to deliver high-quality work
• Bring ${this.form.experience || 'relevant'} years of experience in ${(this.form.skills || []).join(', ') || 'relevant technologies'}
• Work in a ${this.form.workMode || 'flexible'} environment

Requirements:
• Experience: ${this.form.experience || 'As required'}
• Qualification: ${this.form.qualification || 'As per position requirements'}
• Employment Type: ${this.form.employmentType}
• Location: ${this.form.location || 'As discussed'}`;
  }

  /* ── Approval modal ── */
  openApprovalDetail(r: Requisition): void {
    this.selectedRequisition = r;
    this.approvalAction = null;
    this.approvalRemarks = '';
    this.delegateTo = '';
    this.showApprovalModal = true;
  }

  closeApprovalModal(): void {
    this.showApprovalModal = false;
    this.selectedRequisition = null;
    this.approvalAction = null;
    this.approvalRemarks = '';
    this.approvalCommentError = false;
  }

  submitApprovalAction(action: 'approve' | 'reject' | 'delegate' | 'return'): void {
    if (!this.approvalRemarks.trim()) {
      this.approvalCommentError = true;
      return;
    }
    this.approvalCommentError = false;
    this.approvalAction = action;
    this.confirmApprovalAction();
  }

  selectAction(action: 'approve' | 'reject' | 'delegate' | 'return'): void {
    this.approvalAction = action;
  }

  confirmApprovalAction(): void {
    if (!this.selectedRequisition || !this.approvalAction) return;
    const idx = this.requisitions.findIndex(r => r.id === this.selectedRequisition!.id);
    if (idx === -1) return;
    const statusMap: Record<string, RequisitionStatus> = {
      approve: 'Approved',
      reject: 'Rejected',
      return: 'Sent Back',
      delegate: 'Under Review',
    };
    this.requisitions[idx] = { ...this.requisitions[idx], status: statusMap[this.approvalAction] };
    this.closeApprovalModal();
  }

  /* ── Helpers ── */
  canEdit(r: Requisition): boolean {
    return ['Draft', 'Pending Approval', 'Sent Back'].includes(r.status);
  }

  priorityClass(p: string): string {
    if (p === 'High') return 'badge-high';
    if (p === 'Medium') return 'badge-medium';
    return 'badge-low';
  }

  statusClass(s: string): string {
    const map: Record<string, string> = {
      'Draft': 'badge-draft',
      'Pending Approval': 'badge-pending',
      'Under Review': 'badge-review',
      'Approved': 'badge-approved',
      'Rejected': 'badge-rejected',
      'Sent Back': 'badge-sent-back',
      'Closed': 'badge-closed',
      'Cancelled': 'badge-cancelled',
      'Expired': 'badge-expired',
    };
    return map[s] || 'badge-draft';
  }

  statusLabel(s: string): string {
    return s === 'Pending Approval' ? 'Pending' : s;
  }

  formatBudget(n: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
  }
}
