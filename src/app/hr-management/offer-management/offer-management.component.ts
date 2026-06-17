import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CompItem   { component: string; amount: string; isTotal?: boolean; }
export interface ApprovalStep { step: number; role: string; person: string; status: 'approved' | 'pending' | 'rejected'; date?: string; }
export interface HistoryEntry { dateTime: string; user: string; action: string; remarks: string; }

export interface OfferRecord {
  id: string;
  requisitionId: string;
  candidateName: string; candidateId: string;
  candidateInitials: string; candidateColor: string;
  candidateType: 'Internal' | 'External';
  candidatePhone: string; candidateEmail: string;
  department: string; designation: string;
  location: string; joiningDate: string; hiringManager: string;
  offerExpiry: string; daysLeft: number | null;
  status: 'Draft' | 'Approval Pending' | 'Approved' | 'Released' | 'Accepted' | 'Rejected' | 'Expired';
  offeredCTC: string; employmentType: string;
  compensation: CompItem[];
  approvalSteps: ApprovalStep[];
  history: HistoryEntry[];
}

const defaultSteps = (recruiter: string, hm: string): ApprovalStep[] => [
  { step:1, role:'Recruiter',      person: recruiter, status:'pending' },
  { step:2, role:'Hiring Manager', person: hm,        status:'pending' },
  { step:3, role:'HR Manager',     person:'',          status:'pending' },
  { step:4, role:'Finance',        person:'',          status:'pending' },
  { step:5, role:'Offer Release',  person:'',          status:'pending' },
];

