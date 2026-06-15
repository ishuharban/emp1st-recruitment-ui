import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Candidate {
  id: number;
  name: string;
  initials: string;
  role: string;
  experience: string;
  source: string;
  date: string;
  interviewDate?: string;
  statusBadge?: string;
  statusColor?: string;
}

interface StageColumn {
  key: string;
  name: string;
  color: string;
  count: number;
  candidates: Candidate[];
}

@Component({
  selector: 'app-candidate-pipeline',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-pipeline.component.html',
  styleUrls: ['./candidate-pipeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatePipelineComponent {
  @Output() navigate = new EventEmitter<string>();

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  selectedJob = 'Software Engineer – Bangalore (REQ-2024-0015)';
  jobOptions = [
    'Software Engineer – Bangalore (REQ-2024-0015)',
    'Senior Developer – Mumbai (REQ-2024-0016)',
    'HR Manager – Delhi (REQ-2024-0017)',
  ];

  selectedCandidate: Candidate | null = null;
  activeTab: 'overview' | 'timeline' | 'resume' | 'notes' | 'documents' = 'overview';

  // ── Drag & Drop ──
  draggedId: number | null = null;
  dragSourceKey: string | null = null;
  dragOverKey: string | null = null;

  // ── Add Candidate Modal ──
  showAddModal = false;
  addMode: 'upload' | 'manual' = 'upload';
  uploadFileName = '';
  addForm = { name:'', email:'', phone:'', role:'', experience:'', source:'', location:'', stage:'bucket' };

  stages: StageColumn[] = [
    {
      key: 'bucket', name: 'In Bucket', color: '#64748b', count: 12,
      candidates: [
        { id:1,  name:'Rahul Mehta',  initials:'RM', role:'Software Engineer', experience:'2.6 Yrs', source:'LinkedIn', date:'10 May 2024' },
        { id:2,  name:'Priya Nair',   initials:'PN', role:'Software Engineer', experience:'1.8 Yrs', source:'Naukri',   date:'09 May 2024' },
        { id:3,  name:'Sagar Patel',  initials:'SP', role:'Software Engineer', experience:'3.1 Yrs', source:'Referral', date:'09 May 2024' },
        { id:4,  name:'Neha Singh',   initials:'NS', role:'Software Engineer', experience:'2.3 Yrs', source:'Indeed',   date:'08 May 2024' },
      ]
    },
    {
      key: 'interview', name: 'Selected for Interview', color: '#f59e0b', count: 8,
      candidates: [
        { id:5, name:'Ankit Verma',    initials:'AV', role:'Software Engineer', experience:'3.6 Yrs', source:'LinkedIn',     date:'', interviewDate:'Interview on 15 May' },
        { id:6, name:'Megha Iyer',     initials:'MI', role:'Software Engineer', experience:'2.9 Yrs', source:'Naukri',       date:'', interviewDate:'Interview on 14 May' },
        { id:7, name:'Karan Malhotra', initials:'KM', role:'Software Engineer', experience:'4.2 Yrs', source:'Career Portal',date:'', interviewDate:'Interview on 16 May' },
        { id:8, name:'Sneha Reddy',    initials:'SR', role:'Software Engineer', experience:'2.7 Yrs', source:'Naukri',       date:'', interviewDate:'Interview on 12 May' },
      ]
    },
    {
      key: 'post-interview', name: 'Selected after Interview', color: '#3b82f6', count: 6,
      candidates: [
        { id:9,  name:'Aditi Sharma', initials:'AS', role:'Software Engineer', experience:'3.4 Yrs', source:'Referral', date:'', interviewDate:'Interview on 10 May' },
        { id:10, name:'Vikram Joshi', initials:'VJ', role:'Software Engineer', experience:'4.5 Yrs', source:'LinkedIn', date:'', interviewDate:'Interview on 11 May' },
      ]
    },
    {
      key: 'docs', name: 'Documentation', color: '#0891b2', count: 4,
      candidates: [
        { id:11, name:'Rohit Gupta',   initials:'RG', role:'Software Engineer', experience:'3.2 Yrs', source:'Career Portal', date:'Since 12 May', statusBadge:'Docs In Progress', statusColor:'#0891b2' },
        { id:12, name:'Divya Nambiar', initials:'DN', role:'Software Engineer', experience:'2.5 Yrs', source:'Referral',      date:'Since 13 May', statusBadge:'Docs In Progress', statusColor:'#0891b2' },
      ]
    },
    {
      key: 'offered', name: 'Offered', color: '#f97316', count: 6,
      candidates: [
        { id:13, name:'Arjun Menon', initials:'AM', role:'Software Engineer', experience:'4.1 Yrs', source:'LinkedIn', date:'Offer on 14 May', statusBadge:'Offer Released', statusColor:'#f97316' },
        { id:14, name:'Pooja Bhatt', initials:'PB', role:'Software Engineer', experience:'3.0 Yrs', source:'Naukri',   date:'Offer on 13 May', statusBadge:'Offer Released', statusColor:'#f97316' },
      ]
    },
    {
      key: 'hired', name: 'Hired', color: '#22c55e', count: 6,
      candidates: [
        { id:15, name:'Manish Kumar', initials:'MK', role:'Software Engineer', experience:'3.8 Yrs', source:'Referral', date:'Joined on 20 May', statusBadge:'Joined', statusColor:'#22c55e' },
        { id:16, name:'Swati Desai',  initials:'SD', role:'Software Engineer', experience:'2.0 Yrs', source:'Naukri',   date:'Joined on 18 May', statusBadge:'Joined', statusColor:'#22c55e' },
      ]
    },
  ];

  readonly totalCandidates = 42;

  get stageKeys(): string[] { return this.stages.map(s => s.key); }

  // ── Candidate detail ──
  selectCandidate(c: Candidate): void { this.selectedCandidate = c; this.activeTab = 'overview'; }
  closeDetail(): void { this.selectedCandidate = null; }
  viewFullProfile(): void { this.navigate.emit('candidate-timeline'); }

  currentStageOf(c: Candidate): string {
    return this.stages.find(s => s.candidates.some(x => x.id === c.id))?.name || '';
  }

  // ── Drag & Drop ──
  onDragStart(event: DragEvent, candidateId: number, stageKey: string): void {
    this.draggedId = candidateId;
    this.dragSourceKey = stageKey;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(candidateId));
    }
  }

  onDragOver(event: DragEvent, stageKey: string): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    this.dragOverKey = stageKey;
  }

  onDragLeave(event: DragEvent): void {
    const el = event.currentTarget as HTMLElement;
    if (!el.contains(event.relatedTarget as Node)) {
      this.dragOverKey = null;
    }
  }

  onDrop(event: DragEvent, targetStage: StageColumn): void {
    event.preventDefault();
    this.dragOverKey = null;
    if (this.draggedId === null || !this.dragSourceKey || this.dragSourceKey === targetStage.key) {
      this.draggedId = null; this.dragSourceKey = null; return;
    }
    const sourceStage = this.stages.find(s => s.key === this.dragSourceKey);
    if (!sourceStage) return;
    const idx = sourceStage.candidates.findIndex(c => c.id === this.draggedId);
    if (idx === -1) return;
    const [moved] = sourceStage.candidates.splice(idx, 1);
    targetStage.candidates.push(moved);
    sourceStage.count = Math.max(0, sourceStage.count - 1);
    targetStage.count++;
    this.draggedId = null;
    this.dragSourceKey = null;
  }

  onDragEnd(): void { this.draggedId = null; this.dragSourceKey = null; this.dragOverKey = null; }

  // ── Add Candidate Modal ──
  openAddModal(): void {
    this.showAddModal = true;
    this.addMode = 'upload';
    this.uploadFileName = '';
    this.addForm = { name:'', email:'', phone:'', role:'', experience:'', source:'', location:'', stage:'bucket' };
  }

  closeAddModal(): void { this.showAddModal = false; }

  onResumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) { this.uploadFileName = input.files[0].name; }
  }

  addCandidate(): void {
    const today = new Date().toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g,'-');

    if (this.addMode === 'manual' && this.addForm.name.trim()) {
      const ini = this.addForm.name.trim().split(/\s+/).map((w: string) => w[0]).join('').slice(0,2).toUpperCase();
      const targetStage = this.stages.find(s => s.key === this.addForm.stage) || this.stages[0];
      targetStage.candidates.push({
        id: Date.now(), name: this.addForm.name.trim(), initials: ini,
        role: this.addForm.role || 'Candidate',
        experience: this.addForm.experience ? this.addForm.experience + ' Yrs' : '—',
        source: this.addForm.source || 'Manual', date: today,
      });
      targetStage.count++;
    } else if (this.addMode === 'upload' && this.uploadFileName) {
      const name = this.uploadFileName.replace(/\.(pdf|doc|docx)$/i,'').replace(/[_\-]+/g,' ').trim();
      const ini = name.split(/\s+/).map((w: string) => w[0]).join('').slice(0,2).toUpperCase() || 'CA';
      this.stages[0].candidates.push({
        id: Date.now(), name, initials: ini, role: 'Candidate',
        experience: '—', source: 'Resume Upload', date: today,
      });
      this.stages[0].count++;
    }
    this.closeAddModal();
  }

  sourcesOptions = ['LinkedIn','Naukri','Referral','Career Portal','Indeed','Manual','Other'];
}
