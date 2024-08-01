import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramComponent } from './instagram.component';

describe('InstagramComponent', () => {
  let component: InstagramComponent;
  let fixture: ComponentFixture<InstagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstagramComponent]
    });
    fixture = TestBed.createComponent(InstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
