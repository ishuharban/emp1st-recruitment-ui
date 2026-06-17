import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-notification-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-notification-setup.component.html',
  styleUrls: ['./email-notification-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EmailNotificationSetupComponent {
  trackByIndex(i: number, _: any) { return i; }

  enEvents = [
    { name: 'Candidate Applied',         iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Candidate Shortlisted',     iconBg: '#eff6ff', iconColor: '#2563eb', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Interview Scheduled',       iconBg: '#eef2ff', iconColor: '#4f46e5', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Interview Reminder',        iconBg: '#fdf2f8', iconColor: '#c026d3', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Interview Rescheduled',     iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Interview Cancelled',       iconBg: '#fef2f2', iconColor: '#dc2626', email: true,  inApp: true,  sms: false, active: false },
    { name: 'Feedback Pending Reminder', iconBg: '#fff7ed', iconColor: '#ea580c', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Offer Released',            iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: true,  active: true  },
    { name: 'Offer Accepted',            iconBg: '#ecfdf5', iconColor: '#15803d', email: true,  inApp: false, sms: false, active: true  },
    { name: 'Offer Rejected',            iconBg: '#fef2f2', iconColor: '#dc2626', email: true,  inApp: false, sms: false, active: false },
    { name: 'Document Request',          iconBg: '#eff6ff', iconColor: '#1d4ed8', email: true,  inApp: true,  sms: false, active: true  },
    { name: 'Document Verified',         iconBg: '#eff6ff', iconColor: '#1e40af', email: true,  inApp: false, sms: false, active: true  },
    { name: 'Candidate Hired',           iconBg: '#ecfdf5', iconColor: '#059669', email: true,  inApp: true,  sms: false, active: true  },
  ];

  enSelectedTemplate = 'Interview Invitation';
  enTemplateOptions  = ['Application Received', 'Shortlist Notification', 'Interview Invitation', 'Interview Reminder', 'Offer Letter', 'Document Request', 'Joining Confirmation'];
  enSubject          = 'Interview Invitation - {{JobTitle}}';
  enBody             = `Dear {{CandidateName}},\n\nCongratulations! You have been shortlisted for the position of {{JobTitle}}.\n\nInterview Date    : {{InterviewDate}}\nInterview Time    : {{InterviewTime}}\nInterview Type    : {{InterviewType}}\nInterviewer       : {{InterviewerName}}\nMeeting Link      : {{MeetingLink}}\n\nPlease make sure you are available at the scheduled time.\n\nRegards,\n{{RecruiterName}}\n{{CompanyName}}`;
  enMergeFields      = ['{{CandidateName}}', '{{JobTitle}}', '{{InterviewDate}}', '{{InterviewTime}}', '{{InterviewType}}', '{{InterviewerName}}', '{{MeetingLink}}', '{{RecruiterName}}', '{{CompanyName}}', '{{OfferAmount}}', '{{JoiningDate}}'];
  enReminderValue    = 24; enReminderUnit = 'Hours';
  enEscalationValue  = 48; enEscalationUnit = 'Hours';
  enMaxEscalation    = '2 Levels';
  enRecipients       = { candidate: true, recruiter: true, hiringManager: true, interviewPanel: true, hrManager: true, admin: false, customEmail: false };
  enCustomEmail      = '';
  enAttachDetails    = true; enAllowUnsubscribe = true; enInAppNotif = true; enSmsNotif = false;
  enUnitOptions      = ['Minutes', 'Hours', 'Days'];
  enMaxEscalationOpts = ['1 Level', '2 Levels', '3 Levels', 'No Escalation'];
}