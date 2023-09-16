import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupFooterComponent } from './login-signup-footer.component';

describe('LoginSignupFooterComponent', () => {
  let component: LoginSignupFooterComponent;
  let fixture: ComponentFixture<LoginSignupFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignupFooterComponent]
    });
    fixture = TestBed.createComponent(LoginSignupFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
