import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetitemComponent } from './getitem.component';

describe('GetitemComponent', () => {
  let component: GetitemComponent;
  let fixture: ComponentFixture<GetitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
