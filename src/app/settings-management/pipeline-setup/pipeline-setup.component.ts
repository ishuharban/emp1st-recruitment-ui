import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-pipeline-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pipeline-setup.component.html',
  styleUrls: ['./pipeline-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PipelineSetupComponent {
  trackByIndex(i: number, _: any) { return i; }
  trackById(_: number, item: { id: string | number }) { return item.id; }

  stages: PipelineStage[] = [
    { id: 1, seq: 1, name: 'Applied',             description: 'Candidate has applied for the job',      color: '#4A90E2', mandatoryAction: 'None',                   sla: 0, notificationsEnabled: true, status: 'Active' },
    { id: 2, seq: 2, name: 'Screening',           description: 'Initial screening of candidate profile',  color: '#F5A623', mandatoryAction: 'Screening Evaluation',   sla: 2, notificationsEnabled: true, status: 'Active' },
    { id: 3, seq: 3, name: 'Shortlisted',         description: 'Candidate qualified screening',           color: '#22B8A5', mandatoryAction: 'Shortlist Candidate',    sla: 2, notificationsEnabled: true, status: 'Active' },
    { id: 4, seq: 4, name: 'Technical Interview', description: 'Technical round(s) of interview',         color: '#7B61FF', mandatoryAction: 'Interview Feedback',     sla: 5, notificationsEnabled: true, status: 'Active' },
    { id: 5, seq: 5, name: 'HR Interview',        description: 'HR round of interview',                   color: '#E94E77', mandatoryAction: 'Interview Feedback',     sla: 3, notificationsEnabled: true, status: 'Active' },
    { id: 6, seq: 6, name: 'Documentation',       description: 'Collect and verify documents',            color: '#FF8A00', mandatoryAction: 'All Documents Verified', sla: 3, notificationsEnabled: true, status: 'Active' },
    { id: 7, seq: 7, name: 'Offered',             description: 'Offer released to candidate',             color: '#5B8DEF', mandatoryAction: 'Offer Approval',         sla: 2, notificationsEnabled: true, status: 'Active' },
    { id: 8, seq: 8, name: 'Hired',               description: 'Candidate has accepted the offer',        color: '#28C76F', mandatoryAction: 'Offer Accepted',         sla: 0, notificationsEnabled: true, status: 'Active' },
    { id: 9, seq: 9, name: 'Rejected',            description: 'Candidate not moving forward',            color: '#EA5455', mandatoryAction: 'Rejection Reason',       sla: 0, notificationsEnabled: true, status: 'Active' },
  ];

  mandatoryActionOptions = ['None', 'Screening Evaluation', 'Shortlist Candidate', 'Interview Feedback', 'All Documents Verified', 'Offer Approval', 'Offer Accepted', 'Rejection Reason'];

  get totalStages()     { return this.stages.length; }
  get activeStagesCnt() { return this.stages.filter(s => s.status === 'Active').length; }
  get inactiveStagesCnt() { return this.stages.filter(s => s.status === 'Inactive').length; }

  addStage(): void {
    const newId = this.stages.length ? Math.max(...this.stages.map(s => s.id)) + 1 : 1;
    this.stages.push({ id: newId, seq: this.stages.length + 1, name: 'New Stage', description: '', color: '#6b7280', mandatoryAction: 'None', sla: 0, notificationsEnabled: true, status: 'Active', editing: true });
  }

  deleteStage(id: number): void {
    this.stages = this.stages.filter(s => s.id !== id);
    this.stages.forEach((s, i) => { s.seq = i + 1; });
  }

  toggleEdit(stage: PipelineStage): void { stage.editing = !stage.editing; }
}