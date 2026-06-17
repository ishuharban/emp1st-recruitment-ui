import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="coming-soon-container">
      <div class="icon-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <h2>Coming Soon</h2>
      <p>This module is currently under development. Please check back later!</p>
    </div>
  `,
  styles: [`
    .coming-soon-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 400px;
      padding: 40px;
      text-align: center;
      color: #64748b;
    }
    .icon-wrapper {
      width: 80px;
      height: 80px;
      margin-bottom: 24px;
      color: #cbd5e1;
    }
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 12px;
      margin-top: 0;
    }
    p {
      font-size: 15px;
      max-width: 400px;
      line-height: 1.5;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingSoonComponent {}