@Component({
  selector: 'app-offer-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferManagementComponent {
  @Output() navigate = new EventEmitter<string>();

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  searchQuery = '';
  statusFilter = 'All';
  departmentFilter = 'All';
  locationFilter = 'All';
  currentPage = 1;
  pageSize = 10;
  activeTab: 'info' | 'workflow' | 'letter' | 'history' = 'info';
  selectedOffer: OfferRecord | null = null;
  showCreateModal = false;
  showMoreActions = false;

  createForm = {
    requisitionId: '', candidateId: '', candidateName: '', candidatePhone: '', candidateEmail: '',
    designation: '', offeredCTC: '', joiningDate: '', location: '', offerExpiry: '',
    employmentType: 'Full Time', comment: '',
  };

  statuses    = ['All','Draft','Approval Pending','Approved','Released','Accepted','Rejected','Expired'];
  departments = ['All','Information Technology','Finance','Human Resources','Marketing'];
  locations   = ['All','Bangalore','Delhi','Mumbai','Hyderabad','Pune'];
  empTypes    = ['Full Time','Part Time','Contract','Internship'];

  // Simulated totals across all pages
  totalStats  = { draft:12, pending:8, approved:15, released:10, accepted:7, rejected:3, expired:2 };

  offers: OfferRecord[] = [
    {
      id:'1', requisitionId:'REQ-2024-00056', candidateName:'Arjun Nair',
      candidateId:'CAND-000124', candidateInitials:'AN', candidateColor:'#6366f1',
      candidateType:'Internal', candidatePhone:'+91 98765 43210', candidateEmail:'arjun.nair@email.com',
      department:'Information Technology', designation:'Software Engineer',
      location:'Bangalore', joiningDate:'15-Jun-2024', hiringManager:'Amit Verma',
      offerExpiry:'20-May-2024', daysLeft:5, status:'Draft',
      offeredCTC:'₹12,00,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹6,00,000'},
        {component:'HRA',               amount:'₹2,40,000'},
        {component:'Special Allowance', amount:'₹2,40,000'},
        {component:'Employer PF',       amount:'₹72,000'},
        {component:'Total CTC',         amount:'₹12,00,000', isTotal:true},
      ],
      approvalSteps:[
        {step:1,role:'Recruiter',     person:'Rahul Sharma',status:'approved',date:'Approved on 10-May-2024'},
        {step:2,role:'Hiring Manager',person:'Amit Verma',  status:'approved',date:'Approved on 11-May-2024'},
        {step:3,role:'HR Manager',    person:'',             status:'pending'},
        {step:4,role:'Finance',       person:'',             status:'pending'},
        {step:5,role:'Offer Release', person:'',             status:'pending'},
      ],
      history:[
        {dateTime:'13-May-2024 10:20 AM',user:'Rahul Sharma',  action:'Created Offer',           remarks:'Offer drafted for candidate.'},
        {dateTime:'10-May-2024 09:30 AM',user:'Rahul Sharma',  action:'Submitted for Approval',  remarks:'Sent to HR Manager.'},
        {dateTime:'11-May-2024 04:15 PM',user:'Amit Verma',    action:'Approved',                remarks:'Offer approved by Hiring Manager.'},
      ],
    },
    {
      id:'2', requisitionId:'REQ-2024-00057', candidateName:'Priya Sharma',
      candidateId:'CAND-000125', candidateInitials:'PS', candidateColor:'#ec4899',
      candidateType:'External', candidatePhone:'+91 87654 32109', candidateEmail:'priya.sharma@email.com',
      department:'Finance', designation:'Financial Analyst',
      location:'Bangalore', joiningDate:'20-Jun-2024', hiringManager:'Neha Kapoor',
      offerExpiry:'22-May-2024', daysLeft:null, status:'Approval Pending',
      offeredCTC:'₹8,00,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹4,00,000'},
        {component:'HRA',               amount:'₹1,60,000'},
        {component:'Special Allowance', amount:'₹1,60,000'},
        {component:'Employer PF',       amount:'₹48,000'},
        {component:'Total CTC',         amount:'₹8,00,000', isTotal:true},
      ],
      approvalSteps:[
        {step:1,role:'Recruiter',     person:'Rahul Sharma',status:'approved',date:'Approved on 12-May-2024'},
        {step:2,role:'Hiring Manager',person:'Neha Kapoor', status:'pending'},
        {step:3,role:'HR Manager',    person:'',             status:'pending'},
        {step:4,role:'Finance',       person:'',             status:'pending'},
        {step:5,role:'Offer Release', person:'',             status:'pending'},
      ],
      history:[
        {dateTime:'12-May-2024 11:00 AM',user:'Rahul Sharma',action:'Created Offer',          remarks:'Offer drafted.'},
        {dateTime:'12-May-2024 03:00 PM',user:'Rahul Sharma',action:'Submitted for Approval', remarks:'Awaiting HM approval.'},
      ],
    },
    {
      id:'3', requisitionId:'REQ-2024-00058', candidateName:'Rahul Verma',
      candidateId:'CAND-000126', candidateInitials:'RV', candidateColor:'#0ea5e9',
      candidateType:'External', candidatePhone:'+91 76543 21098', candidateEmail:'rahul.verma@email.com',
      department:'Human Resources', designation:'HR Executive',
      location:'Delhi', joiningDate:'25-Jun-2024', hiringManager:'Sanjay Gupta',
      offerExpiry:'23-May-2024', daysLeft:null, status:'Approved',
      offeredCTC:'₹6,00,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹3,00,000'},
        {component:'HRA',               amount:'₹1,20,000'},
        {component:'Special Allowance', amount:'₹1,20,000'},
        {component:'Employer PF',       amount:'₹36,000'},
        {component:'Total CTC',         amount:'₹6,00,000', isTotal:true},
      ],
      approvalSteps:[
        {step:1,role:'Recruiter',     person:'Rahul Sharma',status:'approved',date:'Approved on 13-May-2024'},
        {step:2,role:'Hiring Manager',person:'Sanjay Gupta',status:'approved',date:'Approved on 14-May-2024'},
        {step:3,role:'HR Manager',    person:'Meera Joshi', status:'approved',date:'Approved on 15-May-2024'},
        {step:4,role:'Finance',       person:'',             status:'pending'},
        {step:5,role:'Offer Release', person:'',             status:'pending'},
      ],
      history:[
        {dateTime:'13-May-2024 10:00 AM',user:'Rahul Sharma',action:'Created Offer',   remarks:'Offer drafted.'},
        {dateTime:'15-May-2024 05:00 PM',user:'Meera Joshi', action:'Approved',        remarks:'HR Manager approved.'},
      ],
    },
    {
      id:'4', requisitionId:'REQ-2024-00059', candidateName:'Neha Taneja',
      candidateId:'CAND-000127', candidateInitials:'NT', candidateColor:'#f59e0b',
      candidateType:'External', candidatePhone:'+91 65432 10987', candidateEmail:'neha.taneja@email.com',
      department:'Marketing', designation:'Marketing Executive',
      location:'Mumbai', joiningDate:'10-Jun-2024', hiringManager:'Pooja Malhotra',
      offerExpiry:'18-May-2024', daysLeft:null, status:'Released',
      offeredCTC:'₹7,00,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹3,50,000'},
        {component:'HRA',               amount:'₹1,40,000'},
        {component:'Special Allowance', amount:'₹1,40,000'},
        {component:'Employer PF',       amount:'₹42,000'},
        {component:'Total CTC',         amount:'₹7,00,000', isTotal:true},
      ],
      approvalSteps:[
        {step:1,role:'Recruiter',     person:'Rahul Sharma',  status:'approved',date:'Approved on 08-May-2024'},
        {step:2,role:'Hiring Manager',person:'Pooja Malhotra',status:'approved',date:'Approved on 09-May-2024'},
        {step:3,role:'HR Manager',    person:'Meera Joshi',   status:'approved',date:'Approved on 10-May-2024'},
        {step:4,role:'Finance',       person:'Vikram Mehta',  status:'approved',date:'Approved on 11-May-2024'},
        {step:5,role:'Offer Release', person:'Rahul Sharma',  status:'approved',date:'Released on 12-May-2024'},
      ],
      history:[
        {dateTime:'08-May-2024 09:00 AM',user:'Rahul Sharma',  action:'Created Offer',   remarks:'Offer drafted.'},
        {dateTime:'12-May-2024 04:00 PM',user:'Rahul Sharma',  action:'Offer Released',  remarks:'Sent to candidate.'},
      ],
    },
    {
      id:'5', requisitionId:'REQ-2024-00060', candidateName:'Vikram Singh',
      candidateId:'CAND-000128', candidateInitials:'VS', candidateColor:'#10b981',
      candidateType:'External', candidatePhone:'+91 54321 09876', candidateEmail:'vikram.singh@email.com',
      department:'Information Technology', designation:'DevOps Engineer',
      location:'Bangalore', joiningDate:'05-Jun-2024', hiringManager:'Amit Verma',
      offerExpiry:'17-May-2024', daysLeft:null, status:'Accepted',
      offeredCTC:'₹15,00,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹7,50,000'},
        {component:'HRA',               amount:'₹3,00,000'},
        {component:'Special Allowance', amount:'₹3,00,000'},
        {component:'Employer PF',       amount:'₹90,000'},
        {component:'Total CTC',         amount:'₹15,00,000', isTotal:true},
      ],
      approvalSteps:[
        {step:1,role:'Recruiter',     person:'Rahul Sharma', status:'approved',date:'Approved on 05-May-2024'},
        {step:2,role:'Hiring Manager',person:'Amit Verma',   status:'approved',date:'Approved on 06-May-2024'},
        {step:3,role:'HR Manager',    person:'Meera Joshi',  status:'approved',date:'Approved on 07-May-2024'},
        {step:4,role:'Finance',       person:'Vikram Mehta', status:'approved',date:'Approved on 08-May-2024'},
        {step:5,role:'Offer Release', person:'Rahul Sharma', status:'approved',date:'Released on 09-May-2024'},
      ],
      history:[
        {dateTime:'05-May-2024 10:00 AM',user:'Rahul Sharma',  action:'Created Offer',     remarks:'Offer drafted.'},
        {dateTime:'09-May-2024 11:00 AM',user:'Rahul Sharma',  action:'Offer Released',    remarks:'Sent to candidate.'},
        {dateTime:'12-May-2024 02:00 PM',user:'Vikram Singh',  action:'Offer Accepted',    remarks:'Candidate accepted the offer.'},
      ],
    },
    {
      id:'6', requisitionId:'REQ-2024-00061', candidateName:'Sneha Iyer',
      candidateId:'CAND-000129', candidateInitials:'SI', candidateColor:'#8b5cf6',
      candidateType:'External', candidatePhone:'+91 43210 98765', candidateEmail:'sneha.iyer@email.com',
      department:'Finance', designation:'Accounts Executive',
      location:'Hyderabad', joiningDate:'12-Jun-2024', hiringManager:'Neha Kapoor',
      offerExpiry:'16-May-2024', daysLeft:null, status:'Rejected',
      offeredCTC:'₹5,00,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹2,50,000'},
        {component:'HRA',               amount:'₹1,00,000'},
        {component:'Special Allowance', amount:'₹1,00,000'},
        {component:'Employer PF',       amount:'₹30,000'},
        {component:'Total CTC',         amount:'₹5,00,000', isTotal:true},
      ],
      approvalSteps:[
        {step:1,role:'Recruiter',     person:'Rahul Sharma',status:'approved',date:'Approved on 06-May-2024'},
        {step:2,role:'Hiring Manager',person:'Neha Kapoor', status:'rejected',date:'Rejected on 07-May-2024'},
        {step:3,role:'HR Manager',    person:'',             status:'pending'},
        {step:4,role:'Finance',       person:'',             status:'pending'},
        {step:5,role:'Offer Release', person:'',             status:'pending'},
      ],
      history:[
        {dateTime:'06-May-2024 09:30 AM',user:'Rahul Sharma',action:'Created Offer',    remarks:'Offer drafted.'},
        {dateTime:'07-May-2024 03:15 PM',user:'Neha Kapoor', action:'Offer Rejected',   remarks:'CTC not aligned with budget.'},
      ],
    },
    {
      id:'7', requisitionId:'REQ-2024-00062', candidateName:'Karan Joshi',
      candidateId:'CAND-000130', candidateInitials:'KJ', candidateColor:'#f97316',
      candidateType:'External', candidatePhone:'+91 32109 87654', candidateEmail:'karan.joshi@email.com',
      department:'Information Technology', designation:'QA Engineer',
      location:'Pune', joiningDate:'18-Jun-2024', hiringManager:'Amit Verma',
      offerExpiry:'25-May-2024', daysLeft:null, status:'Expired',
      offeredCTC:'₹9,00,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹4,50,000'},
        {component:'HRA',               amount:'₹1,80,000'},
        {component:'Special Allowance', amount:'₹1,80,000'},
        {component:'Employer PF',       amount:'₹54,000'},
        {component:'Total CTC',         amount:'₹9,00,000', isTotal:true},
      ],
      approvalSteps:[
        {step:1,role:'Recruiter',     person:'Rahul Sharma',status:'approved',date:'Approved on 14-May-2024'},
        {step:2,role:'Hiring Manager',person:'Amit Verma',  status:'approved',date:'Approved on 15-May-2024'},
        {step:3,role:'HR Manager',    person:'Meera Joshi', status:'approved',date:'Approved on 16-May-2024'},
        {step:4,role:'Finance',       person:'Vikram Mehta',status:'approved',date:'Approved on 17-May-2024'},
        {step:5,role:'Offer Release', person:'',             status:'pending'},
      ],
      history:[
        {dateTime:'14-May-2024 09:00 AM',user:'Rahul Sharma',action:'Created Offer',   remarks:'Offer drafted.'},
        {dateTime:'26-May-2024 12:00 AM',user:'System',      action:'Offer Expired',   remarks:'Offer expired without candidate response.'},
      ],
    },
    {
      id:'8', requisitionId:'REQ-2024-00063', candidateName:'Meera Nair',
      candidateId:'CAND-000131', candidateInitials:'MN', candidateColor:'#14b8a6',
      candidateType:'External', candidatePhone:'+91 21098 76543', candidateEmail:'meera.nair@email.com',
      department:'Human Resources', designation:'HR Executive',
      location:'Bangalore', joiningDate:'28-Jun-2024', hiringManager:'Sanjay Gupta',
      offerExpiry:'26-May-2024', daysLeft:null, status:'Draft',
      offeredCTC:'₹5,50,000 (Per Annum)', employmentType:'Full Time',
      compensation:[
        {component:'Basic Salary',      amount:'₹2,75,000'},
        {component:'HRA',               amount:'₹1,10,000'},
        {component:'Special Allowance', amount:'₹1,10,000'},
        {component:'Employer PF',       amount:'₹33,000'},
        {component:'Total CTC',         amount:'₹5,50,000', isTotal:true},
      ],
      approvalSteps: defaultSteps('Rahul Sharma','Sanjay Gupta'),
      history:[
        {dateTime:'16-May-2024 10:00 AM',user:'Rahul Sharma',action:'Created Offer',remarks:'Offer in draft state.'},
      ],
    },
  ];

  get filteredOffers() {
    const q = this.searchQuery.toLowerCase();
    return this.offers.filter(o => {
      const ms = !q || o.candidateName.toLowerCase().includes(q) ||
        o.requisitionId.toLowerCase().includes(q) || o.designation.toLowerCase().includes(q);
      const mv = this.statusFilter === 'All' || o.status === this.statusFilter;
      const md = this.departmentFilter === 'All' || o.department === this.departmentFilter;
      const ml = this.locationFilter === 'All' || o.location === this.locationFilter;
      return ms && mv && md && ml;
    });
  }
  get paginatedOffers() {
    const s = (this.currentPage - 1) * this.pageSize;
    return this.filteredOffers.slice(s, s + this.pageSize);
  }
  get totalPages()  { return Math.max(1, Math.ceil(this.filteredOffers.length / this.pageSize)); }
  get showingFrom() { return this.filteredOffers.length ? (this.currentPage - 1) * this.pageSize + 1 : 0; }
  get showingTo()   { return Math.min(this.currentPage * this.pageSize, this.filteredOffers.length); }

  selectOffer(o: OfferRecord) { this.selectedOffer = o; this.activeTab = 'info'; this.showMoreActions = false; }
  closePanel()                { this.selectedOffer = null; }
  setTab(t: 'info' | 'workflow' | 'letter' | 'history') { this.activeTab = t; }
  openCreate()  { this.showCreateModal = true; }
  closeCreate() { this.showCreateModal = false; }

  onFilterChange() { this.currentPage = 1; }

  submitOffer() {
    if (!this.createForm.requisitionId || !this.createForm.candidateId) return;
    this.showCreateModal = false;
  }

  canSendToCandidate(): boolean {
    return this.selectedOffer?.status === 'Approved' || this.selectedOffer?.status === 'Released';
  }

  statusStyle(s: string): { bg: string; color: string; border: string } {
    const m: Record<string, {bg:string;color:string;border:string}> = {
      'Draft':            {bg:'#f1f5f9', color:'#64748b', border:'#e2e8f0'},
      'Approval Pending': {bg:'#fff7ed', color:'#c2410c', border:'#fed7aa'},
      'Approved':         {bg:'#dcfce7', color:'#15803d', border:'#bbf7d0'},
      'Released':         {bg:'#eff6ff', color:'#1d4ed8', border:'#bfdbfe'},
      'Accepted':         {bg:'#dcfce7', color:'#15803d', border:'#bbf7d0'},
      'Rejected':         {bg:'#fee2e2', color:'#b91c1c', border:'#fecaca'},
      'Expired':          {bg:'#f1f5f9', color:'#475569', border:'#cbd5e1'},
    };
    return m[s] || {bg:'#f1f5f9', color:'#64748b', border:'#e2e8f0'};
  }
}
