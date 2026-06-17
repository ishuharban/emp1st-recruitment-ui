import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview-template-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-template-configuration.component.html',
  styleUrl: './interview-template-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InterviewTemplateConfigurationComponent {
  trackByIndex(i: number, _: any) { return i; }
  trackById(_: number, item: { id: string | number }) { return item.id; }

  itTemplateName  = 'Software Engineer - L2 Technical Interview';
  itDepartment    = 'Information Technology';
  itInterviewType = 'Technical Interview';
  itStatus        = 'Active';
  itDeptOptions   = ['Information Technology', 'Human Resources', 'Finance', 'Marketing', 'Operations'];
  itTypeOptions   = ['Technical Interview', 'HR Interview', 'Behavioural Interview', 'Case Study'];
  itStatusOptions = ['Active', 'Inactive', 'Draft'];

  itCompetencies = [
    { id: 1, name: 'Technical Skills',     description: 'Core technical knowledge required for the role',  weightage: 35, mandatory: true,  active: true  },
    { id: 2, name: 'Problem Solving',      description: 'Analytical and problem solving ability',           weightage: 20, mandatory: true,  active: true  },
    { id: 3, name: 'Coding Ability',       description: 'Coding efficiency, accuracy and best practices',  weightage: 20, mandatory: true,  active: true  },
    { id: 4, name: 'Communication Skills', description: 'Verbal & written communication',                  weightage: 10, mandatory: false, active: true  },
    { id: 5, name: 'Team Collaboration',   description: 'Teamwork and collaboration approach',             weightage: 10, mandatory: false, active: false },
    { id: 6, name: 'Cultural Fit',         description: 'Alignment with organization values and culture',  weightage:  5, mandatory: false, active: false },
  ];

  itQuestions = [
    { id: 1, question: 'Explain OOPS Principles.',                type: 'Technical',  maxScore: 10, mandatory: true  },
    { id: 2, question: 'Difference between REST and SOAP.',       type: 'Technical',  maxScore: 10, mandatory: true  },
    { id: 3, question: 'Write SQL Query for Employee Report.',     type: 'Practical',  maxScore: 20, mandatory: true  },
    { id: 4, question: 'Explain Spring Boot Architecture.',        type: 'Technical',  maxScore: 20, mandatory: true  },
  ];
  itQuestionTypes = ['Technical', 'Practical', 'Behavioural', 'Case Study'];

  itRules = [
    { range: '85 - 100', recommendation: 'Strong Hire', color: '#22c55e', description: 'Outstanding performance. Highly recommended.' },
    { range: '70 - 84',  recommendation: 'Hire',        color: '#86efac', description: 'Good performance. Recommended to hire.' },
    { range: '50 - 69',  recommendation: 'Hold',        color: '#fbbf24', description: 'Average performance. Further evaluation needed.' },
    { range: 'Below 50', recommendation: 'Reject',      color: '#ef4444', description: 'Does not meet the requirements.' },
  ];
  itRecommendationOpts = ['Strong Hire', 'Hire', 'Hold', 'Reject'];

  itSettings = { allowComments: true, showScore: true, allowAttachment: true, enableRecommendation: true, autoCalcRecommendation: true, passingScore: 50 };

  itPreviewRatings = [
    { competency: 'Technical Skills',     selected: 4, maxScore: 35 },
    { competency: 'Problem Solving',      selected: 3, maxScore: 20 },
    { competency: 'Coding Ability',       selected: 4, maxScore: 20 },
    { competency: 'Communication Skills', selected: 4, maxScore: 10 },
    { competency: 'Team Collaboration',   selected: 4, maxScore: 10 },
    { competency: 'Cultural Fit',         selected: 4, maxScore:  5 },
  ];
  itPreviewRecommendation = 'Hire';
  itPreviewComment = '';

  get itTotalWeightage() { return this.itCompetencies.reduce((s, c) => s + c.weightage, 0); }
  get itTotalScore()     { return Math.round(this.itPreviewRatings.reduce((s, r) => s + (r.selected / 5) * r.maxScore, 0)); }
  get itQuestionsScore() { return this.itQuestions.reduce((s, q) => s + q.maxScore, 0); }

  ratingScore(r: { selected: number; maxScore: number }): number { return Math.round((r.selected / 5) * r.maxScore); }
}