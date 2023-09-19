import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFooterIconsComponent } from './note-footer-icons.component';

describe('NoteFooterIconsComponent', () => {
  let component: NoteFooterIconsComponent;
  let fixture: ComponentFixture<NoteFooterIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteFooterIconsComponent]
    });
    fixture = TestBed.createComponent(NoteFooterIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
