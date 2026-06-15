import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TimelineActivity {
  date: string;
  time: string;
  activity: string;
  details: string;
  performedBy: string;
  role: string;
  module: string;
  moduleColor: string;
  moduleBg: string;
  dotColor: string;
  iconBg: string;
  iconColor: string;
}

@Component({
  selector: 'app-candidate-timeline',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-timeline.component.html',
  styleUrls: ['./candidate-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateTimelineComponent {
  @Output() navigate = new EventEmitter<string>();

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  filterActivityType = 'All';
  filterModule = 'All';
  filterPerformedBy = 'All';
  searchQuery = '';

  activityTypes  = ['All', 'Stage Change', 'Interview', 'Document', 'Offer', 'Communication'];
  moduleOptions  = ['All', 'Pipeline', 'Interview Management', 'Candidate Documents', 'Offer Management', 'Communication'];
  performerOptions = ['All', 'Sneha Thakur', 'Amit Verma', 'Vikram Singh', 'Rahul Sharma', 'System'];

  stageTracker = [
    { label: 'Applied',       date: '01-Jun', done: true  },
    { label: 'Screening',     date: '03-Jun', done: true  },
    { label: 'Interview',     date: '05-Jun', done: true  },
    { label: 'Documentation', date: '10-Jun', done: true  },
    { label: 'Offer',         date: '12-Jun', done: false, current: true },
    { label: 'Hired',         date: '—',      done: false },
  ];

  activities: TimelineActivity[] = [
    { date:'12-Jun-2026', time:'10:30 AM', activity:'Offer Released',               details:'Offer letter generated and sent to candidate.',                performedBy:'Sneha Thakur', role:'Recruiter',    module:'Offer Management',    moduleColor:'#7c3aed', moduleBg:'#f5f3ff', dotColor:'#7c3aed', iconBg:'#f5f3ff', iconColor:'#7c3aed' },
    { date:'11-Jun-2026', time:'03:45 PM', activity:'Documents Verified',           details:'All mandatory documents verified.',                            performedBy:'Amit Verma',   role:'HR Executive',  module:'Candidate Documents', moduleColor:'#2563eb', moduleBg:'#eff6ff', dotColor:'#3b82f6', iconBg:'#eff6ff', iconColor:'#2563eb' },
    { date:'10-Jun-2026', time:'11:15 AM', activity:'Documents Uploaded',           details:'Candidate uploaded PAN Card and Experience Letter.',           performedBy:'Rahul Sharma', role:'Candidate',     module:'Candidate Documents', moduleColor:'#2563eb', moduleBg:'#eff6ff', dotColor:'#3b82f6', iconBg:'#eff6ff', iconColor:'#2563eb' },
    { date:'08-Jun-2026', time:'04:00 PM', activity:'Interview Selected',           details:'Candidate cleared Technical Round.',                           performedBy:'Sneha Thakur', role:'Recruiter',     module:'Interview Management', moduleColor:'#d97706', moduleBg:'#fffbeb', dotColor:'#f59e0b', iconBg:'#fffbeb', iconColor:'#d97706' },
    { date:'08-Jun-2026', time:'02:30 PM', activity:'Interview Feedback Submitted', details:'Recommendation: Hire',                                         performedBy:'Vikram Singh', role:'Interviewer',   module:'Interview Management', moduleColor:'#d97706', moduleBg:'#fffbeb', dotColor:'#f59e0b', iconBg:'#fffbeb', iconColor:'#d97706' },
    { date:'05-Jun-2026', time:'11:00 AM', activity:'Interview Scheduled',          details:'Technical Interview scheduled for 08-Jun-2026 at 11:00 AM.',  performedBy:'Sneha Thakur', role:'Recruiter',     module:'Interview Management', moduleColor:'#d97706', moduleBg:'#fffbeb', dotColor:'#f59e0b', iconBg:'#fffbeb', iconColor:'#d97706' },
    { date:'03-Jun-2026', time:'09:45 AM', activity:'Candidate Shortlisted',        details:'Candidate moved to Shortlisted stage.',                        performedBy:'Sneha Thakur', role:'Recruiter',     module:'Pipeline',             moduleColor:'#059669', moduleBg:'#ecfdf5', dotColor:'#10b981', iconBg:'#ecfdf5', iconColor:'#059669' },
    { date:'01-Jun-2026', time:'10:00 AM', activity:'Application Received',         details:'Candidate applied for the position.',                          performedBy:'System',       role:'System',        module:'Pipeline',             moduleColor:'#059669', moduleBg:'#ecfdf5', dotColor:'#10b981', iconBg:'#ecfdf5', iconColor:'#059669' },
    { date:'01-Jun-2026', time:'10:05 AM', activity:'Email Sent',                   details:'Application received confirmation email sent to candidate.',   performedBy:'System',       role:'System',        module:'Communication',        moduleColor:'#0891b2', moduleBg:'#ecfeff', dotColor:'#06b6d4', iconBg:'#ecfeff', iconColor:'#0891b2' },
  ];

  get filteredActivities(): TimelineActivity[] {
    return this.activities.filter(a => {
      if (this.filterModule !== 'All' && a.module !== this.filterModule) return false;
      if (this.filterPerformedBy !== 'All' && !a.performedBy.includes(this.filterPerformedBy) && a.performedBy !== this.filterPerformedBy) return false;
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        return a.activity.toLowerCase().includes(q) || a.details.toLowerCase().includes(q);
      }
      return true;
    });
  }

  goBack(): void { this.navigate.emit('candidate-pipeline'); }
}
