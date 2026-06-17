import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-automation-rules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './automation-rules.component.html',
  styleUrls: ['./automation-rules.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AutomationRulesComponent {
  trackByIndex(i: number, _: any) { return i; }
  trackById(_: number, item: { id: string | number }) { return item.id; }

  autoRules = [
    { id: 1, name: 'Auto Move After Interview', trigger: 'When interview feedback is submitted',        action: 'Move candidate to next stage automatically',      appliedTo: 'All Jobs', active: true  },
    { id: 2, name: 'Send Reminder - Interview', trigger: '24 hours before interview',                  action: 'Send email reminder to candidate & interviewers', appliedTo: 'All Jobs', active: true  },
    { id: 3, name: 'Document Request',          trigger: 'When candidate moves to Documentation stage', action: 'Send document request email',                     appliedTo: 'All Jobs', active: true  },
    { id: 4, name: 'Offer Expiry Reminder',     trigger: '2 days before offer expiry',                 action: 'Send reminder to candidate',                      appliedTo: 'All Jobs', active: true  },
    { id: 5, name: 'Job Expiry Alert',          trigger: '3 days before job expiry',                   action: 'Notify recruiters and hiring managers',           appliedTo: 'All Jobs', active: true  },
  ];

  newRule = { name: '', trigger: '', action: '', appliedTo: 'All Jobs', active: true };
  showAddRule = false;

  triggerOptions = ['When candidate applies', 'When candidate is shortlisted', 'When interview feedback is submitted', '24 hours before interview', 'When candidate moves to Documentation stage', '2 days before offer expiry', '3 days before job expiry'];
  actionOptions  = ['Move candidate to next stage', 'Send email notification', 'Send reminder email', 'Send document request email', 'Notify hiring manager', 'Auto reject candidate'];
  appliedToOpts  = ['All Jobs', 'Specific Job Family', 'Specific Department', 'Specific Job'];

  saveAutoRule(): void {
    if (!this.newRule.name.trim() || !this.newRule.trigger || !this.newRule.action) return;
    const id = Math.max(...this.autoRules.map(r => r.id)) + 1;
    this.autoRules.push({ ...this.newRule, id });
    this.newRule = { name: '', trigger: '', action: '', appliedTo: 'All Jobs', active: true };
  }

  deleteAutoRule(id: number): void { this.autoRules = this.autoRules.filter(r => r.id !== id); }
}