import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-match-analysis-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './match-analysis-configuration.component.html',
  styleUrl: './match-analysis-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatchAnalysisConfigurationComponent {
  trackByIndex(i: number, _: any) { return i; }
  trackById(_: number, item: { id: string | number }) { return item.id; }

  maJobFamily   = 'All Job Families';
  maDepartment  = 'Information Technology';
  maConfigName  = 'IT - Standard Match Analysis';
  maMinScore    = 70;
  maAutoShortlist = true;
  maAutoRejectBelow = 40;
  maAutoReject  = true;
  maScoreMethod: 'weighted' | 'custom' = 'weighted';

  maJobFamilyOpts = ['All Job Families', 'Engineering', 'Sales', 'HR & Admin', 'Finance'];
  maDeptOpts      = ['All Departments', 'Information Technology', 'Human Resources', 'Finance', 'Marketing'];

  maParameters = [
    { id: 1, name: 'Skills Match',        color: '#22c55e', description: 'Match of candidate skills with required skills',  weightage: 35, mandatory: true,  active: true  },
    { id: 2, name: 'Experience Match',    color: '#3b82f6', description: 'Total relevant experience against requirement',    weightage: 20, mandatory: true,  active: true  },
    { id: 3, name: 'Education Match',     color: '#a855f7', description: 'Qualification level match',                       weightage: 10, mandatory: false, active: true  },
    { id: 4, name: 'Certification Match', color: '#f59e0b', description: 'Match of required certifications',                weightage: 10, mandatory: false, active: true  },
    { id: 5, name: 'Location Match',      color: '#ef4444', description: 'Preferred location match',                        weightage: 10, mandatory: false, active: false },
    { id: 6, name: 'Salary Expectation',  color: '#10b981', description: 'Expected salary vs budgeted salary',              weightage: 10, mandatory: false, active: false },
    { id: 7, name: 'Notice Period',       color: '#06b6d4', description: 'Notice period alignment',                         weightage:  5, mandatory: false, active: false },
  ];

  maPreviewScores = [
    { param: 'Skills Match',        score: 80  },
    { param: 'Experience Match',    score: 90  },
    { param: 'Education Match',     score: 100 },
    { param: 'Certification Match', score: 100 },
    { param: 'Location Match',      score: 60  },
    { param: 'Salary Expectation',  score: 90  },
    { param: 'Notice Period',       score: 70  },
  ];

  get maTotalWeightage() { return this.maParameters.reduce((s, p) => s + p.weightage, 0); }

  get maFinalScore() {
    let total = 0;
    this.maParameters.forEach((p, i) => {
      if (p.active && i < this.maPreviewScores.length) {
        total += (p.weightage / 100) * this.maPreviewScores[i].score;
      }
    });
    return Math.round(total);
  }

  get maScoreLabel() {
    const s = this.maFinalScore;
    if (s >= 80) return 'Good Fit';
    if (s >= 60) return 'Average Fit';
    return 'Poor Fit';
  }

  get maScoreColor() {
    const s = this.maFinalScore;
    if (s >= 80) return '#22c55e';
    if (s >= 60) return '#f59e0b';
    return '#ef4444';
  }

  get maCircleDash() {
    const circumference = 2 * Math.PI * 44;
    return `${(this.maFinalScore / 100) * circumference} ${circumference}`;
  }

  addMaParameter(): void {
    const id = Math.max(...this.maParameters.map(p => p.id)) + 1;
    this.maParameters.push({ id, name: 'New Parameter', color: '#6b7280', description: 'Parameter description', weightage: 0, mandatory: false, active: true });
  }

  deleteMaParameter(id: number): void { this.maParameters = this.maParameters.filter(p => p.id !== id); }
}