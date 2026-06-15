import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DeptMember {
  name: string;
  id: string;
  initials: string;
  color: string;
}

export interface AttendanceDay {
  day: string;
  hours: string | null;
  pct: number;
  status: 'green' | 'red' | 'gray';
}

export interface Celebration {
  name: string;
  initials: string;
  color: string;
  type: string;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @Input() profileMode = false;
  @Output() closeProfileMode = new EventEmitter<void>();

  employee = {
    name: 'Sneha Thakur',
    role: 'Principal Consultant',
    id: 'I011163',
    doj: '03/03/2025',
    email: 'sneha.thakur@ingenxtec.com',
  };

  leaveData = [
    { label: 'Earned Leave', value: 3, color: '#8b1a1a' },
    { label: 'EL', value: 0, color: '#c0504d' },
  ];
  upcomingHoliday = { name: 'MAKAR SAKRANTI', date: 'Thu Jan 14 2027' };

  donutCircumference = 220;
  get earnedLeaveArc(): number {
    const total = this.leaveData.reduce((s, i) => s + i.value, 0) || 1;
    return (this.leaveData[0].value / total) * this.donutCircumference;
  }

  celebrations: Celebration[] = [
    { name: 'Gaurav Rohilla', initials: 'GR', color: '#e0c4d0', type: 'Birthday', date: 'May 9' },
    { name: 'Leave3 Carry', initials: 'LC', color: 'linear-gradient(135deg,#c0185c,#7c2ff7)', type: 'Birthday', date: 'May 9' },
  ];

  members: DeptMember[] = [
    { name: 'Vikram Saigal', id: 'I011109', initials: 'VS', color: '#c0185c' },
    { name: 'Ishu Harban', id: 'I011055', initials: 'IH', color: '#6c757d' },
    { name: 'Naveen Prajapati', id: 'I011129', initials: 'NP', color: '#555' },
    { name: 'Shalini Chaudhary', id: 'I011079', initials: 'SC', color: '#6c757d' },
    { name: 'Neeraj Yadav', id: 'I011040', initials: 'NY', color: '#6c757d' },
    { name: 'Amaan Siddiqui', id: 'I011137', initials: 'AS', color: '#6c757d' },
    { name: 'Kishita Patel', id: '110012', initials: 'KP', color: '#6c757d' },
    { name: 'Priyanka Tiwari', id: '110013', initials: 'PT', color: '#6c757d' },
    { name: 'Punit Jha', id: 'I0191901', initials: 'PJ', color: '#6c757d' },
  ];

  skills = ['Adaptability', 'Analytics', 'Angular', 'Communication', 'Conflict Resolution'];

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  attendance: AttendanceDay[] = [
    { day: 'Mon - May 4', hours: null, pct: 100, status: 'gray' },
    { day: 'Fri - May 1', hours: '7.03 hrs', pct: 72, status: 'red' },
    { day: 'Thu - Apr 30', hours: '9.73 hrs', pct: 97, status: 'green' },
    { day: 'Wed - Apr 29', hours: '9.37 hrs', pct: 93, status: 'green' },
    { day: 'Tue - Apr 28', hours: '4.52', pct: 45, status: 'red' },
  ];
}
