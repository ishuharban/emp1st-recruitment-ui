import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineSetupComponent } from './pipeline-setup.component';

describe('PipelineSetupComponent', () => {
  let component: PipelineSetupComponent;
  let fixture: ComponentFixture<PipelineSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipelineSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
