import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type PermVal = boolean | null;
export interface Permission { view:PermVal; create:PermVal; edit:PermVal; delete:PermVal; approve:PermVal; export:PermVal; }
export interface ModuleRow  { name:string; icon:string; permissions:Permission; }
export interface AssignedUser { name:string; role:string; initials:string; color:string; }
export interface AccessScope  { module:string; allowed:boolean; }

export interface AcRole {
  id:string; name:string; userCount:number; color:string; initials?: string;
  description:string; type:'System Role'|'Custom Role';
  active:boolean; createdOn:string; lastUpdated:string;
  modules:ModuleRow[]; assignedUsers:AssignedUser[]; accessScope:AccessScope[];

}

const MOD_NAMES = [
  'Requisition Management','Job Posting','Candidate Pipeline',
  'Interview Management','Candidate Documents','Offer Management',
  'Reports & Analytics','Configuration','User Management',
  'Automation Rules','Email & Notifications',
];
const MOD_ICONS = ['req','job','pipe','int','doc','offer','rep','cfg','usr','auto','mail'];

function mkPerm(v:PermVal,c:PermVal,e:PermVal,d:PermVal,a:PermVal,x:PermVal): Permission {
  return {view:v,create:c,edit:e,delete:d,approve:a,export:x};
}

function mkModules(rows: [PermVal,PermVal,PermVal,PermVal,PermVal,PermVal][]): ModuleRow[] {
  return MOD_NAMES.map((name,i) => ({
    name, icon: MOD_ICONS[i],
    permissions: mkPerm(...rows[i]),
  }));
}

const hrAdminModules   = mkModules([
  [true,true,true,false,true,true],   // Requisition
  [true,true,true,false,false,true],  // Job Posting
  [true,true,true,true,false,true],   // Candidate Pipeline
  [true,true,true,true,false,true],   // Interview Management
  [true,true,true,true,true,true],    // Candidate Documents
  [true,true,true,true,true,true],    // Offer Management
  [true,false,false,false,false,true],// Reports
  [true,true,true,true,false,false],  // Configuration
  [true,true,true,true,false,false],  // User Management
  [true,true,true,true,false,false],  // Automation Rules
  [true,true,true,false,false,null],  // Email & Notifications
]);

const recruiterModules = mkModules([
  [true,true,true,false,false,true],
  [true,true,true,false,false,true],
  [true,true,true,false,false,true],
  [true,true,true,false,false,true],
  [true,true,true,false,false,true],
  [true,false,false,false,false,true],
  [true,false,false,false,false,true],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [true,false,false,false,false,null],
]);

const hmModules = mkModules([
  [true,false,false,false,true,true],
  [true,false,false,false,false,true],
  [true,true,true,false,true,true],
  [true,true,true,false,true,true],
  [true,true,false,false,false,true],
  [true,false,false,false,true,true],
  [true,false,false,false,false,true],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [true,false,false,false,false,null],
]);

