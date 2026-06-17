import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAnalysisConfigurationComponent } from './match-analysis-configuration.component';

describe('MatchAnalysisConfigurationComponent', () => {
  let component: MatchAnalysisConfigurationComponent;
  let fixture: ComponentFixture<MatchAnalysisConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchAnalysisConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchAnalysisConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
