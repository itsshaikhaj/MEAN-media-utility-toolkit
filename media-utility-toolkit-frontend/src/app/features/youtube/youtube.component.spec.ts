import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeComponent } from './youtube.component';

describe('YoutubeComponent', () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubeComponent]
    });
    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