const interviewerModules = mkModules([
  [true,false,false,false,false,false],
  [true,false,false,false,false,false],
  [true,false,false,false,false,true],
  [true,true,true,false,false,true],
  [true,false,false,false,false,true],
  [true,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [true,false,false,false,false,null],
]);

@Component({
  selector: 'app-access-control',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './access-control.component.html',
  styleUrl: './access-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessControlComponent {
  @Output() navigate = new EventEmitter<string>();

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  searchQuery   = '';
  bulkEditMode  = false;
  showCreateModal = false;
  showViewAll   = false;

  createForm = { name:'', type:'System Role', description:'' };

  permKeys: (keyof Permission)[] = ['view','create','edit','delete','approve','export'];
  permLabels = ['View','Create','Edit','Delete','Approve','Export'];

  roles: AcRole[] = [
    {
      id:'1', name:'HR Admin', userCount:6, color:'#6366f1',
      description:'Full access to all recruitment modules and system configuration.',
      type:'System Role', active:true, createdOn:'10-Jan-2024', lastUpdated:'22-May-2024 by Rahul Sharma',
      modules: hrAdminModules,
      assignedUsers:[
        {name:'Rahul Sharma',  role:'HR Admin',                 initials:'RS', color:'#6366f1'},
        {name:'Meera Joshi',   role:'HR Manager',               initials:'MJ', color:'#ec4899'},
        {name:'Amit Verma',    role:'HR Executive',             initials:'AV', color:'#3b82f6'},
        {name:'Sneha Menon',   role:'Talent Acquisition Lead',  initials:'SM', color:'#f97316'},
        {name:'Vikram Singh',  role:'HR Generalist',            initials:'VS', color:'#10b981'},
        {name:'Pooja Verma',   role:'HR Coordinator',           initials:'PV', color:'#8b5cf6'},
      ],
      accessScope:[
        {module:'Requisition',            allowed:true},
        {module:'Candidates',             allowed:true},
        {module:'Interviews',             allowed:true},
        {module:'Documents',              allowed:true},
        {module:'Offers',                 allowed:true},
        {module:'Recruitment Config',     allowed:true},
        {module:'User Management',        allowed:true},
      ],
    },
    {
      id:'2', name:'Recruiter', userCount:12, color:'#22c55e',
      description:'Manage end-to-end recruitment activities including sourcing, scheduling and tracking candidates.',
      type:'System Role', active:true, createdOn:'10-Jan-2024', lastUpdated:'20-May-2024 by Rahul Sharma',
      modules: recruiterModules,
      assignedUsers:[
        {name:'Priya Sharma',  role:'Senior Recruiter',     initials:'PS', color:'#ec4899'},
        {name:'Karan Joshi',   role:'Recruiter',             initials:'KJ', color:'#f97316'},
        {name:'Neha Taneja',   role:'Talent Specialist',     initials:'NT', color:'#f59e0b'},
      ],
      accessScope:[
        {module:'Requisition',        allowed:true},
        {module:'Candidates',         allowed:true},
        {module:'Interviews',         allowed:true},
        {module:'Documents',          allowed:true},
        {module:'Offers',             allowed:true},
        {module:'Recruitment Config', allowed:false},
        {module:'User Management',    allowed:false},
      ],
    },
    {
      id:'3', name:'Hiring Manager', userCount:10, color:'#3b82f6',
      description:'Review candidates and approve offers for open positions.',
      type:'System Role', active:true, createdOn:'10-Jan-2024', lastUpdated:'18-May-2024 by Rahul Sharma',
      modules: hmModules,
      assignedUsers:[
        {name:'Sanjay Gupta',   role:'Senior Manager',   initials:'SG', color:'#3b82f6'},
        {name:'Pooja Malhotra', role:'Manager',           initials:'PM', color:'#8b5cf6'},
        {name:'Amit Verma',     role:'Tech Lead',         initials:'AV', color:'#0ea5e9'},
      ],
      accessScope:[
        {module:'Requisition',        allowed:true},
        {module:'Candidates',         allowed:true},
        {module:'Interviews',         allowed:true},
        {module:'Documents',          allowed:false},
        {module:'Offers',             allowed:true},
        {module:'Recruitment Config', allowed:false},
        {module:'User Management',    allowed:false},
      ],
    },
    {
      id:'4', name:'Interviewer', userCount:15, color:'#8b5cf6',
      description:'Conduct and document candidate interviews.',
      type:'System Role', active:true, createdOn:'10-Jan-2024', lastUpdated:'15-May-2024 by Rahul Sharma',
      modules: interviewerModules,
      assignedUsers:[
        {name:'Arun Kumar',   role:'Tech Lead',    initials:'AK', color:'#6366f1'},
        {name:'Divya Nair',   role:'Architect',    initials:'DN', color:'#ec4899'},
      ],
      accessScope:[
        {module:'Requisition',        allowed:false},
        {module:'Candidates',         allowed:true},
        {module:'Interviews',         allowed:true},
        {module:'Documents',          allowed:false},
        {module:'Offers',             allowed:false},
        {module:'Recruitment Config', allowed:false},
        {module:'User Management',    allowed:false},
      ],
    },
    {
      id:'5', name:'Department Head', userCount:5, color:'#f97316',
      description:'Review and approve requisitions for their department.',
      type:'System Role', active:true, createdOn:'10-Jan-2024', lastUpdated:'10-May-2024 by Rahul Sharma',
      modules: mkModules([
        [true,false,false,false,true,true],
        [true,false,false,false,false,false],
        [true,false,false,false,false,true],
        [true,false,false,false,false,true],
        [true,false,false,false,false,false],
        [true,false,false,false,true,false],
        [true,false,false,false,false,true],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,null],
      ]),
      assignedUsers:[
        {name:'Raj Mehta',    role:'VP Engineering',  initials:'RM', color:'#f97316'},
      ],
      accessScope:[
        {module:'Requisition',        allowed:true},
        {module:'Candidates',         allowed:true},
        {module:'Interviews',         allowed:false},
        {module:'Documents',          allowed:false},
        {module:'Offers',             allowed:true},
        {module:'Recruitment Config', allowed:false},
        {module:'User Management',    allowed:false},
      ],
    },
    {
      id:'6', name:'Finance Approver', userCount:4, color:'#ec4899',
      description:'Review and approve offer CTCs and compensation packages.',
      type:'System Role', active:true, createdOn:'10-Jan-2024', lastUpdated:'08-May-2024 by Rahul Sharma',
      modules: mkModules([
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [true,false,false,false,true,true],
        [true,false,false,false,false,true],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,null],
      ]),
      assignedUsers:[
        {name:'Vikram Mehta', role:'Finance Manager',  initials:'VM', color:'#ec4899'},
      ],
      accessScope:[
        {module:'Requisition',        allowed:false},
        {module:'Candidates',         allowed:false},
        {module:'Interviews',         allowed:false},
        {module:'Documents',          allowed:false},
        {module:'Offers',             allowed:true},
        {module:'Recruitment Config', allowed:false},
        {module:'User Management',    allowed:false},
      ],
    },
    {
      id:'7', name:'IT Admin', userCount:3, color:'#0ea5e9',
      description:'Manage system integrations and technical configuration.',
      type:'System Role', active:true, createdOn:'10-Jan-2024', lastUpdated:'05-May-2024 by Rahul Sharma',
      modules: mkModules([
        [true,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [true,false,false,false,false,true],
        [true,true,true,true,false,false],
        [true,true,true,false,false,false],
        [true,true,true,false,false,false],
        [true,true,true,false,false,null],
      ]),
      assignedUsers:[
        {name:'Ravi Nair',    role:'System Admin',    initials:'RN', color:'#0ea5e9'},
      ],
      accessScope:[
        {module:'Requisition',        allowed:false},
        {module:'Candidates',         allowed:false},
        {module:'Interviews',         allowed:false},
        {module:'Documents',          allowed:false},
        {module:'Offers',             allowed:false},
        {module:'Recruitment Config', allowed:true},
        {module:'User Management',    allowed:true},
      ],
    },
    {
      id:'8', name:'Custom Role 1', userCount:2, color:'#64748b',
      description:'Custom role with limited read access for external auditors.',
      type:'Custom Role', active:true, createdOn:'15-Mar-2024', lastUpdated:'01-May-2024 by Rahul Sharma',
      modules: mkModules([
        [true,false,false,false,false,true],
        [true,false,false,false,false,true],
        [true,false,false,false,false,false],
        [true,false,false,false,false,false],
        [true,false,false,false,false,false],
        [true,false,false,false,false,false],
        [true,false,false,false,false,true],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,false],
        [false,false,false,false,false,null],
      ]),
      assignedUsers:[
        {name:'External Auditor 1', role:'Auditor', initials:'EA', color:'#64748b'},
      ],
      accessScope:[
        {module:'Requisition',        allowed:true},
        {module:'Candidates',         allowed:true},
        {module:'Interviews',         allowed:false},
        {module:'Documents',          allowed:false},
        {module:'Offers',             allowed:false},
        {module:'Recruitment Config', allowed:false},
        {module:'User Management',    allowed:false},
      ],
    },
  ];

  selectedRole: AcRole = this.roles[0];


  constructor() {
    // Pre-compute initials for better performance
    this.roles.forEach(role => {
      role.initials = this.getRoleInitials(role.name);
    });
  }
  

  get filteredRoles() {
    const q = this.searchQuery.toLowerCase();
    return !q ? this.roles : this.roles.filter(r => r.name.toLowerCase().includes(q));
  }

  get totalRoles()    { return this.roles.length; }
  get activeRoles()   { return this.roles.filter(r => r.active).length; }
  get customRoles()   { return this.roles.filter(r => r.type === 'Custom Role').length; }
  get usersAssigned() { return this.roles.reduce((s, r) => s + r.userCount, 0); }

  selectRole(r: AcRole) { this.selectedRole = r; this.bulkEditMode = false; }

  togglePerm(mod: ModuleRow, key: keyof Permission) {
    if (!this.bulkEditMode) return;
    const v = mod.permissions[key];
    if (v === null) return;
    (mod.permissions as unknown as Record<string, PermVal>)[key as string] = !v;
  }

  toggleBulkEdit() { this.bulkEditMode = !this.bulkEditMode; }

  saveChanges() { this.bulkEditMode = false; }

  disableRole() {
    this.selectedRole.active = !this.selectedRole.active;
  }

  openCreate()  { this.createForm = {name:'',type:'System Role',description:''}; this.showCreateModal = true; }
  closeCreate() { this.showCreateModal = false; }

  submitCreate() {
    if (!this.createForm.name) return;
    const newRole: AcRole = {
      id: String(this.roles.length + 1),
      name: this.createForm.name,
      userCount: 0,
      color: '#64748b',
      description: this.createForm.description,
      type: this.createForm.type as 'System Role'|'Custom Role',
      active: true,
      createdOn: new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).replace(/ /g,'-'),
      lastUpdated: 'Just now',
      modules: mkModules(Array(11).fill([false,false,false,false,false,false]) as any),
      assignedUsers: [],
      accessScope: [
        {module:'Requisition',        allowed:false},
        {module:'Candidates',         allowed:false},
        {module:'Interviews',         allowed:false},
        {module:'Documents',          allowed:false},
        {module:'Offers',             allowed:false},
        {module:'Recruitment Config', allowed:false},
        {module:'User Management',    allowed:false},
      ],
    };
    this.roles.push(newRole);
    this.selectedRole = newRole;
    this.showCreateModal = false;
  }

  cloneRole() {
    const clone: AcRole = {
      ...this.selectedRole,
      id: String(this.roles.length + 1),
      name: this.selectedRole.name + ' (Copy)',
      type: 'Custom Role',
      userCount: 0,
      assignedUsers: [],
      modules: JSON.parse(JSON.stringify(this.selectedRole.modules)),
    };
    this.roles.push(clone);
    this.selectedRole = clone;
  }


  getRoleInitials(name: string): string {
  if (!name) return '--';
  return name
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
}
