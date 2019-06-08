import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryvideolistComponent } from './categoryvideolist.component';

describe('CategoryvideolistComponent', () => {
  let component: CategoryvideolistComponent;
  let fixture: ComponentFixture<CategoryvideolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryvideolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryvideolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
