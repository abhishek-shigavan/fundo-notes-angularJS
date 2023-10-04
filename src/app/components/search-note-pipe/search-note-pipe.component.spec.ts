import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotePipeComponent } from './search-note-pipe.component';

describe('SearchNotePipeComponent', () => {
  let component: SearchNotePipeComponent;
  let fixture: ComponentFixture<SearchNotePipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchNotePipeComponent]
    });
    fixture = TestBed.createComponent(SearchNotePipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
