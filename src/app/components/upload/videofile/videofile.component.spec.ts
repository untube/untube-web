import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideofileComponent } from './videofile.component';

describe('VideofileComponent', () => {
  let component: VideofileComponent;
  let fixture: ComponentFixture<VideofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
