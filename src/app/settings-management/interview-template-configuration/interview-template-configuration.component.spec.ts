import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewTemplateConfigurationComponent } from './interview-template-configuration.component';

describe('InterviewTemplateConfigurationComponent', () => {
  let component: InterviewTemplateConfigurationComponent;
  let fixture: ComponentFixture<InterviewTemplateConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewTemplateConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewTemplateConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
