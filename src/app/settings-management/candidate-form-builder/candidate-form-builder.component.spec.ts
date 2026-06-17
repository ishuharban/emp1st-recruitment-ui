import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFormBuilderComponent } from './candidate-form-builder.component';

describe('CandidateFormBuilderComponent', () => {
  let component: CandidateFormBuilderComponent;
  let fixture: ComponentFixture<CandidateFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateFormBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
