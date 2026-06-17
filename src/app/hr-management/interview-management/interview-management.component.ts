import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Interviewer { initials: string; name: string; role: string; color: string; }
interface PlanItem { round: string; date: string; status: 'Scheduled' | 'Pending' | 'Completed' | 'Cancelled'; }

export interface Interview {
  id: string;
  candidateName: string;
  candidateId: string;
  initials: string;
  avatarColor: string;
  jobTitle: string;
  requisitionId: string;
  round: string;
  roundColor: string;
  roundBg: string;
  interviewType: string;
  date: string;
  time: string;
  duration: string;
  interviewers: Interviewer[];
  recruiter: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Pending Feedback';
  feedbackStatus: 'Pending' | 'Submitted';
  recommendation?: string;
  mode: string;
  meetingLink: string;
  reminder: string;
  timezone: string;
  plan: PlanItem[];
}

@Component({
  selector: 'app-interview-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-management.component.html',
  styleUrls: ['./interview-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewManagementComponent {
  @Output() navigate = new EventEmitter<string>();

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  activeTab: 'all' | 'mine' | 'conduct' | 'feedback' | 'completed' | 'cancelled' = 'all';
  calendarView = false;
  calendarMode: 'day' | 'week' | 'month' = 'week';
  selectedInterview: Interview | null = null;
  searchQuery = '';
  filterStage = '';
  filterDate = '';
  filterInterviewer = '';

  interviews: Interview[] = [
    {
      id: 'INT-2024-001', candidateName: 'Arjun Nair', candidateId: 'CAND-000124', initials: 'AN', avatarColor: '#6366f1',
      jobTitle: 'Software Engineer', requisitionId: 'REQ-2024-00056',
      round: 'Technical Round 1', roundColor: '#1d4ed8', roundBg: '#eff6ff',
      interviewType: 'Video Interview', date: '20 May 2024', time: '10:00 AM', duration: '60 min',
      interviewers: [
        { initials: 'RK', name: 'Rahul Kumar', role: 'Technical Lead', color: '#3b82f6' },
        { initials: 'SM', name: 'Sneha Menon', role: 'Senior Engineer', color: '#8b5cf6' },
        { initials: 'PV', name: 'Pooja Verma', role: 'Technical Architect', color: '#06b6d4' },
      ],
      recruiter: 'Priya Singh', status: 'Scheduled', feedbackStatus: 'Pending',
      mode: 'Video Interview', meetingLink: 'https://meet.google.com/abc-defg-hij',
      reminder: '24 Hours Before', timezone: 'Asia/Kolkata (IST)',
      plan: [
        { round: 'Technical Round 1', date: '20 May 2024 | 10:00 AM (60m)', status: 'Scheduled' },
        { round: 'Technical Round 2', date: '22 May 2024 | 02:00 PM (60m)', status: 'Pending' },
        { round: 'HR Interview', date: '23 May 2024 | 11:00 AM (45m)', status: 'Pending' },
        { round: 'Managerial Round', date: '24 May 2024 | 03:00 PM (60m)', status: 'Pending' },
      ],
    },
    {
      id: 'INT-2024-002', candidateName: 'Priya Sharma', candidateId: 'CAND-000125', initials: 'PS', avatarColor: '#ec4899',
      jobTitle: 'Software Engineer', requisitionId: 'REQ-2024-00056',
      round: 'HR Interview', roundColor: '#059669', roundBg: '#ecfdf5',
      interviewType: 'In Person', date: '20 May 2024', time: '11:30 AM', duration: '45 min',
      interviewers: [{ initials: 'AD', name: 'Anita Desai', role: 'HR Manager', color: '#ec4899' }],
      recruiter: 'Priya Singh', status: 'In Progress', feedbackStatus: 'Pending',
      mode: 'In Person', meetingLink: '', reminder: '1 Hour Before', timezone: 'Asia/Kolkata (IST)',
      plan: [{ round: 'HR Interview', date: '20 May 2024 | 11:30 AM (45m)', status: 'Scheduled' }],
    },
    {
      id: 'INT-2024-003', candidateName: 'Rahul Verma', candidateId: 'CAND-000126', initials: 'RV', avatarColor: '#f59e0b',
      jobTitle: 'Product Manager', requisitionId: 'REQ-2024-00048',
      round: 'Managerial Round', roundColor: '#7c3aed', roundBg: '#ede9fe',
      interviewType: 'Video Interview', date: '21 May 2024', time: '02:00 PM', duration: '60 min',
      interviewers: [
        { initials: 'MP', name: 'Manoj Patel', role: 'VP Product', color: '#7c3aed' },
        { initials: 'SK', name: 'Sunita Kapoor', role: 'Senior PM', color: '#f59e0b' },
      ],
      recruiter: 'Rakesh Gupta', status: 'Scheduled', feedbackStatus: 'Pending',
      mode: 'Video Interview', meetingLink: 'https://zoom.us/j/123456789',
      reminder: '24 Hours Before', timezone: 'Asia/Kolkata (IST)',
      plan: [{ round: 'Managerial Round', date: '21 May 2024 | 02:00 PM (60m)', status: 'Scheduled' }],
    },
    {
      id: 'INT-2024-004', candidateName: 'Neha Tate', candidateId: 'CAND-000127', initials: 'NT', avatarColor: '#14b8a6',
      jobTitle: 'Data Analyst', requisitionId: 'REQ-2024-00061',
      round: 'Technical Round 2', roundColor: '#1d4ed8', roundBg: '#eff6ff',
      interviewType: 'Video Interview', date: '21 May 2024', time: '03:30 PM', duration: '60 min',
      interviewers: [
        { initials: 'RK', name: 'Rahul Kumar', role: 'Technical Lead', color: '#3b82f6' },
        { initials: 'AK', name: 'Amit Kumar', role: 'Senior Analyst', color: '#14b8a6' },
      ],
      recruiter: 'Priya Singh', status: 'Pending Feedback', feedbackStatus: 'Pending',
      mode: 'Video Interview', meetingLink: 'https://meet.google.com/xyz-abcd-efg',
      reminder: '24 Hours Before', timezone: 'Asia/Kolkata (IST)',
      plan: [
        { round: 'Technical Round 1', date: '18 May 2024 | 10:00 AM (60m)', status: 'Completed' },
        { round: 'Technical Round 2', date: '21 May 2024 | 03:30 PM (60m)', status: 'Scheduled' },
      ],
    },
    {
      id: 'INT-2024-005', candidateName: 'Siddharth Rao', candidateId: 'CAND-000128', initials: 'SR', avatarColor: '#22c55e',
      jobTitle: 'DevOps Engineer', requisitionId: 'REQ-2024-00059',
      round: 'HR Interview', roundColor: '#059669', roundBg: '#ecfdf5',
      interviewType: 'In Person', date: '22 May 2024', time: '10:30 AM', duration: '45 min',
      interviewers: [{ initials: 'AD', name: 'Anita Desai', role: 'HR Manager', color: '#ec4899' }],
      recruiter: 'Rakesh Gupta', status: 'Completed', feedbackStatus: 'Submitted', recommendation: 'Hire',
      mode: 'In Person', meetingLink: '', reminder: '24 Hours Before', timezone: 'Asia/Kolkata (IST)',
      plan: [
        { round: 'Technical Round 1', date: '15 May 2024 | 11:00 AM (60m)', status: 'Completed' },
        { round: 'HR Interview', date: '22 May 2024 | 10:30 AM (45m)', status: 'Completed' },
      ],
    },
    {
      id: 'INT-2024-006', candidateName: 'Ananya Das', candidateId: 'CAND-000129', initials: 'AD', avatarColor: '#f43f5e',
      jobTitle: 'Software Engineer', requisitionId: 'REQ-2024-00056',
      round: 'Technical Round 1', roundColor: '#1d4ed8', roundBg: '#eff6ff',
      interviewType: 'Video Interview', date: '22 May 2024', time: '11:30 AM', duration: '60 min',
      interviewers: [{ initials: 'SM', name: 'Sneha Menon', role: 'Senior Engineer', color: '#8b5cf6' }],
      recruiter: 'Priya Singh', status: 'Cancelled', feedbackStatus: 'Pending',
      mode: 'Video Interview', meetingLink: '', reminder: '24 Hours Before', timezone: 'Asia/Kolkata (IST)',
      plan: [{ round: 'Technical Round 1', date: '22 May 2024 | 11:30 AM (60m)', status: 'Cancelled' }],
    },
    {
      id: 'INT-2024-007', candidateName: 'Vikram Kumar', candidateId: 'CAND-000130', initials: 'VK', avatarColor: '#8b5cf6',
      jobTitle: 'Product Manager', requisitionId: 'REQ-2024-00048',
      round: 'Case Study', roundColor: '#d97706', roundBg: '#fffbeb',
      interviewType: 'Video Interview', date: '23 May 2024', time: '01:00 PM', duration: '90 min',
      interviewers: [
        { initials: 'MP', name: 'Manoj Patel', role: 'VP Product', color: '#7c3aed' },
        { initials: 'PK', name: 'Pooja Kapoor', role: 'Product Lead', color: '#f59e0b' },
      ],
      recruiter: 'Rakesh Gupta', status: 'Scheduled', feedbackStatus: 'Pending',
      mode: 'Video Interview', meetingLink: 'https://teams.microsoft.com/l/meeting/123',
      reminder: '24 Hours Before', timezone: 'Asia/Kolkata (IST)',
      plan: [{ round: 'Case Study', date: '23 May 2024 | 01:00 PM (90m)', status: 'Scheduled' }],
    },
    {
      id: 'INT-2024-008', candidateName: 'Meera Joshi', candidateId: 'CAND-000131', initials: 'MJ', avatarColor: '#06b6d4',
      jobTitle: 'Data Analyst', requisitionId: 'REQ-2024-00061',
      round: 'Technical Round 2', roundColor: '#1d4ed8', roundBg: '#eff6ff',
      interviewType: 'Video Interview', date: '23 May 2024', time: '04:00 PM', duration: '60 min',
      interviewers: [{ initials: 'AK', name: 'Amit Kumar', role: 'Senior Analyst', color: '#14b8a6' }],
      recruiter: 'Priya Singh', status: 'Pending Feedback', feedbackStatus: 'Pending',
      mode: 'Video Interview', meetingLink: 'https://zoom.us/j/987654321',
      reminder: '24 Hours Before', timezone: 'Asia/Kolkata (IST)',
      plan: [
        { round: 'Technical Round 1', date: '20 May 2024 | 02:00 PM (60m)', status: 'Completed' },
        { round: 'Technical Round 2', date: '23 May 2024 | 04:00 PM (60m)', status: 'Scheduled' },
      ],
    },
  ];

  get filtered() {
    let list = this.interviews;
    if (this.activeTab === 'conduct')   list = list.filter(i => i.status === 'Scheduled' || i.status === 'In Progress');
    if (this.activeTab === 'feedback')  list = list.filter(i => i.status === 'Pending Feedback');
    if (this.activeTab === 'completed') list = list.filter(i => i.status === 'Completed');
    if (this.activeTab === 'cancelled') list = list.filter(i => i.status === 'Cancelled');
    if (this.filterStage) list = list.filter(i => i.round.includes(this.filterStage));
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(i => i.candidateName.toLowerCase().includes(q) || i.jobTitle.toLowerCase().includes(q) || i.candidateId.toLowerCase().includes(q));
    }
    return list;
  }

  get todayCount()     { return this.interviews.filter(i => i.date === '20 May 2024').length; }
  get upcomingCount()  { return this.interviews.filter(i => i.status === 'Scheduled').length; }
  get completedCount() { return this.interviews.filter(i => i.status === 'Completed').length; }
  get feedbackCount()  { return this.interviews.filter(i => i.status === 'Pending Feedback').length; }
  get cancelledCount() { return this.interviews.filter(i => i.status === 'Cancelled').length; }

  selectInterview(i: Interview) { this.selectedInterview = i; }
  closeDetail() { this.selectedInterview = null; }

  statusStyle(s: string): { bg: string; color: string; border: string } {
    const m: Record<string, { bg: string; color: string; border: string }> = {
      'Scheduled':        { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
      'In Progress':      { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' },
      'Completed':        { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
      'Cancelled':        { bg: '#fee2e2', color: '#b91c1c', border: '#fecaca' },
      'Pending Feedback': { bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
    };
    return m[s] || { bg: '#f1f5f9', color: '#64748b', border: '#e5e7eb' };
  }

  planDot(s: string): string {
    const m: Record<string, string> = { Scheduled: '#3b82f6', Completed: '#22c55e', Pending: '#d1d5db', Cancelled: '#ef4444' };
    return m[s] || '#d1d5db';
  }

  recStyle(r: string): { bg: string; color: string } {
    if (r === 'Hire' || r === 'Strong Hire') return { bg: '#dcfce7', color: '#15803d' };
    if (r === 'Hold') return { bg: '#fef3c7', color: '#b45309' };
    if (r === 'Reject') return { bg: '#fee2e2', color: '#b91c1c' };
    return { bg: '#f1f5f9', color: '#64748b' };
  }

  // Calendar
  weekDays = [
    { label: 'Mon', date: '20 May' },
    { label: 'Tue', date: '21 May' },
    { label: 'Wed', date: '22 May' },
    { label: 'Thu', date: '23 May' },
    { label: 'Fri', date: '24 May' },
  ];
  timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  calendarEvents(dayDate: string, slot: string): Interview[] {
    return this.interviews.filter(i => i.date.includes(dayDate) && i.time === slot);
  }
}
