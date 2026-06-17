import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationSetupComponent } from './email-notification-setup.component';

describe('EmailNotificationSetupComponent', () => {
  let component: EmailNotificationSetupComponent;
  let fixture: ComponentFixture<EmailNotificationSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailNotificationSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailNotificationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
