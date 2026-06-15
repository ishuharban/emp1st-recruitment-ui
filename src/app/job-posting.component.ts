import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JobPost {
  id: string;
  jobTitle: string;
  department: string;
  location: string;
  vacancy: number;
  postedOn: string;
  closingOn: string;
  status: 'Active' | 'Inactive';
  requisitionId: string;
  experience: string;
  skills: string[];
  publishTo: string[];
  employmentType: string;
}

@Component({
  selector: 'app-job-posting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobPostingComponent {
  @Output() navigate = new EventEmitter<string>();

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  mode: 'list' | 'create' | 'view' = 'list';
  activeTab: 'all' | 'active' | 'inactive' = 'all';
  activeStep = 1;
  searchQuery = '';
  filterDept = '';
  filterLocation = '';
  selectedJob: JobPost | null = null;
  showColumnSelector = false;
  showPublishDropdown = false;
  editingClosingDate = '';

  steps = ['Job Details', 'Job Description', 'Insights & Preferences', 'Posting Channels', 'Review & Publish'];

  approvedRequisitions = [
    { id: 'REQ-2024-00056', title: 'Software Engineer', dept: 'Information Technology', location: 'Bangalore, Karnataka, India', vacancy: 2, experience: '2 - 5 years', employmentType: 'Full Time', skills: ['Java', 'Spring Boot', 'REST API', 'SQL', 'Microservices'], description: 'We are looking for a passionate Software Engineer to design, develop and maintain scalable applications. You will be working with a talented team to build world-class products.\n\nKey Responsibilities:\n• Design, develop and maintain software applications\n• Write clean, efficient and maintainable code\n• Collaborate with cross-functional teams\n• Troubleshoot, debug and upgrade existing systems\n\nKey Requirements:\n• 2 - 5 years of experience in software development\n• Strong knowledge in Java, Spring Boot, SQL\n• Experience with REST APIs and microservices\n• Excellent problem solving and communication skills' },
    { id: 'REQ-2024-00048', title: 'Product Manager', dept: 'Product', location: 'Mumbai, Maharashtra, India', vacancy: 1, experience: '5 - 8 years', employmentType: 'Full Time', skills: ['Product Roadmap', 'Agile', 'JIRA', 'Stakeholder Management'], description: 'We are seeking an experienced Product Manager to lead our product strategy and roadmap.' },
    { id: 'REQ-2024-00061', title: 'Data Analyst', dept: 'Analytics', location: 'Hyderabad, Telangana, India', vacancy: 3, experience: '1 - 3 years', employmentType: 'Full Time', skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Tableau'], description: 'Join our analytics team as a Data Analyst and turn data into actionable insights.' },
    { id: 'REQ-2024-00059', title: 'DevOps Engineer', dept: 'Information Technology', location: 'Pune, Maharashtra, India', vacancy: 2, experience: '3 - 6 years', employmentType: 'Full Time', skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'], description: 'We need an experienced DevOps Engineer to build and maintain our cloud infrastructure.' },
  ];

  publishOptions = ['Company Career Portal', 'LinkedIn', 'Naukri', 'Indeed', 'Monster', 'Shine', 'Glassdoor', 'Internal Portal'];
  qualificationOptions = ["Bachelor's Degree", "Master's Degree", "Diploma", "Any Graduate", "10+2 / HSC"];
  currencyOptions = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'];

  form = {
    requisitionId: '', jobTitle: '', department: '', location: '', vacancy: 0,
    experience: '', skills: [] as string[], jobDescription: '',
    publishTo: [] as string[],
    postingDate: this.today(), closingDate: '',
    salaryMin: '', salaryMax: '', currency: 'INR (₹)', showSalary: true,
    minQualification: "Bachelor's Degree", employmentType: 'Full Time',
  };

  extraColumns = ['Experience', 'Skills', 'Requisition ID', 'Employment Type', 'Publish To'];
  visibleExtra: string[] = [];

  jobs: JobPost[] = [
    { id: 'JP-2024-001', jobTitle: 'Software Engineer', department: 'Information Technology', location: 'Bangalore, Karnataka', vacancy: 2, postedOn: '15 May 2024', closingOn: '30 Jun 2024', status: 'Active', requisitionId: 'REQ-2024-00056', experience: '2 - 5 years', skills: ['Java', 'Spring Boot', 'REST API'], publishTo: ['LinkedIn', 'Company Career Portal'], employmentType: 'Full Time' },
    { id: 'JP-2024-002', jobTitle: 'Product Manager', department: 'Product', location: 'Mumbai, Maharashtra', vacancy: 1, postedOn: '12 May 2024', closingOn: '25 Jun 2024', status: 'Active', requisitionId: 'REQ-2024-00048', experience: '5 - 8 years', skills: ['Agile', 'JIRA'], publishTo: ['Naukri', 'LinkedIn'], employmentType: 'Full Time' },
    { id: 'JP-2024-003', jobTitle: 'Data Analyst', department: 'Analytics', location: 'Hyderabad, Telangana', vacancy: 3, postedOn: '10 May 2024', closingOn: '20 Jun 2024', status: 'Active', requisitionId: 'REQ-2024-00061', experience: '1 - 3 years', skills: ['Python', 'SQL', 'Power BI'], publishTo: ['Indeed', 'Monster'], employmentType: 'Full Time' },
    { id: 'JP-2024-004', jobTitle: 'DevOps Engineer', department: 'Information Technology', location: 'Pune, Maharashtra', vacancy: 2, postedOn: '08 May 2024', closingOn: '15 Jun 2024', status: 'Inactive', requisitionId: 'REQ-2024-00059', experience: '3 - 6 years', skills: ['Docker', 'Kubernetes', 'AWS'], publishTo: ['Glassdoor', 'LinkedIn'], employmentType: 'Full Time' },
    { id: 'JP-2024-005', jobTitle: 'HR Manager', department: 'Human Resources', location: 'Delhi, NCR', vacancy: 1, postedOn: '05 May 2024', closingOn: '10 Jun 2024', status: 'Inactive', requisitionId: 'REQ-2024-00042', experience: '7 - 10 years', skills: ['HRMS', 'Recruitment'], publishTo: ['Naukri', 'Shine'], employmentType: 'Full Time' },
  ];

  get filtered() {
    let list = this.jobs;
    if (this.activeTab === 'active')   list = list.filter(j => j.status === 'Active');
    if (this.activeTab === 'inactive') list = list.filter(j => j.status === 'Inactive');
    if (this.filterDept)     list = list.filter(j => j.department === this.filterDept);
    if (this.filterLocation) list = list.filter(j => j.location === this.filterLocation);
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(j =>
        j.jobTitle.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }
    return list;
  }

  get departments(): string[] {
    return [...new Set(this.jobs.map(j => j.department))].sort();
  }

  get locations(): string[] {
    return [...new Set(this.jobs.map(j => j.location))].sort();
  }

  get countAll()      { return this.jobs.length; }
  get countActive()   { return this.jobs.filter(j => j.status === 'Active').length; }
  get countInactive() { return this.jobs.filter(j => j.status === 'Inactive').length; }

  today() { return new Date().toISOString().split('T')[0]; }

  onRequisitionChange() {
    const req = this.approvedRequisitions.find(r => r.id === this.form.requisitionId);
    if (req) {
      this.form.jobTitle = req.title;
      this.form.department = req.dept;
      this.form.location = req.location;
      this.form.vacancy = req.vacancy;
      this.form.experience = req.experience;
      this.form.skills = [...req.skills];
      this.form.jobDescription = req.description;
      this.form.employmentType = req.employmentType;
    }
  }

  togglePublish(opt: string) {
    const i = this.form.publishTo.indexOf(opt);
    if (i >= 0) this.form.publishTo.splice(i, 1);
    else this.form.publishTo.push(opt);
  }

  toggleExtra(col: string) {
    const i = this.visibleExtra.indexOf(col);
    if (i >= 0) this.visibleExtra.splice(i, 1);
    else this.visibleExtra.push(col);
  }

  openCreate() {
    this.mode = 'create';
    this.activeStep = 1;
    this.form = { requisitionId: '', jobTitle: '', department: '', location: '', vacancy: 0, experience: '', skills: [], jobDescription: '', publishTo: [], postingDate: this.today(), closingDate: '', salaryMin: '8.00', salaryMax: '14.00', currency: 'INR (₹)', showSalary: true, minQualification: "Bachelor's Degree", employmentType: 'Full Time' };
    this.showPublishDropdown = false;
  }

  openView(job: JobPost) {
    this.selectedJob = { ...job };
    this.editingClosingDate = '';
    this.mode = 'view';
  }

  publish() {
    this.jobs.unshift({
      id: `JP-2024-00${this.jobs.length + 6}`,
      jobTitle: this.form.jobTitle || 'New Job Posting',
      department: this.form.department,
      location: this.form.location,
      vacancy: this.form.vacancy,
      postedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      closingOn: this.form.closingDate,
      status: 'Active',
      requisitionId: this.form.requisitionId,
      experience: this.form.experience,
      skills: [...this.form.skills],
      publishTo: [...this.form.publishTo],
      employmentType: this.form.employmentType,
    });
    this.mode = 'list';
  }

  saveEdit() {
    if (this.selectedJob && this.editingClosingDate) {
      const idx = this.jobs.findIndex(j => j.id === this.selectedJob!.id);
      if (idx >= 0) this.jobs[idx].closingOn = this.editingClosingDate;
    }
    this.mode = 'list';
  }

  statusStyle(s: string) {
    return s === 'Active'
      ? { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' }
      : { bg: '#fef3c7', color: '#b45309', border: '#fde68a' };
  }
}
